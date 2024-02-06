import Cache32Bit from "./cache-32bit.js";
import CacheBigInt from "./cache-bigint.js";

export default typeof BigInt === "undefined" ? Cache32Bit : CacheBigInt;
