import { useState } from "react";

const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"],
    answer: "New Delhi",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "What is 5 + 7?",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },
  {
    question: "Which animal is called the King of the Jungle?",
    options: ["Tiger", "Lion", "Elephant", "Leopard"],
    answer: "Lion",
  },
  {
    question: "How many days are there in a leap year?",
    options: ["365", "366", "364", "367"],
    answer: "366",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <>
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-blue-600 p-8 rounded-3xl shadow-2xl w-full max-w-xl text-center">
        {showScore ? (
          <>
            <h1 className="text-4xl font-bold text-white mb-4">
              Quiz Completed 🎉
            </h1>

            <h2 className="text-2xl text-white mb-6">
              Score: {score} / {questions.length}
            </h2>

            <button
              onClick={restartQuiz}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold"
            >
              Play Again
            </button>
          </>
        ) : (
          <>
            <h2 className="text-white text-lg mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </h2>

            <h1 className="text-3xl font-bold text-white mb-6">
              {questions[currentQuestion].question}
            </h1>

            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="bg-white text-blue-600 p-3 rounded-xl font-semibold hover:scale-105 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
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