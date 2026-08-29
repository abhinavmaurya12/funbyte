import React, { useEffect, useRef, useState } from "react";

export default function CarRace() {
  const ROAD_HEIGHT = 650;
  const LANES = [20, 95, 170, 245, 320];

  const [lane, setLane] = useState(2);
  const [obstacles, setObstacles] = useState([]);
  const [coins, setCoins] = useState([]);
  const [score, setScore] = useState(0);
  const [coinCount, setCoinCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [nitro, setNitro] = useState(100);

  const speedRef = useRef(8);

  const highScore = Number(
    localStorage.getItem("race_high") || 0
  );

  const leaderboard = JSON.parse(
    localStorage.getItem("race_board") || "[]"
  );

  const level = Math.floor(score / 400) + 1;

  const nightMode = level % 2 === 0;

  useEffect(() => {
    const keyHandler = (e) => {
      if (gameOver) return;

      if (e.key === "ArrowLeft") {
        setLane((p) => Math.max(0, p - 1));
      }

      if (e.key === "ArrowRight") {
        setLane((p) => Math.min(4, p + 1));
      }

      if (e.code === "Space" && nitro > 5) {
        speedRef.current += 8;
        setNitro((n) => Math.max(0, n - 8));
      }

      if (e.key.toLowerCase() === "p") {
        setPaused((p) => !p);
      }
    };

    window.addEventListener(
      "keydown",
      keyHandler
    );

    return () =>
      window.removeEventListener(
        "keydown",
        keyHandler
      );
  }, [gameOver, nitro]);

  useEffect(() => {
    if (gameOver) return;

    const spawn = setInterval(() => {
      const randomLane = Math.floor(
        Math.random() * 5
      );

      setObstacles((p) => [
        ...p,
        {
          id: Date.now() + Math.random(),
          lane: randomLane,
          y: -120,
        },
      ]);

      if (Math.random() > 0.35) {
        setCoins((p) => [
          ...p,
          {
            id: Date.now() + Math.random(),
            lane: Math.floor(
              Math.random() * 5
            ),
            y: -60,
          },
        ]);
      }
    }, Math.max(400, 900 - level * 30));

    return () => clearInterval(spawn);
  }, [gameOver, level]);
    useEffect(() => {
    if (paused || gameOver) return;

    const loop = setInterval(() => {
      setScore((s) => s + 1);

      // Nitro Recharge
      setNitro((n) =>
        Math.min(100, n + 0.05)
      );

      // Move Enemy Cars
      setObstacles((prev) => {
        const updated = prev
          .map((o) => ({
            ...o,
            y: o.y + speedRef.current,
          }))
          .filter(
            (o) =>
              o.y < ROAD_HEIGHT + 100
          );

        updated.forEach((o) => {
          const hit =
            o.lane === lane &&
            o.y > 500 &&
            o.y < 610;

          if (hit) {
            finishGame();
          }
        });

        return updated;
      });

      // Move Coins
      setCoins((prev) =>
        prev
          .map((c) => ({
            ...c,
            y: c.y + speedRef.current,
          }))
          .filter((c) => {
            const collected =
              c.lane === lane &&
              c.y > 500 &&
              c.y < 610;

            if (collected) {
              setCoinCount(
                (coins) => coins + 1
              );

              return false;
            }

            return (
              c.y <
              ROAD_HEIGHT + 50
            );
          })
      );

      // Smooth Nitro Decay
      speedRef.current = Math.max(
        8 + level,
        speedRef.current - 0.03
      );
    }, 30);

    return () => clearInterval(loop);
  }, [
    paused,
    gameOver,
    lane,
    level,
  ]);

  const finishGame = () => {
    setGameOver(true);

    if (score > highScore) {
      localStorage.setItem(
        "race_high",
        score
      );
    }

    const board = JSON.parse(
      localStorage.getItem(
        "race_board"
      ) || "[]"
    );

    board.push(score);

    localStorage.setItem(
      "race_board",
      JSON.stringify(
        board
          .sort((a, b) => b - a)
          .slice(0, 10)
      )
    );
  };

  const restart = () => {
    setLane(2);
    setObstacles([]);
    setCoins([]);
    setScore(0);
    setCoinCount(0);
    setPaused(false);
    setGameOver(false);
    setNitro(100);

    speedRef.current = 8;
  };
    return (
        <>
    <div
      className={`min-h-screen p-4 transition-all duration-500 ${
        nightMode
          ? "bg-black"
          : "bg-slate-800"
      }`}
    >
      <div className="max-w-5xl mx-auto text-white">

        {/* Header */}
        {/* <h1 className="text-center text-4xl font-bold mb-4">
          🏎️ Advanced Car Race
        </h1> */}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4 text-center">
          <div className="bg-white/10 rounded-lg p-2">
            Score
            <div className="font-bold">
              {score}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-2">
            Level
            <div className="font-bold">
              {level}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-2">
            Coins
            <div className="font-bold">
              {coinCount}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-2">
            High Score
            <div className="font-bold">
              {highScore}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-2">
            Status
            <div className="font-bold">
              {paused
                ? "⏸ Pause"
                : "▶ Running"}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-2">
            Mode
            <div className="font-bold">
              {nightMode
                ? "🌙 Night"
                : "☀ Day"}
            </div>
          </div>
        </div>

        {/* Nitro */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>⚡ Nitro</span>
            <span>
              {Math.round(nitro)}%
            </span>
          </div>

          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all"
              style={{
                width: `${nitro}%`,
              }}
            />
          </div>
        </div>

        {/* Road */}
        <div className="relative mx-auto w-[400px] h-[650px] overflow-hidden border-4 border-white rounded-xl bg-zinc-700">

          {/* Road Lines */}
          {[80, 160, 240, 320].map(
            (x) => (
              <div
                key={x}
                className="absolute top-0 h-full border-r-4 border-dashed border-white opacity-40"
                style={{
                  left: x,
                }}
              />
            )
          )}

          {/* Player */}
          <div
            className="absolute w-14 h-28 bg-blue-500 rounded-xl shadow-lg transition-all duration-100"
            style={{
              left: LANES[lane],
              bottom: 20,
            }}
          >
            <div className="flex items-center justify-center h-full text-2xl">
              🚗
            </div>
          </div>

          {/* Enemies */}
          {obstacles.map((o) => (
            <div
              key={o.id}
              className="absolute w-14 h-28 bg-red-500 rounded-xl"
              style={{
                left: LANES[o.lane],
                top: o.y,
              }}
            >
              <div className="flex items-center justify-center h-full text-2xl">
                🚙
              </div>
            </div>
          ))}

          {/* Coins */}
          {coins.map((c) => (
            <div
              key={c.id}
              className="absolute text-3xl"
              style={{
                left:
                  LANES[c.lane] + 10,
                top: c.y,
              }}
            >
              🪙
            </div>
          ))}
        </div>

        {/* Mobile Controls */}
        <div className="flex justify-center gap-3 mt-5 md:hidden">
          <button
            onClick={() =>
              setLane((p) =>
                Math.max(0, p - 1)
              )
            }
            className="bg-blue-600 px-6 py-3 rounded-lg"
          >
            ⬅️
          </button>

          <button
            onClick={() =>
              setLane((p) =>
                Math.min(4, p + 1)
              )
            }
            className="bg-blue-600 px-6 py-3 rounded-lg"
          >
            ➡️
          </button>
        </div>

        {/* Controls */}
        <div className="mt-5 text-center text-sm text-gray-300">
          ⬅️ ➡️ Move |
          SPACE = Nitro |
          P = Pause
        </div>

        {/* Leaderboard */}
        {/* <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            🏆 Leaderboard
          </h2>

          {leaderboard.length === 0 ? (
            <p>
              No scores yet...
            </p>
          ) : (
            leaderboard.map(
              (score, index) => (
                <div
                  key={index}
                  className="bg-white/10 p-2 rounded mb-2"
                >
                  #{index + 1} —{" "}
                  {score}
                </div>
              )
            )
          )}
        </div> */}

        {/* Game Over */}
        {gameOver && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-zinc-900 p-8 rounded-2xl text-center">

              <h2 className="text-4xl font-bold text-red-500 mb-3">
                💥 Game Over
              </h2>

              <p className="mb-2">
                Final Score:
                {" "}
                {score}
              </p>

              <p className="mb-4">
                Coins:
                {" "}
                {coinCount}
              </p>

              <button
                onClick={restart}
                className="bg-green-600 px-6 py-3 rounded-lg"
              >
                🔄 Play Again
              </button>
            </div>
          </div>
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