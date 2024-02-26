import Cache from './cache.js';
import { zobristTables } from './zobrist.js';

export const winnerCache = new Cache();
export const gameoverCache = new Cache();
export const evaluateCache = new Cache();
export const valuableMovesCache = new Cache();
export const minmaxCache = new Cache();

function serialize() {
    return JSON.stringify({
        winnerCache: winnerCache.serialize(),
        gameoverCache: gameoverCache.serialize(),
        evaluateCache: evaluateCache.serialize(),
        valuableMovesCache: valuableMovesCache.serialize(),
        minmaxCache: minmaxCache.serialize(),
        // @ts-ignore
        zobristTables: zobristTables.serialize()
    });
}

function deserialize(jsonStr) {
    const obj = typeof jsonStr === "string" ? JSON.parse(jsonStr) : jsonStr;
    winnerCache.deserialize(obj.winnerCache);
    gameoverCache.deserialize(obj.gameoverCache);
    evaluateCache.deserialize(obj.evaluateCache);
    valuableMovesCache.deserialize(obj.valuableMovesCache);
    minmaxCache.deserialize(obj.minmaxCache);
    // @ts-ignore
    zobristTables.deserialize(obj.zobristTables);
}

export { deserialize, serialize, zobristTables };

