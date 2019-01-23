import * as Redux from "redux";

import * as A from "./store/actions";
import * as S from "./store/state";
import * as WM from "../../shared/worker-message";

export function initWorkerClient(store: Redux.Store<S.AppState>): void {
    _store = store;
    _worker = new Worker("worker.js");
    _worker.onmessage = ev => handleMessage(ev.data);
}

export const workerClientMiddleware = ((store: Redux.MiddlewareAPI<S.AppState>) => (next: Redux.Dispatch<S.AppState>) => (action: Redux.Action) => {
    switch (action.type) {
        case "OPEN_FILE": {
            const { file } = action as A.OpenFileAction;
            postOpenFileMessage(file);
            break;
        }
    }
    return next(action);
}) as Redux.Middleware;

function postOpenFileMessage(file: File): void {
    _worker.postMessage({ type: "REQ_OPEN_FILE", file } as WM.OpenFileMessage);
}

function handleMessage(msg: WM.Message): void {
    switch (msg.type) {
        case "RES_PORGRESS": handleProgressMessage(msg as WM.ProgressMessage); break;
        case "RES_HEX": handleHexMessage(msg as WM.HexMessage); break;
        case "RES_DATA_BYTES": handleDataBytesMessage(msg as WM.DataBytesMessage); break;
        case "RES_ASM": handleAsmMessage(msg as WM.AsmMessage); break;
    }
}

function handleProgressMessage(msg: WM.ProgressMessage): void {
    const { progress, error } = msg;
    _store.dispatch(A.createSetWorkerStatusAction(progress, error));
}

function handleHexMessage(msg: WM.HexMessage): void {
    const { hex } = msg;
    _store.dispatch(A.createSetHexAction(hex));
}

function handleDataBytesMessage(msg: WM.DataBytesMessage): void {
    const { data } = msg;
    _store.dispatch(A.createSetDataBytesAction(data));
}

function handleAsmMessage(msg: WM.AsmMessage): void {
    const { asm } = msg;
    _store.dispatch(A.createSetAsmAction(asm));
}

let _worker: Worker;
let _store: Redux.Store<S.AppState>;