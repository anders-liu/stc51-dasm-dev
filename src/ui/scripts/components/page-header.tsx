import * as React from "react";
import * as ReactRedux from "react-redux";

import * as S from "../store/state";

interface ConnectedProps {
    appInfo: S.AppInfo;
}

function mapStateToProps(state: S.AppState): ConnectedProps {
    const { appInfo } = state;
    return { appInfo };
}

class PageHeaderClass extends React.Component<ConnectedProps> {
    public render(): JSX.Element {
        const { appInfo } = this.props;
        return (
            <header id="app-header">
                <h1>{appInfo.title}</h1>
            </header>
        )
    }
}

export const PageHeader = ReactRedux.connect(mapStateToProps)(PageHeaderClass);