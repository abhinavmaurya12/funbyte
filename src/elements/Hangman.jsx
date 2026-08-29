import { useState } from "react";

const words = [
  "REACT",
  "JAVASCRIPT",
  "PYTHON",
  "HANGMAN",
  "COMPUTER",
  "CODING",
  "FUNBYTE",
];

export default function Hangman() {
  const [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const maxWrong = 6;

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  const displayWord = word
    .split("")
    .map((letter) =>
      guessedLetters.includes(letter) ? letter : "_"
    )
    .join(" ");

  const won = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const lost = wrongGuesses >= maxWrong;

  const restartGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  return (
    <>
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-blue-600 p-8 rounded-3xl shadow-2xl w-full max-w-2xl text-center">

        <h1 className="text-4xl font-bold text-white mb-6">
          Hangman Game
        </h1>

        <h3 className="text-white">REACT,
  JAVASCRIPT,
  PYTHON,
  HANGMAN,
  COMPUTER,
  CODING,
  FUNBYTE</h3>

        <div className="bg-white rounded-xl p-6 mb-6">
          <h2 className="text-3xl font-bold tracking-widest">
            {displayWord}
          </h2>
        </div>

        <p className="text-white text-xl mb-4">
          Wrong Guesses: {wrongGuesses} / {maxWrong}
        </p>

        {won && (
          <h2 className="text-green-300 text-2xl font-bold mb-4">
            🎉 You Won!
          </h2>
        )}

        {lost && (
          <h2 className="text-red-300 text-2xl font-bold mb-4">
            😢 Game Over! Word: {word}
          </h2>
        )}

        <div className="grid grid-cols-7 gap-2 mb-6">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <button
              key={letter}
              disabled={
                guessedLetters.includes(letter) || won || lost
              }
              onClick={() => handleGuess(letter)}
              className="bg-white text-blue-600 font-bold py-2 rounded-lg disabled:bg-gray-300"
            >
              {letter}
            </button>
          ))}
        </div>

        <button
          onClick={restartGame}
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100"
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