import { useState } from "react";

export default function Tictac() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const checkWinner = (currentBoard) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <>
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-blue-600 p-8 rounded-3xl shadow-2xl text-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-6">
          Tic Tac Toe
        </h1>

        <p className="text-white text-xl font-semibold mb-6">
          {winner
            ? `🎉 Winner: ${winner}`
            : `Turn: ${isXTurn ? "X" : "O"}`}
        </p>

        <div className="grid grid-cols-3 gap-3">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-24 h-24 bg-white rounded-xl text-4xl font-bold text-blue-600 shadow-md hover:scale-105 transition-transform duration-200"
            >
              {cell}
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
        >
          Reset Game
        </button>
      </div>
    </div>

    <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <span>Trusted by my Friends</span>
            <div className="flex items-center gap-6 opacity-60">
              <div className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded font-semibold">
                Let's
              </div>
              <div className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded font-semibold">
                Play
              </div>
              <div className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded font-semibold">
                Limitless
              </div>
              <div className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded font-semibold">
                Games
              </div>
            </div>
          </div>

          </>
  );
}