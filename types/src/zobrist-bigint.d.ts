export default class ZobristCache {
    constructor(size: any);
    size: any;
    zobristTable: any[][];
    hash: bigint;
    initializeZobristTable(size: any): any[][];
    randomBitString(length: any): string;
    togglePiece(x: any, y: any, role: any): void;
    getHash(): bigint;
}
