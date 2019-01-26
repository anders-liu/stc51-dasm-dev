import * as Redux from "redux";

import * as A from "./actions";
import * as S from "./state";

export const actionListenerMiddleware = ((store: Redux.MiddlewareAPI<S.AppState>) => (next: Redux.Dispatch<S.AppState>) => (action: Redux.Action) => {
    switch (action.type as A.ActionType) {
        case "OPEN_FILE": {
            const { appInfo } = store.getState();
            const { file } = action as A.OpenFileAction;
            document.title = `${file.name} - ${appInfo.title}`
            break;
        }
        case "JUMP_TO_ASM_LABEL": {
            const { label } = action as A.JumpToAsmLabelAction;
            const elem = document.getElementById(label);
            if (elem) {
                elem.scrollIntoView();
            }
            break;
        }
        case "SET_HEX": {
            window.addEventListener("beforeunload", (evt) => {
                if (!window.confirm("即将离开此页面，打开的文件将丢失。确定离开吗？")) {
                    evt.preventDefault();
                    evt.returnValue = "";
                }
            });
        }
    }
    return next(action);
}) as Redux.Middleware;
