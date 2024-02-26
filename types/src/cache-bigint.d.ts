export default class Cache {
    constructor(capacity?: number);
    capacity: number;
    map: Map<any, any>;
    get(key: any): any;
    put(key: any, value: any): boolean;
    has(key: any): boolean;
    /**
     * @returns {string} JSON 字符串
     */
    serialize(): string;
    /**
     * @param {string} jsonStr
     */
    deserialize(jsonStr: string): void;
}
