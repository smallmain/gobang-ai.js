/**
 * @param {bigint} n
 * @returns {[number,number]}
 */
export function bigintTo32bitArr(n) {
    const str = padEnd(n.toString(2), 64, '0');
    const a = parseInt(str.slice(0, 32), 2);
    const b = parseInt(str.slice(32), 2);
    return [a, b];
}

/**
 * @param {[number,number]} arr
 * @returns {bigint}
 */
export function arr32bitToBigint(arr) {
    const [a, b] = arr;
    return BigInt(b) + (BigInt(a) << BigInt(32));
}

/**
 * @param {string} str
 * @param {number} targetLength
 * @param {string} padString
 */
function padEnd(str, targetLength, padString) {
    // 将字符串转换为字符串类型
    str = String(str);

    // 如果填充的字符串为空或目标长度小于等于字符串长度，则直接返回原始字符串
    if (!padString || str.length >= targetLength) {
        return str;
    }

    // 计算需要填充的次数
    const repeatCount = Math.ceil((targetLength - str.length) / padString.length);

    // 使用填充字符串填充到目标长度
    return str + padString.repeat(repeatCount).slice(0, targetLength - str.length);
}
