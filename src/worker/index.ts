import * as WM from "../shared/worker-message";
import * as S from "../shared/schemas";
import { parseHex, fillDataBytes, hexHasError } from "./hex/hex-parser";
import { dasm } from "./asm51/disassembler";

onmessage = evt => {
    const msg = evt.data as WM.Message;

    switch (msg.type) {
        case "REQ_OPEN_FILE": handleOpenFile(msg as WM.OpenFileMessage); break;
    }
}

function handleOpenFile(msg: WM.OpenFileMessage): void {
    let r = new FileReader();
    r.onload = evt => {
        try {
            parseHexFile(
                (evt.target as FileReader).result as string,
                msg.options);
            postProgressMessage("DONE");
        } catch (ex) {
            postProgressMessage("ERROR", ex.message || JSON.stringify(ex));
        }
    };
    r.onerror = evt => {
        const errMsg = (evt.target as FileReader).error!.message
        postProgressMessage("ERROR", errMsg);
    }
    postProgressMessage("OPENING_FILE");
    r.readAsText(msg.file);
}

function parseHexFile(content: string, options: S.DasmOptions): void {
    postProgressMessage("PARSING_HEX");
    const hex = parseHex(content);
    postHexMessage(hex);

    if (hexHasError(hex)) return;

    postProgressMessage("FILLING_DATA_BYTES");
    const bin = fillDataBytes(hex);
    postDataBytesMessage(bin);

    postProgressMessage("DISASSEMBLING");
    const asm = dasm(options, bin, hex.totalBytes);
    postAsmMessage(asm);
}

function postProgressMessage(progress: WM.ProgressType, error?: string): void {
    const msg: WM.ProgressMessage = {
        type: "RES_PORGRESS",
        progress, error
    };
    postMessage(msg);
}

function postHexMessage(hex: S.HexLineList): void {
    const msg: WM.HexMessage = {
        type: "RES_HEX",
        hex
    };
    postMessage(msg);
}

function postDataBytesMessage(data: S.DataByteList): void {
    const msg: WM.DataBytesMessage = {
        type: "RES_DATA_BYTES",
        data
    };
    postMessage(msg);
}

function postAsmMessage(asm: S.AsmList): void {
    const msg: WM.AsmMessage = {
        type: "RES_ASM",
        asm
    };
    postMessage(msg);
}