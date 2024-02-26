export default class Cache {
    constructor(capacity?: number);
    capacity: number;
    /**
     * @type {Map<number, Map<number, any>>}
     */
    map: Map<number, Map<number, any>>;
    /**
     * 获取一个键的值
     * @param {[number,number]} key
     */
    get(key: [number, number]): any;
    /**
     * 设置或插入一个值
     * @param {[number,number]} key
     */
    put(key: [number, number], value: any): boolean;
    /**
     * 检查缓存中是否存在某个键
     * @param {[number,number]} key
     */
    has(key: [number, number]): boolean;
    /**
     * @returns {string} JSON 字符串
     */
    serialize(): string;
    /**
     * @param {string} jsonStr
     */
    deserialize(jsonStr: string): void;
}
