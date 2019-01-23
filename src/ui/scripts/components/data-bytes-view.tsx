import * as React from "react";
import * as ReactRedux from "react-redux";

import * as S from "../store/state";
import * as SL from "../store/selectors";
import * as U from "../../../shared/utilities";
import * as SH from "../../../shared/schemas";

interface ConnectedProps {
    dataBytesView?: S.DataBytesView;
    totalBytes: number;
}

function mapStateToProps(state: S.AppState): ConnectedProps {
    const { dataBytesView } = state;
    const totalBytes = SL.getTotalBytes(state);
    return {
        dataBytesView,
        totalBytes
    };
}

class DataBytesViewClass extends React.Component<ConnectedProps> {
    public render(): JSX.Element | null {
        const { dataBytesView } = this.props;
        if (!dataBytesView) return null;

        return (
            <div id="db-view">
                <h2>字节数据</h2>
                <table>
                    <thead>
                        {this.renderHeaderRow()}
                    </thead>
                    <tbody>
                        {this.renderDataRows()}
                    </tbody>
                </table>
            </div>
        );
    }

    private renderHeaderRow(): JSX.Element {
        return (
            <tr className="code">
                <th className="table-header-v">地址</th>
                <th className="table-header-v">+0</th>
                <th className="table-header-v">+1</th>
                <th className="table-header-v">+2</th>
                <th className="table-header-v">+3</th>
                <th className="table-header-v">+4</th>
                <th className="table-header-v">+5</th>
                <th className="table-header-v">+6</th>
                <th className="table-header-v">+7</th>
                <th className="table-header-v">+8</th>
                <th className="table-header-v">+9</th>
                <th className="table-header-v">+A</th>
                <th className="table-header-v">+B</th>
                <th className="table-header-v">+C</th>
                <th className="table-header-v">+D</th>
                <th className="table-header-v">+E</th>
                <th className="table-header-v">+F</th>
            </tr>
        );
    }

    private renderDataRows(): JSX.Element[] {
        const { dataBytesView, totalBytes } = this.props;
        const { data } = dataBytesView!;

        let rows: JSX.Element[] = [];
        let cells: JSX.Element[] = [this.renderAddressHeader(0)];

        for (let a = 0; a < totalBytes; a++) {
            if (a > 0 && a % 16 === 0) {
                rows.push(<tr className="code">{cells}</tr>);
                cells = [this.renderAddressHeader(a)];
            }

            const db = data[a];
            if (!db) {
                cells.push(<td className="db-gap"></td>);
            } else {
                cells.push(<td className="db">{U.formatU1Hex(db.data)}</td>);
            }
        }

        if (cells.length > 1) {
            rows.push(<tr className="code">{cells}</tr>);
        }

        return rows;
    }

    private renderAddressHeader(address: number): JSX.Element {
        return <td className="table-header-h">{U.formatU2Hex(address)}</td>;
    }

    private static readonly BYTES_PER_LINE = 16;
}

export const DataBytesView = ReactRedux.connect(mapStateToProps)(DataBytesViewClass);