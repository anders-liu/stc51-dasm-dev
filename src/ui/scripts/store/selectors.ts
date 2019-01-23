import * as S from "./state";

export function isWorkerBusy(state: S.AppState): boolean {
    const workerStatus = state && state.workerStatus;
    if (!workerStatus) return false;

    const { progress } = workerStatus;
    return !(progress === "ERROR" || progress === "DONE");
}

export function getTotalBytes(state: S.AppState): number {
    const hexView = state && state.hexView;
    if (!hexView) return 0;

    return hexView.hex.totalBytes;
}