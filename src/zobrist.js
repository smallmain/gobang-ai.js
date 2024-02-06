import Zobrist32Bit from "./zobrist-32bit.js";
import ZobristBigInt from "./zobrist-bigint.js";

export default typeof BigInt === "undefined" ? Zobrist32Bit : ZobristBigInt;
