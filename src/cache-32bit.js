import { config } from './config.js';
// 先入先出缓存
export default class Cache {
    constructor(capacity = 1000000) {
        this.capacity = capacity;
        /**
         * @type {[number,number][]}
         */
        this.cache = [];
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

        if (this.cache.length >= this.capacity) {
            const oldestKey = this.cache.shift();  // 移除最老的键
            const [olda, oldb] = oldestKey;
            this.map.get(olda).delete(oldb);
        }

        if (!this.map.has(a) || !this.map.get(a).has(b)) {
            this.cache.push(key);  // 将新键添加到cache数组
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
}
