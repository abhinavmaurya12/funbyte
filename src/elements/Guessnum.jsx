import { useState } from "react";

export default function GuessNumber() {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const checkGuess = () => {
    const userGuess = Number(guess);

    if (!userGuess || userGuess < 1 || userGuess > 100) {
      setMessage("⚠️ Enter a number between 1 and 100");
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === randomNumber) {
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} attempts.`);
    } else if (userGuess < randomNumber) {
      setMessage("📈 Too Low!");
    } else {
      setMessage("📉 Too High!");
    }
  };

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setAttempts(0);
  };

  return (
    <>
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-blue-600 p-8 rounded-3xl shadow-2xl text-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-4">
          Guess The Number
        </h1>

        <p className="text-white mb-6">
          Guess a number between 1 and 100
        </p>

        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
          className="w-full p-3 rounded-xl text-center text-lg mb-4 bg-white outline-none"
        />

        <button
          onClick={checkGuess}
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
        >
          Check Guess
        </button>

        <p className="text-white text-xl mt-6">{message}</p>

        <p className="text-white mt-3">
          Attempts: {attempts}
        </p>

        <button
          onClick={resetGame}
          className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition"
        >
          New Game
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