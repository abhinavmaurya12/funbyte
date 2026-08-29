import { useState } from "react";

export default function Game2048() {
  const createBoard = () => {
    const board = Array(4)
      .fill()
      .map(() => Array(4).fill(0));

    addRandom(board);
    addRandom(board);
    return board;
  };

  const addRandom = (board) => {
    const empty = [];

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] === 0) {
          empty.push([r, c]);
        }
      }
    }

    if (empty.length === 0) return;

    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
  };

  const [board, setBoard] = useState(createBoard());

  const slide = (row) => {
    let arr = row.filter((num) => num);

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        arr[i + 1] = 0;
      }
    }

    arr = arr.filter((num) => num);

    while (arr.length < 4) {
      arr.push(0);
    }

    return arr;
  };

  const moveLeft = () => {
    const newBoard = board.map((row) => slide([...row]));
    addRandom(newBoard);
    setBoard([...newBoard]);
  };

  const moveRight = () => {
    const newBoard = board.map((row) =>
      slide([...row].reverse()).reverse()
    );

    addRandom(newBoard);
    setBoard([...newBoard]);
  };

  const transpose = (matrix) =>
    matrix[0].map((_, col) => matrix.map((row) => row[col]));

  const moveUp = () => {
    let newBoard = transpose(board);
    newBoard = newBoard.map((row) => slide([...row]));
    newBoard = transpose(newBoard);

    addRandom(newBoard);
    setBoard([...newBoard]);
  };

  const moveDown = () => {
    let newBoard = transpose(board);
    newBoard = newBoard.map((row) =>
      slide([...row].reverse()).reverse()
    );
    newBoard = transpose(newBoard);

    addRandom(newBoard);
    setBoard([...newBoard]);
  };

  const resetGame = () => {
    setBoard(createBoard());
  };

  const getColor = (value) => {
    switch (value) {
      case 2:
        return "bg-gray-200";
      case 4:
        return "bg-gray-300";
      case 8:
        return "bg-orange-300";
      case 16:
        return "bg-orange-400";
      case 32:
        return "bg-orange-500";
      case 64:
        return "bg-red-500";
      case 128:
        return "bg-yellow-400";
      case 256:
        return "bg-yellow-500";
      case 512:
        return "bg-yellow-600";
      case 1024:
        return "bg-green-500";
      case 2048:
        return "bg-green-700 text-white";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-5xl font-bold mb-4">🎲 2048 Game</h1>

      <button
        onClick={resetGame}
        className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        New Game
      </button>

      <div className="bg-gray-300 p-4 rounded-xl">
        <div className="grid grid-cols-4 gap-2">
          {board.flat().map((cell, index) => (
            <div
              key={index}
              className={`w-20 h-20 flex items-center justify-center rounded-lg text-2xl font-bold ${getColor(
                cell
              )}`}
            >
              {cell !== 0 ? cell : ""}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <div></div>

        <button
          onClick={moveUp}
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          ⬆
        </button>

        <div></div>

        <button
          onClick={moveLeft}
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          ⬅
        </button>

        <button
          onClick={moveDown}
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          ⬇
        </button>

        <button
          onClick={moveRight}
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          ➡
        </button>
      </div>

      <p className="mt-6 text-gray-600 text-center">
        Combine matching tiles to reach <strong>2048</strong>.
      </p>
    </div>
  );
}