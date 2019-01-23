export interface HexLine {
    number: number;  // 从1开始
    text: string;

    count?: HexField<number>;
    address?: HexField<number>;
    type?: HexField<HexDataType>;
    data?: HexField<number[]>;
    checkSum?: HexField<number>;

    error?: HexError;
    amendment?: string;
}

export interface HexField<T> {
    str: string;
    value: T;
}

export enum HexDataType {
    DATA,
    EOF,
    EX_SEG_ADDR,  // 暂不支持
    ST_SEG_ADDR,  // 暂不支持
    EX_LIN_ADDR,  // 暂不支持
    ST_LIN_ADDR,  // 暂不支持
}

export interface HexLineList {
    [key: number]: HexLine;
    totalBytes: number;
}

export type HexError
    = "HEX_E_CHECKSUM"
    | "HEX_E_FORMAT"
    | "HEX_E_LENGTH"
    | "HEX_E_NO_EOF"
    | "HEX_E_NOT_SUPPORTED"
    | "HEX_E_OVERLAP"
    ;

export interface DataByte {
    sourceLineNumber: number;
    sourceOffset: number;
    address: number;
    data: number;
}

export interface DataByteList {
    [key: number]: DataByte;
}

export type OpcodeType
    = "ACALL" | "ADD" | "ADDC" | "AJMP" | "ANL"
    | "CJNE" | "CLR" | "CPL"
    | "DA" | "DEC" | "DIV" | "DJNZ"
    | "INC"
    | "JB" | "JBC" | "JC" | "JMP" | "JNB" | "JNC" | "JNZ" | "JZ"
    | "LCALL" | "LJMP"
    | "MOV" | "MOVC" | "MOVX" | "MUL"
    | "NOP"
    | "ORL"
    | "POP" | "PUSH"
    | "RET" | "RETI"
    | "RL" | "RLC" | "RR" | "RRC"
    | "SETB" | "SJMP" | "SUBB" | "SWAP"
    | "XCH" | "XCHD" | "XRL"
    | "<UNKNOWN>" | "DB"
    ;

export enum UniqueOpcode {
    NOP, AJMP_PAGE0, LJMP, RR, INC_A, INC_DIR, INC_AT_R0, INC_AT_R1,
    INC_R0, INC_R1, INC_R2, INC_R3, INC_R4, INC_R5, INC_R6, INC_R7,
    JBC, ACALL_PAGE0, LCALL, RRC, DEC_A, DEC_DIR, DEC_AT_R0, DEC_AT_R1,
    DEC_R0, DEC_R1, DEC_R2, DEC_R3, DEC_R4, DEC_R5, DEC_R6, DEC_R7,
    JB, AJMP_PAGE1, RET, RL, ADD_IMM, ADD_DIR, ADD_AT_R0, ADD_AT_R1,
    ADD_R0, ADD_R1, ADD_R2, ADD_R3, ADD_R4, ADD_R5, ADD_R6, ADD_R7,
    JNB, ACALL_PAGE1, RETI, RLC, ADDC_IMM, ADDC_DIR, ADDC_AT_R0, ADDC_AT_R1,
    ADDC_R0, ADDC_R1, ADDC_R2, ADDC_R3, ADDC_R4, ADDC_R5, ADDC_R6, ADDC_R7,
    JC, AJMP_PAGE2, ORL_DIR_A, ORL_DIR_IMM, ORL_IMM, ORL_DIR, ORL_AT_R0, ORL_AT_R1,
    ORL_R0, ORL_R1, ORL_R2, ORL_R3, ORL_R4, ORL_R5, ORL_R6, ORL_R7,
    JNC, ACALL_PAGE2, ANL_DIR_A, ANL_DIR_IMM, ANL_IMM, ANL_DIR, ANL_AT_R0, ANL_AT_R1,
    ANL_R0, ANL_R1, ANL_R2, ANL_R3, ANL_R4, ANL_R5, ANL_R6, ANL_R7,
    JZ, AJMP_PAGE3, XRL_DIR_A, XRL_DIR_IMM, XRL_IMM, XRL_DIR, XRL_AT_R0, XRL_AT_R1,
    XRL_R0, XRL_R1, XRL_R2, XRL_R3, XRL_R4, XRL_R5, XRL_R6, XRL_R7,
    JNZ, ACALL_PAGE3, ORL_C_BIT, JMP, MOV_A_IMM, MOV_DIR_IMM, MOV_AT_R0_IMM, MOV_AT_R1_IMM,
    MOV_R0_IMM, MOV_R1_IMM, MOV_R2_IMM, MOV_R3_IMM, MOV_R4_IMM, MOV_R5_IMM, MOV_R6_IMM, MOV_R7_IMM,
    SJMP, AJMP_PAGE4, ANL_C_BIT, MOVC_PC, DIV, MOV_DIR_DIR, MOV_DIR_AT_R0, MOV_DIR_AT_R1,
    MOV_DIR_R0, MOV_DIR_R1, MOV_DIR_R2, MOV_DIR_R3, MOV_DIR_R4, MOV_DIR_R5, MOV_DIR_R6, MOV_DIR_R7,
    MOV_DPTR_IMM2, ACALL_PAGE4, MOV_BIT_C, MOVC_DPTR, SUBB_IMM, ASUBB_DIR, SUBB_AT_R0, SUBB_AT_R1,
    SUBB_R0, SUBB_R1, SUBB_R2, SUBB_R3, SUBB_R4, SUBB_R5, SUBB_R6, SUBB_R7,
    ORL_C_NBIT, AJMP_PAGE5, MOV_C_BIT, INC_DPTR, MUL, _UNKNOWN_, MOV_AT_R0_DIR, MOV_AT_R1_DIR,
    MOV_R0_DIR, MOV_R1_DIR, MOV_R2_DIR, MOV_R3_DIR, MOV_R4_DIR, MOV_R5_DIR, MOV_R6_DIR, MOV_R7_DIR,
    ANL_C_NBIT, ACALL_PAGE5, CPL_BIT, CPL_C, CJNE_A_IMM, CJNE_A_DIR, CJNE_AT_R0_IMM, CJNE_AT_R1_IMM,
    CJNE_R0_IMM, CJNE_R1_IMM, CJNE_R2_IMM, CJNE_R3_IMM, CJNE_R4_IMM, CJNE_R5_IMM, CJNE_R6_IMM, CJNE_R7_IMM,
    PUSH, AJMP_PAGE6, CLR_BIT, CLR_C, SWAP, XCH_DIR, XCH_AT_R0, XCH_AT_R1,
    XCH_R0, XCH_R1, XCH_R2, XCH_R3, XCH_R4, XCH_R5, XCH_R6, XCH_R7,
    POP, ACALL_PAGE6, SETB_BIT, SETB_C, DA, DJNZ_DIR, XCHD_AT_R0, XCHD_AT_R1,
    DJNZ_R0, DJNZ_R1, DJNZ_R2, DJNZ_R3, DJNZ_R4, DJNZ_R5, DJNZ_R6, DJNZ_R7,
    MOVX_A_AT_DPTR, AJMP_PAGE7, MOVX_A_AT_R0, MOVX_A_AT_R1, CLR_A, MOV_A_DIR, MOV_A_AT_R0, MOV_A_AT_R1,
    MOV_A_R0, MOV_A_R1, MOV_A_R2, MOV_A_R3, MOV_A_R4, MOV_A_R5, MOV_A_R6, MOV_A_R7,
    MOVX_AT_DPTR_A, ACALL_PAGE7, MOVX_AT_R0_A, MOVX_AT_R1_A, CPL_A, MOV_DIR_A, MOV_AT_R0_A, MOV_AT_R1_A,
    MOV_R0_A, MOV_R1_A, MOV_R2_A, MOV_R3_A, MOV_R4_A, MOV_R5_A, MOV_R6_A, MOV_R7_A
}

export type NamedOprandType
    = "@A+DPTR" | "@A+PC" | "@DPTR" | "@R0" | "@R1"
    | "A" | "AB" | "C" | "DPTR"
    | "R0" | "R1" | "R2" | "R3" | "R4" | "R5" | "R6" | "R7"
    ;

export type OprandType = "ADDR" | "BIT" | "DB" | "DIR" | "IMM" | "NBIT";

export interface TypedOprand {
    type: OprandType;
    length: number;
    data: number;
    str: string;
    // 对于相对地址，data字段保存计算后的结果，也就是最终的目标地址；
    // 而raw_data保存指令中的操作数。
    raw_data?: number;
}

export interface DasmOptions {

}

export type InstructionErrorType
    = "ASM_E_TARGET"  // 跳转的目标地址不存在
    | "ASM_E_EOF"     // 一条指令没分析完就遇到了EOF
    ;

export type Instruction
    = RealInstruction
    | DbInstruction
    | GapInstruction
    ;

export interface RealInstruction {
    address: number;
    bytes: DataByte[];
    opcode: OpcodeType;
    oprand1?: TypedOprand | NamedOprandType;
    oprand2?: TypedOprand | NamedOprandType;
    oprand3?: TypedOprand | NamedOprandType;
    isAbsJump?: boolean;
    isCondJump?: boolean;
    isCall?: boolean;
    jumpTarget?: number;
    jumpSource?: RealInstruction[];
    isIntEntry?: boolean;
    error?: InstructionErrorType;
}

export interface DbInstruction {
    isDb: boolean;
    address: number;
    bytes: DataByte[];
    opcode: OpcodeType;  // DB
    oprand1: TypedOprand;
}

export interface GapInstruction {
    isGap: boolean;
    address: number;
    length: number;
}

export interface AsmList {
    [address: number]: Instruction;
}
