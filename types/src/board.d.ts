export default Board;
declare class Board {
    /**
     * @param size 棋盘的大小（size * size）
     */
    constructor(size?: number, firstRole?: number);
    size: number;
    board: any[][];
    firstRole: number;
    role: number;
    history: any[];
    zobrist: import("./zobrist-32bit.js").default | import("./zobrist-bigint.js").default;
    evaluateTime: number;
    evaluator: Evaluate;
    isGameOver(): any;
    getWinner(): any;
    getValidMoves(): number[][];
    put(i: any, j: any, role: any): boolean;
    undo(): boolean;
    position2coordinate(position: any): number[];
    coordinate2position(coordinate: any): any;
    getValuableMoves(role: any, depth?: number, onlyThree?: boolean, onlyFour?: boolean): any;
    display(extraPoints?: any[]): string;
    /**
     * @returns {any}
     */
    hash(): any;
    evaluate(role: any): any;
    reverse(): Board;
    toString(): string;
}
import Evaluate from './eval.js';
