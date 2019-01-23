import * as Redux from "redux";
import * as A from "./actions";
import * as S from "./state";

export const appReducer = Redux.combineReducers({
    appInfo,
    fileInfo,
    workerStatus,
    hexView,
    dataBytesView,
    asmView,
}) as Redux.Reducer<S.AppState>;

function appInfo(state: S.AppInfo | null = null, action: Redux.Action): S.AppInfo | null {
    return state;
}

function fileInfo(state: S.FileInfo | null = null, action: Redux.Action): S.FileInfo | null {
    switch (action.type) {
        case "OPEN_FILE": {
            const { file } = action as A.OpenFileAction;
            const { name, size } = file;
            return Object.assign({}, state, { name, size });
        }
        default: return state;
    }
}

function workerStatus(state: S.WorkerStatus | null = null, action: Redux.Action): S.WorkerStatus | null {
    switch (action.type) {
        case "SET_WORKER_STATUS": {
            const { progress, error } = action as A.SetWorkerStatusAction;
            return Object.assign({}, state, { progress, error });
        }
        default: return state;
    }
}

function hexView(state: S.HexView | null = null, action: Redux.Action): S.HexView | null {
    switch (action.type) {
        case "SET_HEX": {
            const { hex } = action as A.SetHexAction;
            return Object.assign({}, state, { hex });
        }
        case "OPEN_FILE": {
            // 新开文件的时候，清空HEX视图
            return null;
        }
        default: return state;
    }
}

function dataBytesView(state: S.DataBytesView | null = null, action: Redux.Action): S.DataBytesView | null {
    switch (action.type) {
        case "SET_DATA_BYTES": {
            const { data } = action as A.SetDataBytesAction;
            return Object.assign({}, state, { data });
        }
        case "OPEN_FILE": {
            // 新开文件的时候，清空字节数据视图
            return null;
        }
        default: return state;
    }
}

function asmView(state: S.AsmView | null = null, action: Redux.Action): S.AsmView | null {
    switch (action.type) {
        case "SET_ASM": {
            const { asm } = action as A.SetAsmAction;
            return Object.assign({}, state, { asm });
        }
        case "OPEN_FILE": {
            // 新开文件的时候，清空汇编指令视图
            return null;
        }
        default: return state;
    }
}