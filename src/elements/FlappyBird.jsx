import React, { useEffect, useState } from "react";

export default function FlappyBird() {
  const GAME_HEIGHT = 600;
  const GAME_WIDTH = 400;
  const BIRD_SIZE = 40;
  const PIPE_WIDTH = 60;
  const GAP = 180;
  const GRAVITY = 4;
  const JUMP = -60;

  const [birdY, setBirdY] = useState(250);
  const [pipeX, setPipeX] = useState(400);
  const [pipeHeight, setPipeHeight] = useState(200);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Gravity
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gravity = setInterval(() => {
      setBirdY((y) => y + GRAVITY);
    }, 24);

    return () => clearInterval(gravity);
  }, [isPlaying, gameOver]);

  // Pipes movement
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const movePipe = setInterval(() => {
      setPipeX((x) => {
        if (x < -PIPE_WIDTH) {
          setScore((s) => s + 1);
          setPipeHeight(Math.floor(Math.random() * 250) + 100);
          return GAME_WIDTH;
        }
        return x - 5;
      });
    }, 24);

    return () => clearInterval(movePipe);
  }, [isPlaying, gameOver]);

  // Collision Detection
  useEffect(() => {
    const hitPipe =
      pipeX < 90 &&
      pipeX + PIPE_WIDTH > 50 &&
      (birdY < pipeHeight ||
        birdY + BIRD_SIZE > pipeHeight + GAP);

    const hitGround =
      birdY <= 0 ||
      birdY >= GAME_HEIGHT - BIRD_SIZE;

    if (hitPipe || hitGround) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [birdY, pipeX, pipeHeight]);

  const jump = () => {
    if (gameOver) return;
    setIsPlaying(true);
    setBirdY((y) => y + JUMP);
  };

  const restart = () => {
    setBirdY(250);
    setPipeX(400);
    setPipeHeight(200);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-4">
        🕹️ Flappy Bird
      </h1>

      <div className="text-xl font-semibold mb-4">
        Score: {score}
      </div>

      <div
        onClick={jump}
        className="relative overflow-hidden border-4 border-black bg-sky-300 cursor-pointer"
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
        }}
      >
        {/* Bird */}
        <div
          className="absolute bg-yellow-400 rounded-full"
          style={{
            width: BIRD_SIZE,
            height: BIRD_SIZE,
            left: 50,
            top: birdY,
          }}
        />

        {/* Top Pipe */}
        <div
          className="absolute bg-green-600"
          style={{
            left: pipeX,
            width: PIPE_WIDTH,
            height: pipeHeight,
            top: 0,
          }}
        />

        {/* Bottom Pipe */}
        <div
          className="absolute bg-green-600"
          style={{
            left: pipeX,
            width: PIPE_WIDTH,
            height:
              GAME_HEIGHT -
              pipeHeight -
              GAP,
            top: pipeHeight + GAP,
          }}
        />

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
            Click To Start
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
            <h2 className="text-3xl font-bold">
              Game Over
            </h2>
            <p className="mt-2">
              Score: {score}
            </p>

            <button
              onClick={restart}
              className="mt-4 px-5 py-2 bg-white text-black rounded-lg"
            >
              Restart
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-gray-600">
        Click inside the game area to jump.
      </p>
    </div>
  );
}