export const FIVE: 10000000;
export const BLOCK_FIVE: 10000000;
export const FOUR: 100000;
export const FOUR_FOUR: 100000;
export const FOUR_THREE: 100000;
export const THREE_THREE: number;
export const BLOCK_FOUR: 1500;
export const THREE: 1000;
export const BLOCK_THREE: 150;
export const TWO_TWO: 200;
export const TWO: 100;
export const BLOCK_TWO: 15;
export const ONE: 10;
export const BLOCK_ONE: 1;
export function getRealShapeScore(shape: any): number;
export namespace performance {
    let updateTime: number;
    let getPointsTime: number;
}
export default class Evaluate {
    constructor(size?: number);
    size: number;
    /**
     * @type {(0|1|2|-1|-2)[][]}
     */
    board: (0 | 1 | 2 | -1 | -2)[][];
    blackScores: any[][];
    whiteScores: any[][];
    history: any[];
    move(x: any, y: any, role: any): void;
    undo(x: any, y: any): void;
    initPoints(): void;
    shapeCache: {};
    pointsCache: {};
    getPointsInLine(role: any): {};
    getPoints(role: any, depth: any, vct: any, vcf: any): {};
    updatePoint(x: any, y: any): void;
    updateSinglePoint(x: any, y: any, role: any, direction?: any): number;
    evaluate(role: any): number;
    /**
     * 获取有价值的点位
     * @param {*} role 当前角色
     * @param {*} onlyThree 只返回 活三、冲四、活四
     * @returns
     */
    getMoves(role: any, depth: any, onlyThree?: any, onlyFour?: boolean): number[][];
    _getMoves(role: any, depth: any, onlyThree?: boolean, onlyFour?: boolean): Set<any>;
    display(): void;
}
