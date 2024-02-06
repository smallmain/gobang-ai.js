export default class Cache {
    constructor(capacity?: number);
    capacity: number;
    cache: any[];
    map: Map<any, any>;
    get(key: any): any;
    put(key: any, value: any): boolean;
    has(key: any): boolean;
}
