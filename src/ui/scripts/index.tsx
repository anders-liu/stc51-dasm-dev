import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import * as packageJson from "package.json";
import * as S from "./store/state";
import * as R from "./store/reducers";
import { App } from "./components/app";
import { actionListenerMiddleware } from "./store/action-listener";
import { workerClientMiddleware, initWorkerClient } from "./worker-client";

const appInfo: S.AppInfo = {
    title: packageJson.title,
    version: packageJson.version,
    author: packageJson.author,
    homepage: packageJson.homepage,
    bugsUrl: packageJson.bugs_url,
    releaseNotesUrl: packageJson.release_notes,
    buildTimeLocal: new Date(Date.parse(packageJson.build_time)).toLocaleString(),
    year: new Date().getFullYear().toString(),
};

const defaultState: S.AppState = {
    appInfo,
};

document.title = `${appInfo.title}`;
window.addEventListener("beforeunload", (evt) =>{
    if(!window.confirm("即将离开此页面，打开的文件将丢失。确定离开吗？")) {
        evt.preventDefault();
        evt.returnValue = "";
    }
});

const _w = window as any;
const composeEnhancers = _w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const store = Redux.createStore(R.appReducer, defaultState, composeEnhancers(
    Redux.applyMiddleware(
        actionListenerMiddleware,
        workerClientMiddleware)
));

initWorkerClient(store);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App />
    </ReactRedux.Provider>,
    document.getElementById("app")
);