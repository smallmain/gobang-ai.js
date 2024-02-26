import Zobrist32Bit, { zobristTables as zobristTables32Bit } from "./zobrist-32bit.js";
import ZobristBigInt, { zobristTables as zobristTablesBigInt } from "./zobrist-bigint.js";

export default typeof BigInt === "undefined" ? Zobrist32Bit : ZobristBigInt;
export const zobristTables = typeof BigInt === "undefined" ? zobristTables32Bit : zobristTablesBigInt;
