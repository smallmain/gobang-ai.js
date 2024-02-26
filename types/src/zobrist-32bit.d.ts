export const zobristTables: Map<any, any>;
export default class ZobristCache {
    constructor(size: any);
    size: any;
    zobristTable: any;
    /**
     * @type {[number, number]}
     */
    hash: [number, number];
    togglePiece(x: any, y: any, role: any): void;
    getHash(): [number, number];
}
