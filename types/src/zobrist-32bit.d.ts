export default class ZobristCache {
    constructor(size: any);
    size: any;
    zobristTable: any[][];
    /**
     * @type {[number, number]}
     */
    hash: [number, number];
    rand(): number;
    rands(): number[];
    initializeZobristTable(size: any): any[][];
    togglePiece(x: any, y: any, role: any): void;
    getHash(): [number, number];
}
