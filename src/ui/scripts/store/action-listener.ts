import * as Redux from "redux";

import * as A from "./actions";
import * as S from "./state";

export const actionListenerMiddleware = ((store: Redux.MiddlewareAPI<S.AppState>) => (next: Redux.Dispatch<S.AppState>) => (action: Redux.Action) => {
    switch (action.type) {
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
    }
    return next(action);
}) as Redux.Middleware;
