import * as React from "react";
import * as ReactRedux from "react-redux";

import * as S from "../store/state";
import { FileOpener } from "./file-opener";
import { HexView } from "./hex-view";
import { DataBytesView } from "./data-bytes-view";
import { AsmView } from "./asm-view";

interface ConnectedProps {
    pageId: S.PageIdType;
    showDonationPrompt: boolean;
}

function mapStateToProps(state: S.AppState): ConnectedProps {
    const { hexView } = state;
    const { pageId } = state.appInfo;

    return {
        pageId,
        showDonationPrompt: hexView == null
    };
}

class PageContentClass extends React.Component<ConnectedProps> {
    public render(): JSX.Element {
        const { pageId } = this.props;

        let pageContent: JSX.Element | null = null;
        switch (pageId) {
            case "MAIN": pageContent = this.renderMainPageContent(); break;
            case "DONATE": pageContent = this.renderDonatePageContent(); break;
        }

        return (
            <section id="app-content">
                {pageContent}
            </section>
        );
    }

    public renderMainPageContent(): JSX.Element {
        const { showDonationPrompt } = this.props;

        return (
            <React.Fragment>
                <FileOpener />
                <section id="view-container">
                    <AsmView />
                    <DataBytesView />
                    <HexView />
                </section>
                {showDonationPrompt && (
                    <div id="donation-prompt">
                        {"如果这个应用对您有所帮助，欢迎采取资助的方式进行鼓励 (｡◕‿◕｡) ↓"}
                    </div>
                )}
            </React.Fragment>
        );
    }

    private renderDonatePageContent(): JSX.Element {
        return (
            <React.Fragment>
                <h2>资助作者</h2>
                <p>这个小工具能对您有所帮助，是作者的荣幸。对于您的资助，作者表示万分感激！</p>
                <table>
                    <thead>
                        <tr><th>微信</th><th>支付宝</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><img src="donate-wechat.jpg" /></td><td><img src="donate-alipay.jpg" /></td></tr>
                    </tbody>
                </table>
                <p>如有兴致，请在备注/留言中注明用于资助STC51反汇编器。</p>
                <p>另外，作者计划不定期在此页面列出资助者以示感谢，如果您做好事不想留名，或希望留一个别致的名号，也请在留言/备注中告知；作者默认列出收款信息中看到的名字。</p>
            </React.Fragment>
        );
    }
}

export const PageContent = ReactRedux.connect(mapStateToProps)(PageContentClass);