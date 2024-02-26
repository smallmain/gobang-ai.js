import Board from './board.js';
import Cache from './cache.js';
import * as caches from "./caches.js";
import { config } from './config.js';
import Evaluate from './eval.js';
import { minmax } from './minmax.js';
import * as position from './position.js';
import * as shape from './shape.js';
import ZobristCache from './zobrist.js';

/**
 * @typedef {PlayerRoleType | typeof import("../index.js").default.Role.None} RoleType
 *
 * 角色类型
 */

/**
 * @typedef {typeof import("../index.js").default.Role.Black | typeof import("../index.js").default.Role.White} PlayerRoleType
 *
 * 玩家角色类型
 */

/**
 * @typedef {RoleType[][]} BoardData
 *
 * 表示棋盘状态的二维数组，数组的每个元素的值为 1 表示黑棋，-1 表示白棋，值为 0 表示此处未落子。
 */

/**
 * @typedef BoardStepData
 *
 * 单步棋盘落子数据
 *
 * @property {number} i 横坐标
 * @property {number} j 纵坐标
 * @property {PlayerRoleType} role 落子的角色
 */

/**
 * @typedef {BoardStepData[]} BoardHistoryData
 *
 * 表示棋盘落子历史的数组，第一个元素即为第一手。
 */

/**
 * @typedef EvaluateResult
 *
 * 计算结果
 *
 * @property {BoardStepData} step 落子数据
 * @property {number} score 评分
 * @property {[i: number, j: number][]} bestPath 最佳路径
 */

/**
 * @typedef GameData
 *
 * 游戏数据
 *
 * @property {number} size 棋盘大小
 * @property {BoardData} board 棋盘状态
 * @property {BoardHistoryData} history 棋盘历史纪录
 * @property {RoleType} winner 胜利角色
 * @property {PlayerRoleType} nextPlayer 下一个落子的角色
 * @property {EvaluateResult} result 计算结果
 */

export default { Board, minmax, Cache, config, Evaluate, position, shape, ZobristCache, caches };
