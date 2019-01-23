import * as S from "../../shared/schemas";
import * as U from "../../shared/utilities";

export function parseHex(hexString: string): S.HexLineList {
    const lines = hexString
        .split("\n")
        .map((v, i) => {
            return parseHexLine(i + 1, v.trim());
        });

    for (const cl of lines) {
        for (const ln of lines) {
            if (cl.number !== ln.number
                && cl.type && ln.type && cl.type.value === ln.type.value
                && cl.address && ln.address && cl.address.value >= ln.address.value
                && ln.count && cl.address.value < ln.address.value + ln.count.value) {
                cl.error = "HEX_E_OVERLAP";
            }
        }
    }

    const dataLines = lines
        .filter(l => l.type && l.type.value === S.HexDataType.DATA)
        .sort((a, b) => a.address!.value - b.address!.value);
    const lastLine = dataLines[dataLines.length - 1];
    const totalBytes = lastLine.address!.value + lastLine.count!.value;

    let hex: S.HexLineList = { totalBytes };
    lines.map(v => hex[v.number] = v);
    return hex;
}

function parseHexLine(number: number, text: string): S.HexLine {
    let line: S.HexLine = { number, text };

    if (!text) {
        return line;
    }

    if (!text.match(/^:([0-9a-f][0-9a-f])+$/i)) {
        line.error = "HEX_E_FORMAT";
        return line;
    }

    if (text.length < 11) {
        line.error = "HEX_E_LENGTH";
        return line;
    }

    let p = 1;
    const count = parseNumberField(text, p, 2);

    if (text.length != count.value * 2 + 11) {
        line.error = "HEX_E_LENGTH";
        return line;
    }

    p += 2;
    const address = parseNumberField(text, p, 4);

    p += 4;
    let { str, value } = parseNumberField(text, p, 2);
    const type = { str, value: value as S.HexDataType };

    if (!(type.value === S.HexDataType.DATA || type.value === S.HexDataType.EOF)) {
        line.error = "HEX_E_NOT_SUPPORTED";
    }

    p += 2;
    const data = parseBytesField(text, p, count.value);

    p += count.value * 2;
    const checksum = parseNumberField(text, p, 2);

    const sum = (count.value + (address.value >> 8) + (address.value & 0xFF) + type.value +
        data.value.reduce((a, c) => a + c, 0)) & 0xFF;
    const corrected_checksum = (~sum + 1) & 0xFF;
    if (checksum.value != corrected_checksum) {
        line.error = "HEX_E_CHECKSUM";
        line.amendment = U.formatU1Hex(corrected_checksum);
    }

    line.count = count;
    line.address = address;
    line.type = type;
    line.data = data;
    line.checkSum = checksum;
    return line;
}

function parseNumberField(text: string, start: number, len: number): S.HexField<number> {
    const str = text.substring(start, start + len);
    const value = Number.parseInt(str, 16);
    return { str, value };
}

function parseBytesField(text: string, start: number, count: number): S.HexField<number[]> {
    const str = text.substring(start, start + count * 2);
    let value: number[] = [];
    for (let i = 0; i < count; i++) {
        const ps = start + i * 2;
        const s = text.substring(ps, ps + 2);
        const b = Number.parseInt(s, 16);
        value.push(b);
    }
    return { str, value };
}

export function hexHasError(hex: S.HexLineList): boolean {
    for (const key in hex) {
        if (hex[key].error) return true;
    }
    return false;
}

export function fillDataBytes(hex: S.HexLineList): S.DataByteList {
    let bin: S.DataByteList = {};
    for (const key in hex) {
        const hexLine = hex[key];
        if (!hexLine.type || hexLine.type.value !== S.HexDataType.DATA)
            continue;

        const lineNumber = hexLine.number;
        const address = hexLine.address!.value;
        const data = hexLine.data!.value;

        for (let i = 0; i < data.length; i++) {
            const db: S.DataByte = {
                sourceLineNumber: lineNumber,
                sourceOffset: i,
                address: address + i,
                data: data[i]
            };
            bin[db.address] = db;
        }
    }
    return bin;
}