import { useState, useEffect } from "react";

const text =
  "The quick brown fox jumps over the lazy dog. Practice typing to improve your speed and accuracy.";

export default function TypingSpeedTest() {
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsRunning(false);

      const wordsTyped = input.trim().split(/\s+/).length;
      setWpm(wordsTyped);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, input]);

  const handleChange = (e) => {
    if (!isRunning) {
      setIsRunning(true);
    }

    setInput(e.target.value);
  };

  const restartTest = () => {
    setInput("");
    setTimeLeft(60);
    setWpm(0);
    setIsRunning(false);
  };

  const correctChars = input
    .split("")
    .filter((char, index) => char === text[index]).length;

  const accuracy =
    input.length > 0
      ? ((correctChars / input.length) * 100).toFixed(1)
      : 100;

  return (
    <>
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-blue-600 p-8 rounded-3xl shadow-2xl w-full max-w-3xl">

        <h1 className="text-4xl font-bold text-white text-center mb-6">
          Typing Speed Test
        </h1>

        <div className="bg-white rounded-xl p-4 mb-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            {text}
          </p>
        </div>

        <textarea
          value={input}
          onChange={handleChange}
          placeholder="Start typing here..."
          className="w-full h-40 p-4 rounded-xl outline-none resize-none text-lg"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-3 rounded-xl text-center">
            <h3 className="font-bold">Time</h3>
            <p>{timeLeft}s</p>
          </div>

          <div className="bg-white p-3 rounded-xl text-center">
            <h3 className="font-bold">WPM</h3>
            <p>{wpm}</p>
          </div>

          <div className="bg-white p-3 rounded-xl text-center">
            <h3 className="font-bold">Accuracy</h3>
            <p>{accuracy}%</p>
          </div>

          <div className="bg-white p-3 rounded-xl text-center">
            <h3 className="font-bold">Characters</h3>
            <p>{input.length}</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={restartTest}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100"
          >
            Restart Test
          </button>
        </div>
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