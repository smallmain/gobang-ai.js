declare namespace _default {
    export { Board };
    export { minmax };
    export { Cache };
    export { config };
    export { Evaluate };
    export { position };
    export { shape };
    export { ZobristCache };
}
export default _default;
/**
 * 角色类型
 */
export type RoleType = PlayerRoleType | typeof import("../index.js").default.Role.None;
/**
 * 玩家角色类型
 */
export type PlayerRoleType = typeof import("../index.js").default.Role.Black | typeof import("../index.js").default.Role.White;
/**
 * 表示棋盘状态的二维数组，数组的每个元素的值为 1 表示黑棋，-1 表示白棋，值为 0 表示此处未落子。
 */
export type BoardData = RoleType[][];
/**
 * 单步棋盘落子数据
 */
export type BoardStepData = {
    /**
     * 横坐标
     */
    i: number;
    /**
     * 纵坐标
     */
    j: number;
    /**
     * 落子的角色
     */
    role: PlayerRoleType;
};
/**
 * 表示棋盘落子历史的数组，第一个元素即为第一手。
 */
export type BoardHistoryData = BoardStepData[];
/**
 * 计算结果
 */
export type EvaluateResult = {
    /**
     * 落子数据
     */
    step: BoardStepData;
    /**
     * 评分
     */
    score: number;
    /**
     * 最佳路径
     */
    bestPath: [i: number, j: number][];
};
/**
 * 游戏数据
 */
export type GameData = {
    /**
     * 棋盘大小
     */
    size: number;
    /**
     * 棋盘状态
     */
    board: BoardData;
    /**
     * 棋盘历史纪录
     */
    history: BoardHistoryData;
    /**
     * 胜利角色
     */
    winner: RoleType;
    /**
     * 下一个落子的角色
     */
    nextPlayer: PlayerRoleType;
    /**
     * 计算结果
     */
    result: EvaluateResult;
};

declare const Board: any;
declare const minmax: any;
declare const Cache: any;
declare const config: any;
declare const Evaluate: any;
declare const position: any;
declare const shape: any;
declare const ZobristCache: any;
