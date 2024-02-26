import { arr32bitToBigint, bigintTo32bitArr } from './bigint-32bit-converter.js';
import { config } from './config.js';
// 先入先出缓存
export default class Cache {
    constructor(capacity = 10000000) {
        this.capacity = capacity;
        this.map = new Map();
    }

    // 获取一个键的值
    get(key) {
        if (!config.enableCache) return false;
        if (this.map.has(key)) {
            return this.map.get(key);
        }
        return null;
    }

    // 设置或插入一个值
    put(key, value) {
        if (!config.enableCache) return false;
        if (this.map.size >= this.capacity) {
            console.warn("cache is full, this may affect the speed of gobang ai.");
            // 随机移除一部分键
            let count = Math.ceil(this.capacity * 0.0001);
            while (count > 0 && this.map.size !== 0) {
                for (const key of this.map.keys()) {
                    if (Math.random() >= 0.5) {
                        this.map.delete(key);
                        count--;
                    }
                }
            }
        }
        this.map.set(key, value);  // 更新或设置键值
    }

    // 检查缓存中是否存在某个键
    has(key) {
        if (!config.enableCache) return false;
        return this.map.has(key);
    }

    /**
     * @returns {string} JSON 字符串
     */
    serialize() {
        const arr = [];
        for (const [key, value] of this.map) {
            arr.push([bigintTo32bitArr(key), value]);
        }
        return JSON.stringify(arr);
    }

    /**
     * @param {string} jsonStr
     */
    deserialize(jsonStr) {
        const arr = JSON.parse(jsonStr);
        for (const [key, value] of arr) {
            this.map.set(arr32bitToBigint(key), value);
        }
    }
}
