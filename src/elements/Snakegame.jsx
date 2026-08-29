import { useEffect, useState } from "react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const randomFood = () => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection("UP");
          break;
        case "ArrowDown":
          setDirection("DOWN");
          break;
        case "ArrowLeft":
          setDirection("LEFT");
          break;
        case "ArrowRight":
          setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      moveSnake();
    }, 200);

    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  const moveSnake = () => {
    const head = { ...snake[0] };

    switch (direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
      default:
        break;
    }

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= GRID_SIZE ||
      head.y >= GRID_SIZE
    ) {
      setGameOver(true);
      return;
    }

    if (
      snake.some(
        (segment) => segment.x === head.x && segment.y === head.y
      )
    ) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];

    if (head.x === food.x && head.y === food.y) {
      setFood(randomFood());
      setScore((prev) => prev + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(randomFood());
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
  };

  return (
    <>
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="bg-blue-600 p-6 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Snake Game
        </h1>

        <p className="text-white text-center mb-4">
          Score: {score}
        </p>

        <div
          className="grid bg-gray-100"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map(
            (_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);

              const isSnake = snake.some(
                (segment) =>
                  segment.x === x && segment.y === y
              );

              const isFood =
                food.x === x && food.y === y;

              return (
                <div
                  key={index}
                  className={`w-5 h-5 border border-gray-200 ${
                    isSnake
                      ? "bg-green-500"
                      : isFood
                      ? "bg-red-500"
                      : "bg-white"
                  }`}
                />
              );
            }
          )}
        </div>

        {gameOver && (
          <div className="text-center mt-4">
            <h2 className="text-white text-2xl font-bold">
              Game Over!
            </h2>

            <button
              onClick={restartGame}
              className="mt-3 bg-white text-blue-600 px-6 py-2 rounded-xl font-bold"
            >
              Restart
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-gray-600">
        Use Arrow Keys ⬆️⬇️⬅️➡️ to play
      </p>
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