import * as Redux from "redux";
import * as SH from "../../../shared/schemas";
import * as WM from "../../../shared/worker-message";

export type ActionType
    = "OPEN_FILE"
    | "SET_WORKER_STATUS"
    | "SET_HEX"
    | "SET_DATA_BYTES"
    | "SET_ASM"
    | "JUMP_TO_ASM_LABEL"
    ;

export interface OpenFileAction extends Redux.Action {
    file: File;
}

export function createOpenFileAction(file: File): OpenFileAction {
    return { type: "OPEN_FILE", file };
}

export interface SetWorkerStatusAction extends Redux.Action {
    progress: WM.ProgressType;
    error?: string;
}

export function createSetWorkerStatusAction(
    progress: WM.ProgressType,
    error?: string): SetWorkerStatusAction {
    return { type: "SET_WORKER_STATUS", progress, error };
}

export interface SetHexAction extends Redux.Action {
    hex: SH.HexLineList;
}

export function createSetHexAction(hex: SH.HexLineList): SetHexAction {
    return { type: "SET_HEX", hex };
}

export interface SetDataBytesAction extends Redux.Action {
    data: SH.DataByteList;
}

export function createSetDataBytesAction(data: SH.DataByteList): SetDataBytesAction {
    return { type: "SET_DATA_BYTES", data };
}

export interface SetAsmAction extends Redux.Action {
    asm: SH.AsmList;
}

export function createSetAsmAction(asm: SH.AsmList): SetAsmAction {
    return { type: "SET_ASM", asm };
}

export interface JumpToAsmLabelAction extends Redux.Action {
    label: string;
}

export function createJumpToAsmLabelAction(label: string):JumpToAsmLabelAction {
    return { type: "JUMP_TO_ASM_LABEL", label };
}
