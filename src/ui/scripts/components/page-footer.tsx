import * as React from "react";
import * as ReactRedux from "react-redux";

import * as S from "../store/state";

interface ConnectedProps {
    appInfo: S.AppInfo;
}

function mapStateToProps(state: S.AppState): ConnectedProps {
    const { appInfo } = state;
    return {
        appInfo
    };
}

class PageFooterClass extends React.Component<ConnectedProps> {
    public render(): JSX.Element {
        const { appInfo } = this.props;
        const { title, version, author, homepage, bugsUrl, releaseNotesUrl, buildTimeLocal, year, pageId } = appInfo;
        const showDonate = pageId !== "DONATE";

        return (
            <footer id="app-footer">
                <div><strong>{title}</strong></div>
                <div>&copy; {year} {author}</div>
                <div>版本 {version}</div>
                <div>{buildTimeLocal}</div>
                <div><a href={`${releaseNotesUrl}#${version.replace(/\./g, "")}`} target="_blank">版本说明</a></div>
                <div><a href="/latest" target="_blank">尝试新版</a></div>
                <div><a href={homepage} target="_blank">GitHub</a></div>
                <div><a href={bugsUrl} target="_blank">报bug</a></div>
                {showDonate && (
                    <div className="right"><a href={"?donate"} target="_blank">资助作者</a></div>
                )}
            </footer>
        )
    }
}

export const PageFooter = ReactRedux.connect(mapStateToProps)(PageFooterClass);