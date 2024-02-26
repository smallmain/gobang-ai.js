<!-- 名字 -->
<h1 align="center">gobang-ai.js</h1>
<!-- 描述 -->
<p align="center">A Gobang AI implementation based on Alpha-Beta pruning algorithm.</p>
<br/>

Read this in other languages: English | [简体中文](./README_zh-CN.md)

## Introduction

This is a backgammon AI based on the [gobang](https://github.com/lihongxun945/gobang) project, thanks to the original project author for his open source spirit.
The original project is a React web page, this project has made the following changes besides retaining only the core algorithm code:

- Available out of the box, published as an ESM format `npm` package
- Encapsulate convenient interfaces and add comments for all public interfaces
- Friendly to TypeScript, added type hint files
- Reimplemented Zobrist Cache so that it can run in JavaScript environment without `BigInt` feature
- Fixed the problem of original project cache failure
- Supports serialization/deserialization algorithm caching

> This project is for private use only, has not been rigorously tested, and is not recommended for use in very formal production environments.

## How to use

If the package manager you use is `npm`, execute the following command on the project to install:

```shell
npm install gobang-ai-js
```
Just import the package directly:

```js
import ai from "gobang-ai-js";
```

## API

### Basic data structure

All data structure types are accessible through the `types` export, which is very helpful in TypeScript:

```ts
// A two-dimensional array representing the state of the chessboard. The value of each element of the array is 1 for black, -1 for white, and 0 for no move here.
let board: ai.types.BoardData;
```

Detailed comments are provided for each type and can be viewed by yourself.

### `evaluate()`

Input the current board state or historical data of moves, and the AI ​​will calculate the next move based on the role of the player who should make the current move and return to the next game state.

Although you can directly pass in a two-dimensional array of chessboards, it is recommended to pass in actual move history data to improve the accuracy of the AI.

For example:

```js
const size = 15;
const depth = 2;
const history = [{ i: 7, j: 7, role: ai.Role.Black }];

const data = ai.evaluate(size, depth, history);

// data: ai.types.GameData
// Chessboard size
// size: number;
// Chessboard status
// board: BoardData;
// Chessboard history record
// history: BoardHistoryData;
// Victory character
// winner: RoleType;
// The character of the next move
// nextPlayer: PlayerRoleType;
// Calculation results
// result: EvaluateResult;
```

With just this interface, you can use AI to calculate the next move point. For example, the following is an implementation of AI that continuously plays chess with itself until a winner is determined:

```ts
let data: ai.types.GameData | null = null;
do {
    data = ai.evaluate(size, depth, data ? data.history : [])!;
    console.log("AI move information:", data.result.step, "Current chess game two-dimensional array:", data.board);
} while (data.winner !== ai.Role.None);
```

### `clsas Game`

Using the `evaluate()` interface can already implement the function of calculating the move point with AI, but the `evaluate()` interface actually creates a `Game` instance internally every time it is called. If you are pursuing better performance or more For rich functions, you can use the `Game` class.

The `Game` class is a simple but complete logic implementation of backgammon, which can be used with any front end to quickly implement a backgammon game.

```ts
const game = new ai.Game(/** size */);
```

#### Common interface

- `game.winner` the current winner
- `game.board` board data
- `game.history` history
- `game.nextRole` the role that should be moved next
- `game.isGameOver` whether the game is over (if there is no winner, it is a draw)
- `game.move()` move
- `game.undo()` cancel the last move
- `game.evaluate()` calculates the next move based on the role of the player who should move in the current chess game

#### Serialization/deserialization

You can save the current game as a JSON string, or read the game from a JSON string:

```ts
const json = JSON.stringify(game.save());

const data = JSON.parse(json);
game.load(data.size, data.history);
```

### Cache serialization

AI uses Zobrist Cache to reduce repeated calculations. This cache can be serialized and saved and then loaded on low-end devices to achieve the purpose of exchanging space for time, so that low-end machines can also have a relatively smooth experience.

Serialize cache to JSON string:

```ts
const text = ai.serializeCache();
```

Apply caching from a JSON object or string:

```ts
ai.deserializeCache(text);
```

### Private interface

`internal` is the internal implementation code. If you understand it, you can use it yourself.

## Configure

You can use `config` to adjust the configuration of certain algorithms. The following are the default values ​​and comments:

```ts
ai.config = {
    enableCache: true, // Whether to enable Zobrist Cache
    onlyInLine: false, // Whether to enable the optimization method of only searching for points on a line
    inlineCount: 4,    // If enabled, use the most recent points
    inLineDistance: 5, // If enabled, the maximum distance to determine whether the point is on a line
}
```

## Grateful

[lihongxun945](https://github.com/lihongxun945)
