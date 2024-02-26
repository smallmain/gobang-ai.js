<!-- 名字 -->
<h1 align="center">gobang-ai.js</h1>
<!-- 描述 -->
<p align="center">一个基于 Alpha-Beta 剪枝算法实现的五子棋 AI。</p>
<br/>

阅读其它语言版本: [English](./README.md) | 简体中文

## 起步

这是一个基于 [gobang](https://github.com/lihongxun945/gobang) 项目实现的五子棋 AI，感谢原项目作者的开源精神。

原项目是一个 React 网页，本项目在仅保留核心算法代码之外做了以下改动：

- 开箱即用，发布为 ESM 格式 `npm` 包
- 封装便捷接口，添加了所有公开接口的注释
- 对 TypeScript 友好，添加了类型提示文件
- 重新实现了 Zobrist Cache，使其能运行在无 `BigInt` 特性的 JavaScript 环境
- 修复原项目缓存失效的问题
- 支持序列化/反序列化算法缓存

> 该项目仅私人使用，未经过严格测试，不建议用于非常正式的生产环境。

## 如何使用

如果你使用的包管理器是 `npm`，则在项目执行以下命令安装：

```shell
npm install gobang-ai-js
```

直接导入该包即可：

```js
import ai from "gobang-ai-js";
```

## API

### 基础数据结构

所有数据结构类型可通过 `types` 导出访问，这对 TypeScript 非常有帮助：

```ts
// 表示棋盘状态的二维数组，数组的每个元素的值为 1 表示黑棋，-1 表示白棋，值为 0 表示此处未落子。
let board: ai.types.BoardData;
```

每个类型都提供了详尽的注释可自行查看。

### `evaluate()`

传入当前棋盘状态或者落子历史数据，AI 将以当前应落子玩家的角色计算下一步落子并返回下一个游戏状态。

虽然可以直接传入一个棋盘的二维数组，但建议传入实际的落子历史数据以提高 AI 的准确性。

例如：

```js
const size = 15;
const depth = 2;
const history = [{ i: 7, j: 7, role: ai.Role.Black }];

const data = ai.evaluate(size, depth, history);

// data: ai.types.GameData
// 棋盘大小
// size: number;
// 棋盘状态
// board: BoardData;
// 棋盘历史纪录
// history: BoardHistoryData;
// 胜利角色
// winner: RoleType;
// 下一个落子的角色
// nextPlayer: PlayerRoleType;
// 计算结果
// result: EvaluateResult;
```

只需这一个接口就可以使用 AI 计算下一步的落子点，比如下面是一个 AI 不断自我对弈直到分出胜负的实现：

```ts
let data: ai.types.GameData | null = null;
do {
    data = ai.evaluate(size, depth, data ? data.history : [])!;
    console.log("AI 落子信息：", data.result.step, "当前棋局二维数组：", data.board);
} while (data.winner !== ai.Role.None);
```

### `clsas Game`

使用 `evaluate()` 接口已经可以实现用 AI 计算落子点的功能，但是 `evaluate()` 接口实际上每次调用都在内部创建了一个 `Game` 实例，如果追求更好的性能表现或更丰富的功能，可以使用 `Game` 类。

`Game` 类是一个简易但完整的五子棋逻辑实现，可以搭配任意前端快速实现一个五子棋游戏。

```ts
const game = new ai.Game(/** size */);
```

#### 常用接口

- `game.winner` 当前赢家
- `game.board` 棋盘数据
- `game.history` 历史记录
- `game.nextRole` 应该下一个落子的角色
- `game.isGameOver` 游戏是否结束（如果没有赢家则是平局）
- `game.move()` 落子
- `game.undo()` 取消上次落子
- `game.evaluate()` 以当前棋局应落子玩家的角色计算下一步落子

#### 序列化/反序列化

可将当前棋局保存为 JSON 字符串，或从 JSON 字符串读取棋局：

```ts
const json = JSON.stringify(game.save());

const data = JSON.parse(json);
game.load(data.size, data.history);
```

### 缓存序列化

AI 使用了 Zobrist Cache 以减少重复的计算，这个缓存可以被序列化保存然后在低端设备上加载，达到以空间换时间的目的，使低端机也有相对流畅的体验。

将缓存序列化为 JSON 字符串：

```ts
const text = ai.serializeCache();
```

从 JSON 对象或者字符串应用缓存：

```ts
ai.deserializeCache(text);
```

### 私有接口

`internal` 是内部实现的代码，如果你明白，那么你可以自行使用。

## 配置

可以使用 `config` 调整某些算法的配置，以下是默认值与注释：

```ts
ai.config = {
    enableCache: true, // 是否开启 Zobrist Cache
    onlyInLine: false, // 是否启用只搜索一条线上的点位的优化手段
    inlineCount: 4,    // 如果启用，则使用最近多少个点位
    inLineDistance: 5, // 如果启用，判断点位是否在一条线上的最大距离
}
```

## 感谢

[lihongxun945](https://github.com/lihongxun945)
