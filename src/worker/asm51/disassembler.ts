import * as S from "../../shared/schemas";
import * as U from "../../shared/utilities";
import * as MD from "./instruction-metadata";

const _md = MD.instructionMetadata;

export function dasm(
    options: S.DasmOptions,
    data: S.DataByteList,
    length: number): S.AsmList {

    let result: S.AsmList = {};
    let toBeDasm: number[] = [];

    let ctx: DasmContext = {
        options,
        data,
        length,
        toBeDasm,
        result
    };
    dasmInternal(ctx);
    return result;
}

interface DasmContext {
    options: S.DasmOptions;
    data: S.DataByteList;
    length: number;
    toBeDasm: number[];  // 遇到有条件跳转时，保存跳转目标地址以供后续反汇编
    result: S.AsmList;
}

interface DasmInstructions {
    [address: number]: S.RealInstruction;
}

function dasmInternal(ctx: DasmContext): void {
    // 从入口点开始反汇编
    dasmFrom(0, ctx);
    cleanToBeDasm(ctx);

    // 查找可能的中断入口并反汇编
    // 目前最新的STC单片机支持最多22个中断（STC8）
    for (let i = 0; i < 22; i++) {
        const entry = 3 + i * 8;  // 中断向量从03h开始，每个入口8字节

        // 只有入口位置不是空白，或者还没有被反汇编过，
        // 才有可能是一个中断向量，然后需要猜一下
        if (typeof ctx.data[entry] != null
            && !insideADasm(entry, ctx)
            && guessInterupt(entry, ctx)) {

            dasmFrom(entry, ctx);
            (ctx.result[entry] as S.RealInstruction).isIntEntry = true;
            cleanToBeDasm(ctx);
        }
    }

    // 插入DB指令、空白位置
    insertDbAndGap(ctx);
}

function dasmFrom(address: number, ctx: DasmContext): void {
    let s: number | undefined = address;
    while (true) {
        if (hasDasm(s, ctx)) {
            // 若果已经反汇编过了，结束
            return;
        } else {
            // 取当前位置的指令
            const inst = getInstAt(s, ctx);

            if (inst == null) {
                return;
            }

            // 同时放到反汇编结果列表里
            ctx.result[inst.address] = inst;

            // 检查跳转、调用类的指令
            if (inst.isAbsJump) {
                // 绝对跳转，检查没问题后直接跳到目标地址
                if (inst.jumpTarget == null) {
                    if (inst.opcode !== "RET" && inst.opcode !== "RETI") {
                        inst.error = "ASM_E_TARGET";
                    }
                    return;
                } else if (ctx.data[inst.jumpTarget] == null) {
                    inst.error = "ASM_E_TARGET";
                    return;
                } else {
                    s = inst.jumpTarget;
                }
            } else if (inst.isCondJump || inst.isCall) {
                // 条件跳转，将跳转位置放到toBeDasm队列，然后继续下一条
                if (inst.jumpTarget == null || ctx.data[inst.jumpTarget] == null) {
                    inst.error = "ASM_E_TARGET";
                } else {
                    ctx.toBeDasm.unshift(inst.jumpTarget);
                }
                s += inst.bytes.length;
            } else {
                // 普通指令，继续下一条
                s += inst.bytes.length;
            }
        }
    }
}

function cleanToBeDasm(ctx: DasmContext): void {
    for (let s = ctx.toBeDasm.pop(); s != null; s = ctx.toBeDasm.pop()) {
        dasmFrom(s, ctx);
    }
}

function guessInterupt(address: number, ctx: DasmContext): boolean {
    const inst = getInstAt(address, ctx);

    if (!inst || inst.opcode !== "LJMP") return false;
    return inst.jumpTarget != null
        && ctx.data[inst.jumpTarget] != null
        && !insideADasm(inst.jumpTarget, ctx);
}

function hasDasm(address: number, ctx: DasmContext): boolean {
    return ctx.result[address] != null;
}

// 判断是否指向某指令的中间
function insideADasm(address: number, ctx: DasmContext): boolean {
    for (let s in ctx.result) {
        const sa = Number(s);
        // 指令最长3字节
        if (sa - address > 3) return false;

        const sl = (ctx.result[s] as S.RealInstruction).bytes.length
        if (address >= sa && address < sa + sl) {
            return true;
        }
    }
    return false;
}

function getInstAt(address: number, ctx: DasmContext): S.RealInstruction | null {
    const b0 = ctx.data[address];
    if (b0 == null) {
        return null;
    }

    const {
        opcode, bytes: mdBytes,
        oprand1, oprand2,
        isAbsJump, isCondJump, isCall,
        dasmOprand
    } = _md[b0.data];

    if (address + mdBytes > ctx.length) {
        const bytes = [b0];
        return {
            address, bytes, opcode, oprand1, oprand2,
            isAbsJump, isCondJump, isCall,
            error: "ASM_E_EOF"
        };
    }

    let bytes: S.DataByte[] = [];
    for (let i = 0; i < mdBytes; i++) {
        bytes.push(ctx.data[address + i]);
    }

    let inst: S.RealInstruction = {
        address, bytes, opcode, oprand1, oprand2,
        isAbsJump, isCondJump, isCall
    };

    if (dasmOprand) {
        dasmOprand(inst);
    }

    return inst;
}

function insertDbAndGap(ctx: DasmContext): void {
    let s = 0;
    while (s < ctx.length) {
        if (ctx.result[s] != null) {
            // s处有反汇编指令，
            // 回填可能的跳转源，然后跳到下一个位置查看
            const ci = ctx.result[s] as S.RealInstruction;
            const jumpTarget = ci && ci.jumpTarget;
            if (jumpTarget != null && ctx.result[jumpTarget] != null) {
                let ti = ctx.result[jumpTarget] as S.RealInstruction;
                ti.jumpSource = ti.jumpSource || [];
                ti.jumpSource.push(ci);
            }
            s += ci.bytes.length;
        } else {
            if (ctx.data[s] != null) {
                // s处没有反汇编指令，但字节数据中s处有数据
                // 当做DB指令处理
                const db = ctx.data[s];
                let bytes: S.DataByte[] = [db];
                ctx.result[s] = {
                    isDb: true,
                    address: s,
                    bytes,
                    opcode: "DB",
                    oprand1: {
                        type: "DB",
                        length: 1,
                        data: db.data,
                        str: U.formatU1Hex(db.data)
                    }
                };
                s++;
            } else {
                // s处没有反汇编指令，字节数据里也没有对应数据
                // 当做空白位置处理，找到所有连续的空白位置，合并到一起
                let e = s + 1;
                while (ctx.result[e] == null && ctx.data[e] == null) {
                    e++;
                }
                ctx.result[s] = { address: s, isGap: true, length: e - s };
                s = e;
            }
        }
    }
}