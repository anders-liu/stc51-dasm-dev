export function formatHex(n: number, len: number, suffix?: boolean): string {
    let str = n.toString(16).toUpperCase();
    if (str.length < len) {
        str = "0".repeat(len - str.length) + str;
    }
    if (suffix) {
        str = str + "h";
    }
    return str;
}

export function formatU1Hex(n: number, suffix?: boolean): string {
    return formatHex(n, 2, suffix);
}

export function formatU2Hex(n: number, suffix?: boolean): string {
    return formatHex(n, 4, suffix);
}

export function formatCodeAddress(addr: number): string {
    return "CODE_" + formatHex(addr, 4);
}

export function formatDirectData(data: number): string {
    return formatHex(data, 3, true);
}

export function formatBitData(data: number): string {
    return formatHex(data, 3, true);
}

export function formatImmediateData(data: number): string {
    return "#" + formatHex(data, 3, true);
}

export function formatImmediateData2(data: number): string {
    return "#" + formatHex(data, 5, true);
}