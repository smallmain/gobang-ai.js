import { config } from './config.js';
// 先入先出缓存
export default class Cache {
    constructor(capacity = 10000000) {
        this.capacity = capacity;
        /**
         * @type {Map<number, Map<number, any>>}
         */
        this.map = new Map();
    }

    /**
     * 获取一个键的值
     * @param {[number,number]} key
     */
    get(key) {
        const [a, b] = key;
        if (!config.enableCache) return false;
        if (this.map.has(a)) {
            const subMap = this.map.get(a);
            if (subMap.has(b)) {
                return subMap.get(b);
            }
        }
        return null;
    }

    /**
     * 设置或插入一个值
     * @param {[number,number]} key
     */
    put(key, value) {
        if (!config.enableCache) return false;

        const [a, b] = key;

        if (this.map.size >= this.capacity) {
            console.warn("cache is full, this may affect the speed of gobang ai.");
            // 随机移除一部分键
            let count = Math.ceil(this.capacity * 0.0001);
            while (count > 0 && this.map.size !== 0) {
                for (const keyA of this.map.keys()) {
                    const subMap = this.map.get(keyA);
                    for (const keyB of subMap.keys()) {
                        if (Math.random() >= 0.5) {
                            subMap.delete(keyB);
                            if (subMap.size === 0) {
                                this.map.delete(keyA);
                            }
                            count--;
                        }
                    }
                }
            }
        }

        if (!this.map.has(a)) {
            this.map.set(a, new Map());
        }
        this.map.get(a).set(b, value);  // 更新或设置键值
    }

    /**
     * 检查缓存中是否存在某个键
     * @param {[number,number]} key
     */
    has(key) {
        if (!config.enableCache) return false;
        const [a, b] = key;
        if (this.map.has(a)) {
            return this.map.get(a).has(b);
        }
        return false;
    }

    /**
     * @returns {string} JSON 字符串
     */
    serialize() {
        let arr = [];
        for (const [keyA, subMap] of this.map) {
            for (const [keyB, value] of subMap) {
                arr.push([[keyA, keyB], value]);
            }
        }
        return JSON.stringify(arr);
    }

    /**
     * @param {string} jsonStr
     */
    deserialize(jsonStr) {
        let arr = JSON.parse(jsonStr);
        for (let [[keyA, keyB], value] of arr) {
            if (!this.map.has(keyA)) {
                this.map.set(keyA, new Map());
            }
            this.map.get(keyA).set(keyB, value);
        }
    }
}
