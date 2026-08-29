import { useState } from "react";

export default function RockPaperScissors() {
  const choices = ["🪨 Rock", "📄 Paper", "✂️ Scissors"];

  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState({
    user: 0,
    computer: 0,
  });

  const playGame = (choice) => {
    const computer =
      choices[Math.floor(Math.random() * choices.length)];

    setUserChoice(choice);
    setComputerChoice(computer);

    let gameResult = "";

    if (choice === computer) {
      gameResult = "🤝 It's a Draw!";
    } else if (
      (choice === "🪨 Rock" && computer === "✂️ Scissors") ||
      (choice === "📄 Paper" && computer === "🪨 Rock") ||
      (choice === "✂️ Scissors" && computer === "📄 Paper")
    ) {
      gameResult = "🎉 You Win!";
      setScore((prev) => ({
        ...prev,
        user: prev.user + 1,
      }));
    } else {
      gameResult = "😢 Computer Wins!";
      setScore((prev) => ({
        ...prev,
        computer: prev.computer + 1,
      }));
    }

    setResult(gameResult);
  };

  const resetGame = () => {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
    setScore({ user: 0, computer: 0 });
  };

  return (
    <>
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-blue-600 rounded-3xl shadow-2xl p-8 w-full max-w-lg text-center">

        <h1 className="text-4xl font-bold text-white mb-6">
          Rock Paper Scissors
        </h1>

        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => playGame(choice)}
              className="bg-white text-blue-600 px-5 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              {choice}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 mb-4">
          <p className="text-lg font-semibold">
            Your Choice: {userChoice || "-"}
          </p>

          <p className="text-lg font-semibold mt-2">
            Computer: {computerChoice || "-"}
          </p>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          {result}
        </h2>

        <div className="flex justify-center gap-8 text-white text-xl font-bold mb-6">
          <p>👤 You: {score.user}</p>
          <p>💻 Computer: {score.computer}</p>
        </div>

        <button
          onClick={resetGame}
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
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