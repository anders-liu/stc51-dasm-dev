import * as React from "react";
import * as ReactRedux from "react-redux";

import * as A from "../store/actions";
import * as S from "../store/state";

import { isWorkerBusy } from "../store/selectors";

interface ConnectedProps {
    isWorkerBusy: boolean;
}

function mapStateToProps(state: S.AppState): ConnectedProps {
    return {
        isWorkerBusy: isWorkerBusy(state)
    };
}

interface ConnectedEvents {
    onOpenFile: (file: File) => void;
}

function mapDispatchToProps(dispatch: ReactRedux.Dispatch<S.AppState>): ConnectedEvents {
    return {
        onOpenFile: (file) => dispatch(A.createOpenFileAction(file))
    };
}

interface State {
    fileSelected: boolean;
}

class FileOpenerClass extends React.Component<ConnectedProps & ConnectedEvents, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            fileSelected: false
        };
        this.fileInput = React.createRef();
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div id="file-opener">
                <label htmlFor="file-input">选择HEX文件：</label>
                <input id="file-input"
                    ref={this.fileInput}
                    type="file" accept=".hex"
                    onChange={this.handleFileInputChange}></input>
                <button onClick={this.handleGoButtonClick} disabled={!this.canGo()}>走起</button>
            </div>
        );
    }

    private hasSelectedFile(): boolean {
        return (this.fileInput
            && this.fileInput.current
            && this.fileInput.current.files
            && this.fileInput.current.files[0])
            != null;
    }

    private canGo(): boolean {
        const { isWorkerBusy } = this.props;
        const { fileSelected } = this.state;
        return !isWorkerBusy && fileSelected;
    }

    private handleFileInputChange(): void {
        this.setState({
            fileSelected: this.hasSelectedFile()
        });
    }

    private handleGoButtonClick(): void {
        if (this.canGo()) {
            this.props.onOpenFile(this.fileInput!.current!.files![0]);
        }
    }

    private fileInput: React.RefObject<HTMLInputElement>;
}

export const FileOpener = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(FileOpenerClass);