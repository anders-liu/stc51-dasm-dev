import * as React from "react";
import * as ReactRedux from "react-redux";

import * as A from "../store/actions";
import * as S from "../store/state";
import * as U from "../../../shared/utilities";
import * as SH from "../../../shared/schemas";

interface ConnectedProps {
    asmView?: S.AsmView;
}

function mapStateToProps(state: S.AppState): ConnectedProps {
    const { asmView } = state;
    return {
        asmView
    };
}

interface ConnectedEvents {
    onJumpToAsmLabel: (label: string) => void;
}

function mapDispatchToProps(dispatch: ReactRedux.Dispatch<S.AppState>): ConnectedEvents {
    return {
        onJumpToAsmLabel: (label) => dispatch(A.createJumpToAsmLabelAction(label))
    };
}

class AsmViewClass extends React.Component<ConnectedProps & ConnectedEvents> {
    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element | null {
        const { asmView } = this.props;
        if (!asmView) return null;

        return (
            <div id="asm-view">
                <h2>汇编代码</h2>
                {this.renderAsmErrors()}
                <table>
                    <tbody>
                        {this.renderAsmRows()}
                    </tbody>
                </table>
            </div>
        );
    }

    private renderAsmErrors(): JSX.Element {
        const { asmView } = this.props;
        const { asm } = asmView!;

        let errors: string[] = [];
        for (let key in asm) {
            if ((asm[key] as SH.RealInstruction).error) {
                errors.push((asm[key] as SH.RealInstruction).error!);
            }
        }
        if (errors) {
            return <p>{errors}</p>;
        } else {
            return <p></p>;
        }
    }

    private renderAsmRows(): JSX.Element[] {
        const { asmView } = this.props;
        const { asm } = asmView!;
        let rows: JSX.Element[] = [];
        let lastInst: SH.Instruction | null = null;
        for (let address in asm) {
            const ci = asm[address];
            if ((ci as SH.GapInstruction).isGap) {
                rows.push(this.renderSeparatorRow(true));
                rows.push(this.renderGapRow(ci as SH.GapInstruction));
            } else if ((ci as SH.DbInstruction).isDb) {
                if (lastInst && (
                    (lastInst as SH.GapInstruction).isGap ||
                    (lastInst as SH.RealInstruction).isAbsJump)) {
                    rows.push(this.renderSeparatorRow(true));
                }

                if (!lastInst || !(lastInst as SH.DbInstruction).isDb) {
                    rows.push(this.renderLabelRow(ci as SH.DbInstruction));
                }
                rows.push(this.renderDbRow(ci as SH.DbInstruction));
            } else {
                if (lastInst && (
                    (lastInst as SH.DbInstruction).isDb ||
                    (lastInst as SH.GapInstruction).isGap ||
                    (lastInst as SH.RealInstruction).isAbsJump)
                ) {
                    rows.push(this.renderSeparatorRow(true));
                } else if (lastInst && (
                    (lastInst as SH.RealInstruction).isCall ||
                    (lastInst as SH.RealInstruction).isCondJump
                )) {
                    rows.push(this.renderSeparatorRow(false));
                } else if ((ci as SH.RealInstruction).jumpSource) {
                    rows.push(this.renderSeparatorRow(false));
                }

                if ((ci as SH.RealInstruction).isIntEntry) {
                    const n = (ci.address - 3) / 8;
                    rows.push(this.renderTextRow(`; 中断入口 ${n}`));
                }

                if ((ci as SH.RealInstruction).jumpSource) {
                    rows.push(this.renderLabelRow(ci as SH.RealInstruction));
                }

                rows.push(this.renderInstRow(ci as SH.RealInstruction));
            }
            lastInst = ci;
        }
        rows.push(this.renderSeparatorRow(true));
        rows.push(this.renderTextRow("END"));
        return rows;
    }

    // 标号行： |          标号: |(空)                                    |
    // 指令行： | 地址 | 字节数据 | 操作码 | 全部操作数的列表 | 注释或/和错误 |
    // DB行： 同上
    // 空白行： |---------------------------------------------------------|

    private renderLabelRow(ci: SH.RealInstruction | SH.DbInstruction) {
        const label = U.formatCodeAddress(ci.address);
        return <tr className="code">
            <td colSpan={2} className="asm-label" id={label}>
                {label + ":"}
            </td>
            <td colSpan={3}></td>
        </tr>;
    }

    private renderGapRow(ci: SH.GapInstruction): JSX.Element {
        return this.renderTextRow(`; ${ci.length} (${U.formatHex(ci.length, 0, true)}) 字节空白`);
    }

    private renderDbRow(ci: SH.DbInstruction): JSX.Element {
        return (
            <tr className="code">
                <td className="asm-addr">{U.formatU2Hex(ci.address)}</td>
                <td className="asm-db">{this.renderDataBytes(ci.bytes)}</td>
                <td className="asm-opcode">{ci.opcode}</td>
                <td className="asm-oprand">{this.renderOprands(ci)}</td>
            </tr>
        );
    }

    private renderInstRow(ci: SH.RealInstruction): JSX.Element {
        return (
            <tr className="code">
                <td className="asm-addr">{U.formatU2Hex(ci.address)}</td>
                <td className="asm-db">{this.renderDataBytes(ci.bytes)}</td>
                <td className="asm-opcode">{ci.opcode}</td>
                <td className="asm-oprand">{this.renderOprands(ci)}</td>
                <td>{ci.error}</td>
            </tr>
        );
    }

    private renderSeparatorRow(isHard?: boolean): JSX.Element {
        return (
            <tr className="code">
                <td colSpan={5}>{isHard ? <hr /> : " "}</td>
            </tr>
        );
    }

    private renderTextRow(text: string): JSX.Element {
        return (
            <tr className="code">
                <td colSpan={2}></td>
                <td colSpan={3}>{text}</td>
            </tr>
        );
    }

    private renderDataBytes(bytes: SH.DataByte[]): JSX.Element[] {
        return bytes.map(v => <span>{U.formatU1Hex(v.data)}</span>);
    }

    private renderOprands(ci: SH.RealInstruction): JSX.Element[] {
        let spans: JSX.Element[] = [];
        if (ci.oprand1) {
            spans.push(this.renderOprandSpan(ci.oprand1));
            if (ci.oprand2) {
                spans.push(<span>, </span>);
            }
        }
        if (ci.oprand2) {
            spans.push(this.renderOprandSpan(ci.oprand2));
            if (ci.oprand3) {
                spans.push(<span>, </span>);
            }
        }
        if (ci.oprand3) {
            spans.push(this.renderOprandSpan(ci.oprand3));
        }
        return spans;
    }

    private renderOprandSpan(oprand: SH.TypedOprand | SH.NamedOprandType): JSX.Element {
        const { onJumpToAsmLabel } = this.props;

        const str = this.getOprandStr(oprand);
        const isAddr = (oprand as SH.TypedOprand).type === "ADDR";
        return (
            <span
                className={isAddr ? "asm-jmp-target" : undefined}
                onClick={isAddr ? () => onJumpToAsmLabel(str) : undefined}>
                {str}
            </span>
        );
    }

    private getOprandStr(oprand: SH.TypedOprand | SH.NamedOprandType): string {
        if (!oprand) {
            return "";
        } else if (typeof (oprand) === "string") {
            return oprand;
        } else {
            return (oprand as SH.TypedOprand).str;
        }
    }
}

export const AsmView = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AsmViewClass);