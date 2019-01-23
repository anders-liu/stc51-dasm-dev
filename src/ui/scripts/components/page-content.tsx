import * as React from "react";
import * as ReactRedux from "react-redux";

import * as S from "../store/state";
import { FileOpener } from "./file-opener";
import { HexView } from "./hex-view";
import { DataBytesView } from "./data-bytes-view";
import { AsmView } from "./asm-view";

interface ConnectedProps {
}

function mapStateToProps(state: S.AppState): ConnectedProps {
    return {
    };
}

class PageContentClass extends React.Component<ConnectedProps> {
    public render(): JSX.Element {
        return (
            <section id="app-content">
                <FileOpener />
                <section id="view-container">
                    <AsmView />
                    <DataBytesView />
                    <HexView />
                </section>
            </section>
        )
    }
}

export const PageContent = ReactRedux.connect(mapStateToProps)(PageContentClass);