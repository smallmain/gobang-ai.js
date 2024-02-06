export namespace patterns {
    let five: RegExp;
    let blockfive: RegExp;
    let four: RegExp;
    let blockFour: RegExp;
    let three: RegExp;
    let blockThree: RegExp;
    let two: RegExp;
}
export namespace shapes {
    let FIVE: number;
    let BLOCK_FIVE: number;
    let FOUR: number;
    let FOUR_FOUR: number;
    let FOUR_THREE: number;
    let THREE_THREE: number;
    let BLOCK_FOUR: number;
    let THREE: number;
    let BLOCK_THREE: number;
    let TWO_TWO: number;
    let TWO: number;
    let NONE: number;
}
export namespace performance {
    let five_1: number;
    export { five_1 as five };
    export let blockFive: number;
    let four_1: number;
    export { four_1 as four };
    let blockFour_1: number;
    export { blockFour_1 as blockFour };
    let three_1: number;
    export { three_1 as three };
    let blockThree_1: number;
    export { blockThree_1 as blockThree };
    let two_1: number;
    export { two_1 as two };
    export let none: number;
    export let total: number;
}
export function getShape(board: any, x: any, y: any, offsetX: any, offsetY: any, role: any): number[];
export function getShapeFast(board: any, x: any, y: any, offsetX: any, offsetY: any, role: any): number[];
export function isFive(shape: any): boolean;
export function isFour(shape: any): boolean;
export function getAllShapesOfPoint(shapeCache: any, x: any, y: any, role: any): any[];
