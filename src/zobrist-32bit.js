/* global BigInt */
export default class ZobristCache {
    constructor(size) {
        this.size = size;
        this.zobristTable = this.initializeZobristTable(size);
        /**
         * @type {[number, number]}
         */
        this.hash = [0, 0];
    }

    rand() {
        const max = Math.pow(2, 31);
        const min = -Math.pow(2, 31);
        return Math.floor(Math.random() * (1 + max - min)) + min;
    }

    rands() {
        return [this.rand(), this.rand()];
    }

    initializeZobristTable(size) {
        let table = [];
        for (let i = 0; i < size; i++) {
            table[i] = [];
            for (let j = 0; j < size; j++) {
                table[i][j] = {
                    "1": this.rands(), // black
                    "-1": this.rands(),  // white
                };
            }
        }
        return table;
    }

    togglePiece(x, y, role) {
        this.hash[0] ^= this.zobristTable[x][y][role][0];
        this.hash[1] ^= this.zobristTable[x][y][role][1];
    }

    getHash() {
        return this.hash;
    }
}
