import { arr32bitToBigint, bigintTo32bitArr } from "./bigint-32bit-converter.js";

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
                "1": BigInt(randomBitString(64)), // black
                "-1": BigInt(randomBitString(64))  // white
            };
        }
    }
    zobristTables.set(size, table);
    return table;
}

function randomBitString(length) {
    let str = "0b";
    for (let i = 0; i < length; i++) {
        str += Math.round(Math.random()).toString();
    }
    return str;
}

// @ts-ignore
zobristTables.serialize = function serialize() {
    let arr = [];
    for (let [key, value] of this) {
        for (const subArr of value) {
            for (const obj of subArr) {
                obj["1"] = bigintTo32bitArr(obj["1"]);
                obj["-1"] = bigintTo32bitArr(obj["-1"]);
            }
        }
        arr.push([key, value]);
    }
    return JSON.stringify(arr);
}

// @ts-ignore
zobristTables.deserialize = function deserialize(jsonStr) {
    let arr = JSON.parse(jsonStr);
    for (let [key, value] of arr) {
        for (const subArr of value) {
            for (const obj of subArr) {
                obj["1"] = arr32bitToBigint(obj["1"]);
                obj["-1"] = arr32bitToBigint(obj["-1"]);
            }
        }
        this.set(key, value);
    }
}

export default class ZobristCache {
    constructor(size) {
        this.size = size;
        this.zobristTable = getZobristTable(size);
        this.hash = BigInt(0);
    }

    togglePiece(x, y, role) {
        this.hash ^= this.zobristTable[x][y][role];
    }

    getHash() {
        return this.hash;
    }
}
