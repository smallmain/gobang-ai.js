import internal, * as types from './src/index.js';

/**
 * @type {{enableCache: boolean;onlyInLine: boolean;inlineCount: number;inLineDistance: number;}}
 *
 * 全局配置
 */
const config = internal.config;

/**
 * @type {{Black: 1, White: -1, None: 0}}
 *
 * 角色枚举
 */
const Role = {
    Black: 1,
    White: -1,
    None: 0,
};

/**
 * 根据当前棋盘状态生成假的落子历史数据
 *
 * @param {import("./src/index.js").BoardData} data
 * @returns {import("./src/index.js").BoardHistoryData}
 */
function generateHistory(data) {
    /**
     * @type {import("./src/index.js").BoardHistoryData}
     */
    const blackHistory = [];

    /**
     * @type {import("./src/index.js").BoardHistoryData}
     */
    const whiteHistory = [];

    for (let i = 0; i < data.length; i++) {
        const subData = data[i];
        for (let j = 0; j < subData.length; j++) {
            const role = subData[j];
            if (role === internal.Role.Black) {
                // @ts-expect-error
                blackHistory.push({ i, j, role });
            } else if (role === internal.Role.White) {
                // @ts-expect-error
                whiteHistory.push({ i, j, role });
            }
        }
    }

    /**
     * @type {import("./src/index.js").BoardHistoryData}
     */
    const history = [];
    let t = 0;

    while (blackHistory.length > 0 || whiteHistory.length > 0) {
        if (t % 2 === 0) {
            // @ts-expect-error
            history.push(blackHistory.pop() ?? 0);
        } else {
            // @ts-expect-error
            history.push(whiteHistory.pop() ?? 0);
        }
        t++;
    }

    return history;
}

/**
 * 游戏
 */
class Game {
    /**
     * 当前赢家
     *
     * @type {import("./src/index.js").RoleType}
     */
    get winner() {
        return this._board.getWinner();
    }

    /**
     * 当前棋盘
     *
     * @type {import("./src/index.js").BoardData}
     */
    get board() {
        return this._board.board;
    }

    /**
     * 历史记录
     *
     * @type {import("./src/index.js").BoardHistoryData}
     */
    get history() {
        return this._board.history;
    }

    /**
     * 下一个落子的角色
     *
     * @type {import("./src/index.js").PlayerRoleType}
     */
    get nextRole() {
        // @ts-expect-error
        return this._board.role;
    }

    /**
     * 游戏是否结束
     *
     * @type {boolean}
     */
    get isGameOver() {
        this._board.getWinner()
        return this._board.isGameOver();
    }

    /**
     * @param {number} size
     */
    constructor(size) {
        this._board = new internal.Board(size);
    }

    /**
     * 落子，返回是否落子成功
     *
     * @param {import("./src/index.js").BoardStepData} step 落子数据
     * @returns {boolean}
     */
    move(step) {
        return this._board.put(step.i, step.j, step.role);
    }

    /**
     * 取消上次落子，返回是否取消成功
     *
     * @returns {boolean}
     */
    undo() {
        return this._board.undo();
    }

    /**
     * AI 将以当前棋局应落子玩家的角色计算下一步落子
     *
     * @param {number} depth 算法深度，2 - 弱智，4 - 简单，6 - 普通，8 - 困难，可以是任意数值
     * @returns {import("./src/index.js").EvaluateResult}
     */
    evaluate(depth) {
        const result = internal.minmax(this._board, this._board.role, depth);
        const role = this._board.role;
        const [score, move, bestPath] = result;
        return {
            // @ts-expect-error
            step: { i: move[0], j: move[1], role },
            score,
            bestPath,
        };
    }

    /**
     * 从数据中恢复游戏
     *
     * @param {number} size
     * @param {import("./src/index.js").BoardHistoryData | import("./src/index.js").BoardData} data 棋盘状态或者落子历史数据
     */
    load(size, data) {
        const board = this._board = new internal.Board(size);

        if (data.length !== 0) {
            // 二维数组即棋盘状态，需要转换成落子历史数据
            if (Array.isArray(data[0])) {
                // @ts-expect-error
                data = generateHistory(data);
            }
        }

        /**
         * @type {import("./src/index.js").BoardHistoryData}
         */
        // @ts-expect-error
        const history = data;

        // 模拟落子
        for (const step of history) {
            board.put(step.i, step.j, step.role);
        }
    }

    /**
     * 保存游戏为可序列化对象
     *
     * @returns {import("./src/index.js").GameData}
     */
    save() {
        const size = this._board.size;

        return {
            size,
            board: this.board,
            history: this.history,
            winner: this.winner,
            nextPlayer: this.nextRole,
            result: {
                // @ts-expect-error
                step: { i: 0, j: 0, role: 0 },
                score: 0,
                bestPath: [],
            },
        };
    }
}

/**
 * 传入当前棋盘状态，AI 将以当前棋局应落子玩家的角色计算下一步落子并返回下一个棋盘状态。
 *
 * @param {number} size 棋盘大小
 * @param {number} depth 算法深度，2 - 弱智，4 - 简单，6 - 普通，8 - 困难，可以是任意数值
 * @param {import("./src/index.js").BoardHistoryData | import("./src/index.js").BoardData} data 棋盘状态或者落子历史数据
 * @returns {import("./src/index.js").GameData | undefined}
 */
function evaluate(size, depth, data) {
    const game = new Game(size);
    game.load(size, data);

    // 计算
    const result = game.evaluate(depth);

    // 落子
    if (game.move(result.step)) {
        return {
            size,
            board: game.board,
            history: game.history,
            winner: game.winner,
            nextPlayer: game.nextRole,
            result,
        };
    } else {
        return undefined;
    }
}

export default { internal, Role, Game, evaluate, types, config };
