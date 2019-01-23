import * as S from "./schemas";

export type MessageType
    = "REQ_OPEN_FILE"
    | "RES_PORGRESS"
    | "RES_HEX"
    | "RES_DATA_BYTES"
    | "RES_ASM"
    ;

export type ProgressType
    = "OPENING_FILE"
    | "PARSING_HEX"
    | "FILLING_DATA_BYTES"
    | "DISASSEMBLING"
    | "DONE"
    | "ERROR"
    ;

export interface Message {
    type: MessageType;
}

export interface OpenFileMessage extends Message {
    file: File;
    options: S.DasmOptions;
}

export interface ProgressMessage extends Message {
    progress: ProgressType;
    error?: string;
}

export interface HexMessage extends Message {
    hex: S.HexLineList;
}

export interface DataBytesMessage extends Message {
    data: S.DataByteList;
}

export interface AsmMessage extends Message {
    asm: S.AsmList;
}