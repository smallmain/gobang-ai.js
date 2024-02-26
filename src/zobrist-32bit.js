/* global BigInt */
export const zobristTables = new Map();

function getZobristTable(size) {
    if (zobristTables.has(size)) {
        return zobristTables.get(size);
    }
    const table = [];
    for (let i = 0; i < size; i++) {
        table[i] = [];
        for (let j = 0; j < size; j++) {
            table[i][j] = {
                "1": rands(), // black
                "-1": rands(),  // white
            };
        }
    }
    zobristTables.set(size, table);
    return table;
}

function rand() {
    const max = Math.pow(2, 31);
    const min = -Math.pow(2, 31);
    return Math.floor(Math.random() * (1 + max - min)) + min;
}

function rands() {
    return [rand(), rand()];
}

// @ts-ignore
zobristTables.serialize = function serialize() {
    let arr = [];
    for (let [key, value] of this) {
        arr.push([key, value]);
    }
    return JSON.stringify(arr);
};

// @ts-ignore
zobristTables.deserialize = function deserialize(jsonStr) {
    let arr = JSON.parse(jsonStr);
    for (let [key, value] of arr) {
        this.set(key, value);
    }
};

export default class ZobristCache {
    constructor(size) {
        this.size = size;
        this.zobristTable = getZobristTable(size);
        /**
         * @type {[number, number]}
         */
        this.hash = [0, 0];
    }

    togglePiece(x, y, role) {
        this.hash[0] ^= this.zobristTable[x][y][role][0];
        this.hash[1] ^= this.zobristTable[x][y][role][1];
    }

    getHash() {
        return this.hash;
    }
}
