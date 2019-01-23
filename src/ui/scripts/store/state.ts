import * as SH from "../../../shared/schemas";
import * as WM from "../../../shared/worker-message";

export interface AppState {
    appInfo: AppInfo;
    fileInfo?: FileInfo;
    workerStatus?: WorkerStatus;
    hexView?: HexView;
    dataBytesView?: DataBytesView;
    asmView?: AsmView;
}

export interface AppInfo {
    title: string;
    version: string;
    author: string;
    homepage: string;
    bugsUrl: string;
    releaseNotesUrl: string;
    buildTimeLocal: string;
    year: string;
}

export interface FileInfo {
    name: string;
    size: number;
}

export interface WorkerStatus {
    progress: WM.ProgressType;
    error?: string;
}

export interface HexView {
    hex: SH.HexLineList;
}

export interface DataBytesView {
    data: SH.DataByteList;
}

export interface AsmView {
    asm: SH.AsmList;
}