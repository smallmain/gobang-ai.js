declare namespace _default {
    export { internal };
    export { Role };
    export { Game };
    export { evaluate };
    export { types };
    export { config };
}
export default _default;
import internal, * as types from './src/index.js';
/**
 * @type {{Black: 1, White: -1, None: 0}}
 *
 * 角色枚举
 */
declare const Role: {
    Black: 1;
    White: -1;
    None: 0;
};
/**
 * 游戏
 */
declare class Game {
    /**
     * @param {number} size
     */
    constructor(size: number);
    /**
     * 当前赢家
     *
     * @type {import("./src/index.js").RoleType}
     */
    get winner(): types.RoleType;
    /**
     * 当前棋盘
     *
     * @type {import("./src/index.js").BoardData}
     */
    get board(): types.BoardData;
    /**
     * 历史记录
     *
     * @type {import("./src/index.js").BoardHistoryData}
     */
    get history(): types.BoardHistoryData;
    /**
     * 下一个落子的角色
     *
     * @type {import("./src/index.js").PlayerRoleType}
     */
    get nextRole(): types.PlayerRoleType;
    /**
     * 游戏是否结束
     *
     * @type {boolean}
     */
    get isGameOver(): boolean;
    _board: any;
    /**
     * 落子，返回是否落子成功
     *
     * @param {import("./src/index.js").BoardStepData} step 落子数据
     * @returns {boolean}
     */
    move(step: import("./src/index.js").BoardStepData): boolean;
    /**
     * 取消上次落子，返回是否取消成功
     *
     * @returns {boolean}
     */
    undo(): boolean;
    /**
     * AI 将以当前棋局应落子玩家的角色计算下一步落子
     *
     * @param {number} depth 算法深度，2 - 弱智，4 - 简单，6 - 普通，8 - 困难，可以是任意数值
     * @returns {import("./src/index.js").EvaluateResult}
     */
    evaluate(depth: number): import("./src/index.js").EvaluateResult;
    /**
     * 从数据中恢复游戏
     *
     * @param {number} size
     * @param {import("./src/index.js").BoardHistoryData | import("./src/index.js").BoardData} data 棋盘状态或者落子历史数据
     */
    load(size: number, data: import("./src/index.js").BoardHistoryData | import("./src/index.js").BoardData): void;
    /**
     * 保存游戏为可序列化对象
     *
     * @returns {import("./src/index.js").GameData}
     */
    save(): import("./src/index.js").GameData;
}
/**
 * 传入当前棋盘状态，AI 将以当前棋局应落子玩家的角色计算下一步落子并返回下一个棋盘状态。
 *
 * @param {number} size 棋盘大小
 * @param {number} depth 算法深度，2 - 弱智，4 - 简单，6 - 普通，8 - 困难，可以是任意数值
 * @param {import("./src/index.js").BoardHistoryData | import("./src/index.js").BoardData} data 棋盘状态或者落子历史数据
 * @returns {import("./src/index.js").GameData | undefined}
 */
declare function evaluate(size: number, depth: number, data: import("./src/index.js").BoardHistoryData | import("./src/index.js").BoardData): import("./src/index.js").GameData | undefined;
/**
 * @type {{enableCache: boolean;onlyInLine: boolean;inlineCount: number;inLineDistance: number;}}
 *
 * 全局配置
 */
declare const config: {
    enableCache: boolean;
    onlyInLine: boolean;
    inlineCount: number;
    inLineDistance: number;
};
