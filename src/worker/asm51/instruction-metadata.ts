import * as S from "../../shared/schemas";
import * as U from "../../shared/utilities";

export interface InstructionMetadata {
    opcode: S.OpcodeType;
    bytes: number;
    oprand1?: S.NamedOprandType;
    oprand2?: S.NamedOprandType;
    isAbsJump?: boolean;
    isCondJump?: boolean;
    isCall?: boolean;
    dasmOprand?: (ci: S.RealInstruction) => void;
}

export const instructionMetadata: InstructionMetadata[] = [
    { /* 0x00 */ opcode: "NOP", bytes: 1 },
    { /* 0x01 */ opcode: "AJMP", bytes: 2, isAbsJump: true, dasmOprand: dasmOpAbs },
    { /* 0x02 */ opcode: "LJMP", bytes: 3, isAbsJump: true, dasmOprand: dasmOpLaddr },
    { /* 0x03 */ opcode: "RR", bytes: 1, oprand1: "A" },
    { /* 0x04 */ opcode: "INC", bytes: 1, oprand1: "A" },
    { /* 0x05 */ opcode: "INC", bytes: 2, dasmOprand: dasmOpDir },
    { /* 0x06 */ opcode: "INC", bytes: 1, oprand1: "@R0" },
    { /* 0x07 */ opcode: "INC", bytes: 1, oprand1: "@R1" },
    { /* 0x08 */ opcode: "INC", bytes: 1, oprand1: "R0" },
    { /* 0x09 */ opcode: "INC", bytes: 1, oprand1: "R1" },
    { /* 0x0A */ opcode: "INC", bytes: 1, oprand1: "R2" },
    { /* 0x0B */ opcode: "INC", bytes: 1, oprand1: "R3" },
    { /* 0x0C */ opcode: "INC", bytes: 1, oprand1: "R4" },
    { /* 0x0D */ opcode: "INC", bytes: 1, oprand1: "R5" },
    { /* 0x0E */ opcode: "INC", bytes: 1, oprand1: "R6" },
    { /* 0x0F */ opcode: "INC", bytes: 1, oprand1: "R7" },
    { /* 0x10 */ opcode: "JBC", bytes: 3, isCondJump: true, dasmOprand: dasmOpBitRel },
    { /* 0x11 */ opcode: "ACALL", bytes: 2, isCall: true, dasmOprand: dasmOpAbs },
    { /* 0x12 */ opcode: "LCALL", bytes: 3, isCall: true, dasmOprand: dasmOpLaddr },
    { /* 0x13 */ opcode: "RRC", bytes: 1, oprand1: "A" },
    { /* 0x14 */ opcode: "DEC", bytes: 1, oprand1: "A" },
    { /* 0x15 */ opcode: "DEC", bytes: 2, dasmOprand: dasmOpDir },
    { /* 0x16 */ opcode: "DEC", bytes: 1, oprand1: "@R0" },
    { /* 0x17 */ opcode: "DEC", bytes: 1, oprand1: "@R1" },
    { /* 0x18 */ opcode: "DEC", bytes: 1, oprand1: "R0" },
    { /* 0x19 */ opcode: "DEC", bytes: 1, oprand1: "R1" },
    { /* 0x1A */ opcode: "DEC", bytes: 1, oprand1: "R2" },
    { /* 0x1B */ opcode: "DEC", bytes: 1, oprand1: "R3" },
    { /* 0x1C */ opcode: "DEC", bytes: 1, oprand1: "R4" },
    { /* 0x1D */ opcode: "DEC", bytes: 1, oprand1: "R5" },
    { /* 0x1E */ opcode: "DEC", bytes: 1, oprand1: "R6" },
    { /* 0x1F */ opcode: "DEC", bytes: 1, oprand1: "R7" },
    { /* 0x20 */ opcode: "JB", bytes: 3, isCondJump: true, dasmOprand: dasmOpBitRel },
    { /* 0x21 */ opcode: "AJMP", bytes: 2, isAbsJump: true, dasmOprand: dasmOpAbs },
    { /* 0x22 */ opcode: "RET", bytes: 1, isAbsJump: true },
    { /* 0x23 */ opcode: "RL", bytes: 1, oprand1: "A" },
    { /* 0x24 */ opcode: "ADD", bytes: 2, oprand1: "A", dasmOprand: dasmOpXImm },
    { /* 0x25 */ opcode: "ADD", bytes: 2, oprand1: "A", dasmOprand: dasmOpXDir },
    { /* 0x26 */ opcode: "ADD", bytes: 1, oprand1: "A", oprand2: "@R0" },
    { /* 0x27 */ opcode: "ADD", bytes: 1, oprand1: "A", oprand2: "@R1" },
    { /* 0x28 */ opcode: "ADD", bytes: 1, oprand1: "A", oprand2: "R0" },
    { /* 0x29 */ opcode: "ADD", bytes: 1, oprand1: "A", oprand2: "R1" },
    { /* 0x2A */ opcode: "ADD", bytes: 1, oprand1: "A", oprand2: "R2" },
    { /* 0x2B */ opcode: "ADD", bytes: 1, oprand1: "A", oprand2: "R3" },
    { /* 0x2C */ opcode: "ADD", bytes: 1, oprand1: "A", oprand2: "R4" },
    { /* 0x2D */ opcode: "ADD", bytes: 1, oprand1: "A", oprand2: "R5" },
    { /* 0x2E */ opcode: "ADD", bytes: 1, oprand1: "A", oprand2: "R6" },
    { /* 0x2F */ opcode: "ADD", bytes: 1, oprand1: "A", oprand2: "R7" },
    { /* 0x30 */ opcode: "JNB", bytes: 3, isCondJump: true, dasmOprand: dasmOpBitRel },
    { /* 0x31 */ opcode: "ACALL", bytes: 2, isCall: true, dasmOprand: dasmOpAbs },
    { /* 0x32 */ opcode: "RETI", bytes: 1, isAbsJump: true },
    { /* 0x33 */ opcode: "RLC", bytes: 1, oprand1: "A" },
    { /* 0x34 */ opcode: "ADDC", bytes: 2, oprand1: "A", dasmOprand: dasmOpXImm },
    { /* 0x35 */ opcode: "ADDC", bytes: 2, oprand1: "A", dasmOprand: dasmOpXDir },
    { /* 0x36 */ opcode: "ADDC", bytes: 1, oprand1: "A", oprand2: "@R0" },
    { /* 0x37 */ opcode: "ADDC", bytes: 1, oprand1: "A", oprand2: "@R1" },
    { /* 0x38 */ opcode: "ADDC", bytes: 1, oprand1: "A", oprand2: "R0" },
    { /* 0x39 */ opcode: "ADDC", bytes: 1, oprand1: "A", oprand2: "R1" },
    { /* 0x3A */ opcode: "ADDC", bytes: 1, oprand1: "A", oprand2: "R2" },
    { /* 0x3B */ opcode: "ADDC", bytes: 1, oprand1: "A", oprand2: "R3" },
    { /* 0x3C */ opcode: "ADDC", bytes: 1, oprand1: "A", oprand2: "R4" },
    { /* 0x3D */ opcode: "ADDC", bytes: 1, oprand1: "A", oprand2: "R5" },
    { /* 0x3E */ opcode: "ADDC", bytes: 1, oprand1: "A", oprand2: "R6" },
    { /* 0x3F */ opcode: "ADDC", bytes: 1, oprand1: "A", oprand2: "R7" },
    { /* 0x40 */ opcode: "JC", bytes: 2, isCondJump: true, dasmOprand: dasmOpRel },
    { /* 0x41 */ opcode: "AJMP", bytes: 2, isAbsJump: true, dasmOprand: dasmOpAbs },
    { /* 0x42 */ opcode: "ORL", bytes: 2, oprand2: "A", dasmOprand: dasmOpDir },
    { /* 0x43 */ opcode: "ORL", bytes: 3, dasmOprand: dasmOpDirImm },
    { /* 0x44 */ opcode: "ORL", bytes: 2, oprand1: "A", dasmOprand: dasmOpXImm },
    { /* 0x45 */ opcode: "ORL", bytes: 2, oprand1: "A", dasmOprand: dasmOpXDir },
    { /* 0x46 */ opcode: "ORL", bytes: 1, oprand1: "A", oprand2: "@R0" },
    { /* 0x47 */ opcode: "ORL", bytes: 1, oprand1: "A", oprand2: "@R1" },
    { /* 0x48 */ opcode: "ORL", bytes: 1, oprand1: "A", oprand2: "R0" },
    { /* 0x49 */ opcode: "ORL", bytes: 1, oprand1: "A", oprand2: "R1" },
    { /* 0x4A */ opcode: "ORL", bytes: 1, oprand1: "A", oprand2: "R2" },
    { /* 0x4B */ opcode: "ORL", bytes: 1, oprand1: "A", oprand2: "R3" },
    { /* 0x4C */ opcode: "ORL", bytes: 1, oprand1: "A", oprand2: "R4" },
    { /* 0x4D */ opcode: "ORL", bytes: 1, oprand1: "A", oprand2: "R5" },
    { /* 0x4E */ opcode: "ORL", bytes: 1, oprand1: "A", oprand2: "R6" },
    { /* 0x4F */ opcode: "ORL", bytes: 1, oprand1: "A", oprand2: "R7" },
    { /* 0x50 */ opcode: "JNC", bytes: 2, isCondJump: true, dasmOprand: dasmOpRel },
    { /* 0x51 */ opcode: "ACALL", bytes: 2, isCall: true, dasmOprand: dasmOpAbs },
    { /* 0x52 */ opcode: "ANL", bytes: 2, oprand2: "A", dasmOprand: dasmOpDir },
    { /* 0x53 */ opcode: "ANL", bytes: 3, dasmOprand: dasmOpDirImm },
    { /* 0x54 */ opcode: "ANL", bytes: 2, oprand1: "A", dasmOprand: dasmOpXImm },
    { /* 0x55 */ opcode: "ANL", bytes: 2, oprand1: "A", dasmOprand: dasmOpXDir },
    { /* 0x56 */ opcode: "ANL", bytes: 1, oprand1: "A", oprand2: "@R0" },
    { /* 0x57 */ opcode: "ANL", bytes: 1, oprand1: "A", oprand2: "@R1" },
    { /* 0x58 */ opcode: "ANL", bytes: 1, oprand1: "A", oprand2: "R0" },
    { /* 0x59 */ opcode: "ANL", bytes: 1, oprand1: "A", oprand2: "R1" },
    { /* 0x5A */ opcode: "ANL", bytes: 1, oprand1: "A", oprand2: "R2" },
    { /* 0x5B */ opcode: "ANL", bytes: 1, oprand1: "A", oprand2: "R3" },
    { /* 0x5C */ opcode: "ANL", bytes: 1, oprand1: "A", oprand2: "R4" },
    { /* 0x5D */ opcode: "ANL", bytes: 1, oprand1: "A", oprand2: "R5" },
    { /* 0x5E */ opcode: "ANL", bytes: 1, oprand1: "A", oprand2: "R6" },
    { /* 0x5F */ opcode: "ANL", bytes: 1, oprand1: "A", oprand2: "R7" },
    { /* 0x60 */ opcode: "JZ", bytes: 2, isCondJump: true, dasmOprand: dasmOpRel },
    { /* 0x61 */ opcode: "AJMP", bytes: 2, isAbsJump: true, dasmOprand: dasmOpAbs },
    { /* 0x62 */ opcode: "XRL", bytes: 2, oprand2: "A", dasmOprand: dasmOpDir },
    { /* 0x63 */ opcode: "XRL", bytes: 3, dasmOprand: dasmOpDirImm },
    { /* 0x64 */ opcode: "XRL", bytes: 2, oprand1: "A", dasmOprand: dasmOpXImm },
    { /* 0x65 */ opcode: "XRL", bytes: 2, oprand1: "A", dasmOprand: dasmOpXDir },
    { /* 0x66 */ opcode: "XRL", bytes: 1, oprand1: "A", oprand2: "@R0" },
    { /* 0x67 */ opcode: "XRL", bytes: 1, oprand1: "A", oprand2: "@R1" },
    { /* 0x68 */ opcode: "XRL", bytes: 1, oprand1: "A", oprand2: "R0" },
    { /* 0x69 */ opcode: "XRL", bytes: 1, oprand1: "A", oprand2: "R1" },
    { /* 0x6A */ opcode: "XRL", bytes: 1, oprand1: "A", oprand2: "R2" },
    { /* 0x6B */ opcode: "XRL", bytes: 1, oprand1: "A", oprand2: "R3" },
    { /* 0x6C */ opcode: "XRL", bytes: 1, oprand1: "A", oprand2: "R4" },
    { /* 0x6D */ opcode: "XRL", bytes: 1, oprand1: "A", oprand2: "R5" },
    { /* 0x6E */ opcode: "XRL", bytes: 1, oprand1: "A", oprand2: "R6" },
    { /* 0x6F */ opcode: "XRL", bytes: 1, oprand1: "A", oprand2: "R7" },
    { /* 0x70 */ opcode: "JNZ", bytes: 2, isCondJump: true, dasmOprand: dasmOpRel },
    { /* 0x71 */ opcode: "ACALL", bytes: 2, isCall: true, dasmOprand: dasmOpAbs },
    { /* 0x72 */ opcode: "ORL", bytes: 2, oprand1: "C", dasmOprand: dasmOpXBit },
    { /* 0x73 */ opcode: "JMP", bytes: 1, oprand1: "@A+DPTR", isAbsJump: true },
    { /* 0x74 */ opcode: "MOV", bytes: 2, oprand1: "A", dasmOprand: dasmOpXImm },
    { /* 0x75 */ opcode: "MOV", bytes: 3, dasmOprand: dasmOpDirImm },
    { /* 0x76 */ opcode: "MOV", bytes: 2, oprand1: "@R0", dasmOprand: dasmOpXImm },
    { /* 0x77 */ opcode: "MOV", bytes: 2, oprand1: "@R1", dasmOprand: dasmOpXImm },
    { /* 0x78 */ opcode: "MOV", bytes: 2, oprand1: "R0", dasmOprand: dasmOpXImm },
    { /* 0x79 */ opcode: "MOV", bytes: 2, oprand1: "R1", dasmOprand: dasmOpXImm },
    { /* 0x7A */ opcode: "MOV", bytes: 2, oprand1: "R2", dasmOprand: dasmOpXImm },
    { /* 0x7B */ opcode: "MOV", bytes: 2, oprand1: "R3", dasmOprand: dasmOpXImm },
    { /* 0x7C */ opcode: "MOV", bytes: 2, oprand1: "R4", dasmOprand: dasmOpXImm },
    { /* 0x7D */ opcode: "MOV", bytes: 2, oprand1: "R5", dasmOprand: dasmOpXImm },
    { /* 0x7E */ opcode: "MOV", bytes: 2, oprand1: "R6", dasmOprand: dasmOpXImm },
    { /* 0x7F */ opcode: "MOV", bytes: 2, oprand1: "R7", dasmOprand: dasmOpXImm },
    { /* 0x80 */ opcode: "SJMP", bytes: 2, isAbsJump: true, dasmOprand: dasmOpRel },
    { /* 0x81 */ opcode: "AJMP", bytes: 2, isAbsJump: true, dasmOprand: dasmOpAbs },
    { /* 0x82 */ opcode: "ANL", bytes: 2, oprand1: "C", dasmOprand: dasmOpXBit },
    { /* 0x83 */ opcode: "MOVC", bytes: 1, oprand1: "A", oprand2: "@A+PC" },
    { /* 0x84 */ opcode: "DIV", bytes: 1, oprand1: "AB" },
    { /* 0x85 */ opcode: "MOV", bytes: 3, dasmOprand: dasmOpDirDir },
    { /* 0x86 */ opcode: "MOV", bytes: 2, oprand2: "@R0", dasmOprand: dasmOpDir },
    { /* 0x87 */ opcode: "MOV", bytes: 2, oprand2: "@R1", dasmOprand: dasmOpDir },
    { /* 0x88 */ opcode: "MOV", bytes: 2, oprand2: "R0", dasmOprand: dasmOpDir },
    { /* 0x89 */ opcode: "MOV", bytes: 2, oprand2: "R1", dasmOprand: dasmOpDir },
    { /* 0x8A */ opcode: "MOV", bytes: 2, oprand2: "R2", dasmOprand: dasmOpDir },
    { /* 0x8B */ opcode: "MOV", bytes: 2, oprand2: "R3", dasmOprand: dasmOpDir },
    { /* 0x8C */ opcode: "MOV", bytes: 2, oprand2: "R4", dasmOprand: dasmOpDir },
    { /* 0x8D */ opcode: "MOV", bytes: 2, oprand2: "R5", dasmOprand: dasmOpDir },
    { /* 0x8E */ opcode: "MOV", bytes: 2, oprand2: "R6", dasmOprand: dasmOpDir },
    { /* 0x8F */ opcode: "MOV", bytes: 2, oprand2: "R7", dasmOprand: dasmOpDir },
    { /* 0x90 */ opcode: "MOV", bytes: 3, oprand1: "DPTR", dasmOprand: dasmOpXImm2 },
    { /* 0x91 */ opcode: "ACALL", bytes: 2, isCall: true, dasmOprand: dasmOpAbs },
    { /* 0x92 */ opcode: "MOV", bytes: 2, oprand2: "C", dasmOprand: dasmOpBit },
    { /* 0x93 */ opcode: "MOVC", bytes: 1, oprand1: "A", oprand2: "@A+DPTR" },
    { /* 0x94 */ opcode: "SUBB", bytes: 2, oprand1: "A", dasmOprand: dasmOpXImm },
    { /* 0x95 */ opcode: "SUBB", bytes: 2, oprand1: "A", dasmOprand: dasmOpXDir },
    { /* 0x96 */ opcode: "SUBB", bytes: 1, oprand1: "A", oprand2: "@R0" },
    { /* 0x97 */ opcode: "SUBB", bytes: 1, oprand1: "A", oprand2: "@R1" },
    { /* 0x98 */ opcode: "SUBB", bytes: 1, oprand1: "A", oprand2: "R0" },
    { /* 0x99 */ opcode: "SUBB", bytes: 1, oprand1: "A", oprand2: "R1" },
    { /* 0x9A */ opcode: "SUBB", bytes: 1, oprand1: "A", oprand2: "R2" },
    { /* 0x9B */ opcode: "SUBB", bytes: 1, oprand1: "A", oprand2: "R3" },
    { /* 0x9C */ opcode: "SUBB", bytes: 1, oprand1: "A", oprand2: "R4" },
    { /* 0x9D */ opcode: "SUBB", bytes: 1, oprand1: "A", oprand2: "R5" },
    { /* 0x9E */ opcode: "SUBB", bytes: 1, oprand1: "A", oprand2: "R6" },
    { /* 0x9F */ opcode: "SUBB", bytes: 1, oprand1: "A", oprand2: "R7" },
    { /* 0xA0 */ opcode: "ORL", bytes: 2, oprand1: "C", dasmOprand: dasmOpXNbit },
    { /* 0xA1 */ opcode: "AJMP", bytes: 2, isAbsJump: true, dasmOprand: dasmOpAbs },
    { /* 0xA2 */ opcode: "MOV", bytes: 2, oprand1: "C", dasmOprand: dasmOpXBit },
    { /* 0xA3 */ opcode: "INC", bytes: 1, oprand1: "DPTR" },
    { /* 0xA4 */ opcode: "MUL", bytes: 1, oprand1: "AB" },
    { /* 0xA5 */ opcode: "<UNKNOWN>", bytes: 1 },
    { /* 0xA6 */ opcode: "MOV", bytes: 2, oprand1: "@R0", dasmOprand: dasmOpXDir },
    { /* 0xA7 */ opcode: "MOV", bytes: 2, oprand1: "@R1", dasmOprand: dasmOpXDir },
    { /* 0xA8 */ opcode: "MOV", bytes: 2, oprand1: "R0", dasmOprand: dasmOpXDir },
    { /* 0xA9 */ opcode: "MOV", bytes: 2, oprand1: "R1", dasmOprand: dasmOpXDir },
    { /* 0xAA */ opcode: "MOV", bytes: 2, oprand1: "R2", dasmOprand: dasmOpXDir },
    { /* 0xAB */ opcode: "MOV", bytes: 2, oprand1: "R3", dasmOprand: dasmOpXDir },
    { /* 0xAC */ opcode: "MOV", bytes: 2, oprand1: "R4", dasmOprand: dasmOpXDir },
    { /* 0xAD */ opcode: "MOV", bytes: 2, oprand1: "R5", dasmOprand: dasmOpXDir },
    { /* 0xAE */ opcode: "MOV", bytes: 2, oprand1: "R6", dasmOprand: dasmOpXDir },
    { /* 0xAF */ opcode: "MOV", bytes: 2, oprand1: "R7", dasmOprand: dasmOpXDir },
    { /* 0xB0 */ opcode: "ANL", bytes: 2, oprand1: "C", dasmOprand: dasmOpXNbit },
    { /* 0xB1 */ opcode: "ACALL", bytes: 2, isCall: true, dasmOprand: dasmOpAbs },
    { /* 0xB2 */ opcode: "CPL", bytes: 2, dasmOprand: dasmOpBit },
    { /* 0xB3 */ opcode: "CPL", bytes: 1, oprand1: "C" },
    { /* 0xB4 */ opcode: "CJNE", bytes: 3, oprand1: "A", isCondJump: true, dasmOprand: dasmOpXImmRel },
    { /* 0xB5 */ opcode: "CJNE", bytes: 3, oprand1: "A", isCondJump: true, dasmOprand: dasmOpXDirRel },
    { /* 0xB6 */ opcode: "CJNE", bytes: 3, oprand1: "@R0", isCondJump: true, dasmOprand: dasmOpXImmRel },
    { /* 0xB7 */ opcode: "CJNE", bytes: 3, oprand1: "@R1", isCondJump: true, dasmOprand: dasmOpXImmRel },
    { /* 0xB8 */ opcode: "CJNE", bytes: 3, oprand1: "R0", isCondJump: true, dasmOprand: dasmOpXImmRel },
    { /* 0xB9 */ opcode: "CJNE", bytes: 3, oprand1: "R1", isCondJump: true, dasmOprand: dasmOpXImmRel },
    { /* 0xBA */ opcode: "CJNE", bytes: 3, oprand1: "R2", isCondJump: true, dasmOprand: dasmOpXImmRel },
    { /* 0xBB */ opcode: "CJNE", bytes: 3, oprand1: "R3", isCondJump: true, dasmOprand: dasmOpXImmRel },
    { /* 0xBC */ opcode: "CJNE", bytes: 3, oprand1: "R4", isCondJump: true, dasmOprand: dasmOpXImmRel },
    { /* 0xBD */ opcode: "CJNE", bytes: 3, oprand1: "R5", isCondJump: true, dasmOprand: dasmOpXImmRel },
    { /* 0xBE */ opcode: "CJNE", bytes: 3, oprand1: "R6", isCondJump: true, dasmOprand: dasmOpXImmRel },
    { /* 0xBF */ opcode: "CJNE", bytes: 3, oprand1: "R7", isCondJump: true, dasmOprand: dasmOpXImmRel },
    { /* 0xC0 */ opcode: "PUSH", bytes: 2, dasmOprand: dasmOpDir },
    { /* 0xC1 */ opcode: "AJMP", bytes: 2, isAbsJump: true, dasmOprand: dasmOpAbs },
    { /* 0xC2 */ opcode: "CLR", bytes: 2, dasmOprand: dasmOpBit },
    { /* 0xC3 */ opcode: "CLR", bytes: 1, oprand1: "C" },
    { /* 0xC4 */ opcode: "SWAP", bytes: 1, oprand1: "A" },
    { /* 0xC5 */ opcode: "XCH", bytes: 2, oprand1: "A", dasmOprand: dasmOpXDir },
    { /* 0xC6 */ opcode: "XCH", bytes: 1, oprand1: "A", oprand2: "@R0" },
    { /* 0xC7 */ opcode: "XCH", bytes: 1, oprand1: "A", oprand2: "@R1" },
    { /* 0xC8 */ opcode: "XCH", bytes: 1, oprand1: "A", oprand2: "R0" },
    { /* 0xC9 */ opcode: "XCH", bytes: 1, oprand1: "A", oprand2: "R1" },
    { /* 0xCA */ opcode: "XCH", bytes: 1, oprand1: "A", oprand2: "R2" },
    { /* 0xCB */ opcode: "XCH", bytes: 1, oprand1: "A", oprand2: "R3" },
    { /* 0xCC */ opcode: "XCH", bytes: 1, oprand1: "A", oprand2: "R4" },
    { /* 0xCD */ opcode: "XCH", bytes: 1, oprand1: "A", oprand2: "R5" },
    { /* 0xCE */ opcode: "XCH", bytes: 1, oprand1: "A", oprand2: "R6" },
    { /* 0xCF */ opcode: "XCH", bytes: 1, oprand1: "A", oprand2: "R7" },
    { /* 0xD0 */ opcode: "POP", bytes: 2, dasmOprand: dasmOpDir },
    { /* 0xD1 */ opcode: "ACALL", bytes: 2, isCall: true, dasmOprand: dasmOpAbs },
    { /* 0xD2 */ opcode: "SETB", bytes: 2, dasmOprand: dasmOpBit },
    { /* 0xD3 */ opcode: "SETB", bytes: 1, oprand1: "C" },
    { /* 0xD4 */ opcode: "DA", bytes: 1, oprand1: "A" },
    { /* 0xD5 */ opcode: "DJNZ", bytes: 3, isCondJump: true, dasmOprand: dasmOpDirRel },
    { /* 0xD6 */ opcode: "XCHD", bytes: 1, oprand1: "A", oprand2: "@R0" },
    { /* 0xD7 */ opcode: "XCHD", bytes: 1, oprand1: "A", oprand2: "@R1" },
    { /* 0xD8 */ opcode: "DJNZ", bytes: 2, oprand1: "R0", isCondJump: true, dasmOprand: dasmOpXRel },
    { /* 0xD9 */ opcode: "DJNZ", bytes: 2, oprand1: "R1", isCondJump: true, dasmOprand: dasmOpXRel },
    { /* 0xDA */ opcode: "DJNZ", bytes: 2, oprand1: "R2", isCondJump: true, dasmOprand: dasmOpXRel },
    { /* 0xDB */ opcode: "DJNZ", bytes: 2, oprand1: "R3", isCondJump: true, dasmOprand: dasmOpXRel },
    { /* 0xDC */ opcode: "DJNZ", bytes: 2, oprand1: "R4", isCondJump: true, dasmOprand: dasmOpXRel },
    { /* 0xDD */ opcode: "DJNZ", bytes: 2, oprand1: "R5", isCondJump: true, dasmOprand: dasmOpXRel },
    { /* 0xDE */ opcode: "DJNZ", bytes: 2, oprand1: "R6", isCondJump: true, dasmOprand: dasmOpXRel },
    { /* 0xDF */ opcode: "DJNZ", bytes: 2, oprand1: "R7", isCondJump: true, dasmOprand: dasmOpXRel },
    { /* 0xE0 */ opcode: "MOVX", bytes: 1, oprand1: "A", oprand2: "@DPTR" },
    { /* 0xE1 */ opcode: "AJMP", bytes: 2, isAbsJump: true, dasmOprand: dasmOpAbs },
    { /* 0xE2 */ opcode: "MOVX", bytes: 1, oprand1: "A", oprand2: "@R0" },
    { /* 0xE3 */ opcode: "MOVX", bytes: 1, oprand1: "A", oprand2: "@R1" },
    { /* 0xE4 */ opcode: "CLR", bytes: 1, oprand1: "A" },
    { /* 0xE5 */ opcode: "MOV", bytes: 2, oprand1: "A", dasmOprand: dasmOpXDir },
    { /* 0xE6 */ opcode: "MOV", bytes: 1, oprand1: "A", oprand2: "@R0" },
    { /* 0xE7 */ opcode: "MOV", bytes: 1, oprand1: "A", oprand2: "@R1" },
    { /* 0xE8 */ opcode: "MOV", bytes: 1, oprand1: "A", oprand2: "R0" },
    { /* 0xE9 */ opcode: "MOV", bytes: 1, oprand1: "A", oprand2: "R1" },
    { /* 0xEA */ opcode: "MOV", bytes: 1, oprand1: "A", oprand2: "R2" },
    { /* 0xEB */ opcode: "MOV", bytes: 1, oprand1: "A", oprand2: "R3" },
    { /* 0xEC */ opcode: "MOV", bytes: 1, oprand1: "A", oprand2: "R4" },
    { /* 0xED */ opcode: "MOV", bytes: 1, oprand1: "A", oprand2: "R5" },
    { /* 0xEE */ opcode: "MOV", bytes: 1, oprand1: "A", oprand2: "R6" },
    { /* 0xEF */ opcode: "MOV", bytes: 1, oprand1: "A", oprand2: "R7" },
    { /* 0xF0 */ opcode: "MOVX", bytes: 1, oprand1: "@DPTR", oprand2: "A" },
    { /* 0xF1 */ opcode: "ACALL", bytes: 2, isCall: true, dasmOprand: dasmOpAbs },
    { /* 0xF2 */ opcode: "MOVX", bytes: 1, oprand1: "@R0", oprand2: "A" },
    { /* 0xF3 */ opcode: "MOVX", bytes: 1, oprand1: "@R1", oprand2: "A" },
    { /* 0xF4 */ opcode: "CPL", bytes: 1, oprand1: "A" },
    { /* 0xF5 */ opcode: "MOV", bytes: 2, oprand2: "A", dasmOprand: dasmOpDir },
    { /* 0xF6 */ opcode: "MOV", bytes: 1, oprand1: "@R0", oprand2: "A" },
    { /* 0xF7 */ opcode: "MOV", bytes: 1, oprand1: "@R1", oprand2: "A" },
    { /* 0xF8 */ opcode: "MOV", bytes: 1, oprand1: "R0", oprand2: "A" },
    { /* 0xF9 */ opcode: "MOV", bytes: 1, oprand1: "R1", oprand2: "A" },
    { /* 0xFA */ opcode: "MOV", bytes: 1, oprand1: "R2", oprand2: "A" },
    { /* 0xFB */ opcode: "MOV", bytes: 1, oprand1: "R3", oprand2: "A" },
    { /* 0xFC */ opcode: "MOV", bytes: 1, oprand1: "R4", oprand2: "A" },
    { /* 0xFD */ opcode: "MOV", bytes: 1, oprand1: "R5", oprand2: "A" },
    { /* 0xFE */ opcode: "MOV", bytes: 1, oprand1: "R6", oprand2: "A" },
    { /* 0xFF */ opcode: "MOV", bytes: 1, oprand1: "R7", oprand2: "A" }
];

function calculateRelData(data: number, ci: S.RealInstruction): number {
    const offset = (data & 0x80) ? data - 0x100 : data;
    return ci.address + ci.bytes.length + offset;
}

function createAddrOprand(data: number): S.TypedOprand {
    return {
        type: "ADDR",
        length: 1,
        data,
        str: U.formatCodeAddress(data)
    };
}

function createRelOprand(data: number, ci: S.RealInstruction): S.TypedOprand {
    const jmp_target = calculateRelData(data, ci);
    return {
        type: "ADDR",
        length: 1,
        data: jmp_target,
        raw_data: data,
        str: U.formatCodeAddress(jmp_target)
    };
}

function createDirOprand(data: number): S.TypedOprand {
    return {
        type: "DIR",
        length: 1,
        data,
        str: U.formatDirectData(data)
    };
}

function createBitOprand(data: number): S.TypedOprand {
    return {
        type: "BIT",
        length: 1,
        data,
        str: U.formatBitData(data)
    };
}

function createNbitOprand(data: number): S.TypedOprand {
    return {
        type: "NBIT",
        length: 1,
        data,
        str: "/" + U.formatBitData(data)
    };
}

function createImmOprand(data: number): S.TypedOprand {
    return {
        type: "IMM",
        length: 1,
        data,
        str: U.formatImmediateData(data)
    };
}

function createImm2Oprand(byte1: number, byte2: number): S.TypedOprand {
    const data = (byte1 << 8) | byte2;
    return {
        type: "IMM",
        length: 2,
        data,
        str: U.formatImmediateData2(data)
    };
}

function dasmOpAbs(ci: S.RealInstruction) {
    /* a10 a9 a8 0 0001   a7 a6 a5 a4 a3 a2 a1 a0 */
    ci.oprand1 = createAddrOprand(((ci.bytes[0].data & 0xE0) << 3) | ci.bytes[1].data);
    ci.jumpTarget = ci.oprand1.data;
}

function dasmOpBit(ci: S.RealInstruction) {
    ci.oprand1 = createBitOprand(ci.bytes[1].data);
}

function dasmOpBitRel(ci: S.RealInstruction) {
    ci.oprand1 = createBitOprand(ci.bytes[1].data);
    ci.oprand2 = createRelOprand(ci.bytes[2].data, ci);
    ci.jumpTarget = ci.oprand2.data;
}

function dasmOpDir(ci: S.RealInstruction) {
    ci.oprand1 = createDirOprand(ci.bytes[1].data);
}

function dasmOpDirDir(ci: S.RealInstruction) {
    ci.oprand1 = createDirOprand(ci.bytes[1].data);
    ci.oprand2 = createDirOprand(ci.bytes[2].data);
}

function dasmOpDirImm(ci: S.RealInstruction) {
    ci.oprand1 = createDirOprand(ci.bytes[1].data);
    ci.oprand2 = createImmOprand(ci.bytes[2].data);
}

function dasmOpDirRel(ci: S.RealInstruction) {
    ci.oprand1 = createDirOprand(ci.bytes[1].data);
    ci.oprand2 = createRelOprand(ci.bytes[2].data, ci);
    ci.jumpTarget = ci.oprand2.data;
}

function dasmOpLaddr(ci: S.RealInstruction) {
    ci.oprand1 = createAddrOprand((ci.bytes[1].data << 8) | ci.bytes[2].data);
    ci.jumpTarget = ci.oprand1.data;
}

function dasmOpRel(ci: S.RealInstruction) {
    ci.oprand1 = createRelOprand(ci.bytes[1].data, ci);
    ci.jumpTarget = ci.oprand1.data;
}

function dasmOpXBit(ci: S.RealInstruction) {
    ci.oprand2 = createBitOprand(ci.bytes[1].data);
}

function dasmOpXDir(ci: S.RealInstruction) {
    if (!ci.bytes[1]) debugger;
    ci.oprand2 = createDirOprand(ci.bytes[1].data);
}

function dasmOpXDirRel(ci: S.RealInstruction) {
    ci.oprand2 = createDirOprand(ci.bytes[1].data);
    ci.oprand3 = createRelOprand(ci.bytes[2].data, ci);
    ci.jumpTarget = ci.oprand3.data;
}

function dasmOpXImm(ci: S.RealInstruction) {
    ci.oprand2 = createImmOprand(ci.bytes[1].data);
}

function dasmOpXImm2(ci: S.RealInstruction) {
    ci.oprand2 = createImm2Oprand(ci.bytes[1].data, ci.bytes[2].data);
}

function dasmOpXImmRel(ci: S.RealInstruction) {
    ci.oprand2 = createImmOprand(ci.bytes[1].data);
    ci.oprand3 = createRelOprand(ci.bytes[2].data, ci);
    ci.jumpTarget = ci.oprand3.data;
}

function dasmOpXNbit(ci: S.RealInstruction) {
    ci.oprand2 = createNbitOprand(ci.bytes[1].data);
}

function dasmOpXRel(ci: S.RealInstruction) {
    ci.oprand2 = createRelOprand(ci.bytes[1].data, ci);
    ci.jumpTarget = ci.oprand2.data;
}
