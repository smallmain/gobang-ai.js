export const zobristTables: Map<any, any>;
export default class ZobristCache {
    constructor(size: any);
    size: any;
    zobristTable: any;
    hash: bigint;
    togglePiece(x: any, y: any, role: any): void;
    getHash(): bigint;
}
