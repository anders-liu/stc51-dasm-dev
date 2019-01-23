import * as React from "react";
import * as ReactRedux from "react-redux";

import * as S from "../store/state";
import * as U from "../../../shared/utilities";
import * as SH from "../../../shared/schemas";

interface ConnectedProps {
    hexView?: S.HexView;
}

function mapStateToProps(state: S.AppState): ConnectedProps {
    const { hexView } = state;
    return {
        hexView
    };
}

class HexViewClass extends React.Component<ConnectedProps> {
    public render(): JSX.Element | null {
        const { hexView } = this.props;
        if (!hexView) return null;

        return (
            <div id="hex-view">
                <h2>HEX文件内容</h2>
                <table>
                    <thead>
                        <tr>
                            <th className="table-header-v">行<br />号</th>
                            <th className="table-header-v">起<br />始<br />标<br />记</th>
                            <th className="table-header-v">字<br />节<br />数</th>
                            <th className="table-header-v">地址</th>
                            <th className="table-header-v">类<br />型</th>
                            <th className="table-header-v">数据</th>
                            <th className="table-header-v">校<br />验<br />和</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderHexLines(hexView.hex)}
                    </tbody>
                </table>
            </div>
        );
    }

    private renderHexLines(hex: SH.HexLineList): JSX.Element[] {
        let rows: JSX.Element[] = [];
        for (let key in hex) {
            rows.push(this.renderHexLine(hex[key]));
        }
        return rows;
    }

    private renderHexLine(line: SH.HexLine): JSX.Element {
        if (line.text) {
            return (
                <tr className="code">
                    <td className="table-header-h hex-line-number">{line.number}</td>
                    <td className="table-header-h hex-start">:</td>
                    <td className="hex-count">{line.count!.str}</td>
                    <td className="hex-address">{line.address!.str}</td>
                    <td className="hex-type">{line.type!.str}</td>
                    <td className="hex-data">{line.data!.value.map(v => (
                        <span>{U.formatU1Hex(v)}</span>
                    ))}</td>
                    <td className="hex-checksum">{line.checkSum!.str}</td>
                    <td className={line.error ? "hex-error" : ""}>
                        {line.error ? line.error : ""}
                    </td>
                </tr>
            );
        } else {
            return (
                <tr className="code">
                    <td className="table-header-h hex-line-number">{line.number}</td>
                    <td colSpan={6}></td>
                    <td className={line.error ? "hex-error" : ""}>
                    </td>
                </tr >
            );
        }
    }
}

export const HexView = ReactRedux.connect(mapStateToProps)(HexViewClass);