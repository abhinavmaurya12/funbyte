import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const navigate = useNavigate();

  const games = [
    { title: "Number Count", path: "/numbercount", icon: "🔢", description: "Count numbers and improve speed." },
    { title: "Tic Tac Toe", path: "/tictac", icon: "❌⭕", description: "Classic X and O game." },
    { title: "Rock Paper Scissors", path: "/rps", icon: "✂️", description: "Play against computer." },
    { title: "Quiz Game", path: "/quiz", icon: "📝", description: "Test your knowledge." },
    { title: "Guess Number", path: "/guessnum", icon: "🎯", description: "Guess the hidden number." },
    { title: "Snake Game", path: "/snakegame", icon: "🐍", description: "Control the snake." },
    { title: "Typing Speed", path: "/typingspeed", icon: "⌨️", description: "Check typing speed." },
    { title: "Hangman", path: "/hangman", icon: "🎭", description: "Guess the word." },
    { title: "Flappy Bird", path: "/flappybird", icon: "🐦", description: "Fly through obstacles." },
    { title: "2048 Game", path: "/game2048", icon: "🧠", description: "Reach 2048 tile." },
    { title: "Spin Wheel", path: "/spinwheel", icon: "🎡", description: "Spin your luck." },
    {title: "Explore More", path: "/explore", icon: "🔍", description: "Discover more games."},
    {title: "Car Race", path: "/carrace", icon: "🏎️", description: "Race against other drivers."}
  ];

  const [search, setSearch] = useState("");

  const results = games.filter(
    (game) =>
      game.title.toLowerCase().includes(search.toLowerCase()) ||
      game.description.toLowerCase().includes(search.toLowerCase())
  );

  const trendingGames = games.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold">
            <span className="text-blue-500">F</span>
            <span className="text-blue-500">u</span>
            <span className="text-blue-500">n</span>
            <span className="text-blue-500">B</span>
            <span className="text-blue-500">y</span>
            <span className="text-blue-500">t</span>
            <span className="text-blue-500">e 🎮</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Search your favorite mini games
          </p>
        </div>

        {/* Search Box */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search FunByte Games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-14 py-4 rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-lg text-black dark:text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          />

          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </span>

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-xl"
            >
              ❌
            </button>
          )}
        </div>

        {/* Results Count */}
        {search && (
          <p className="mb-6 text-gray-500">
            About {results.length} result
            {results.length !== 1 && "s"} found
          </p>
        )}

        {/* Search Results */}
        {search ? (
          <>
            {results.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((game) => (
                  <div
                    key={game.path}
                    onClick={() => navigate(game.path)}
                    className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-200 dark:border-zinc-800 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all"
                  >
                    <div className="text-5xl mb-4">
                      {game.icon}
                    </div>

                    <h2 className="text-xl font-bold text-blue-600 mb-2">
                      {game.title}
                    </h2>

                    <p className="text-gray-500 mb-4">
                      {game.description}
                    </p>

                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl">
                      Play Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center mt-20">
                <div className="text-7xl mb-4">😕</div>

                <h2 className="text-2xl font-bold">
                  No Results Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try searching another game.
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Trending Section */}
            <h2 className="text-2xl font-bold mb-6">
              🔥 Trending Games
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingGames.map((game) => (
                <div
                  key={game.path}
                  onClick={() => navigate(game.path)}
                  className="cursor-pointer bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:shadow-xl transition"
                >
                  <div className="text-4xl mb-3">
                    {game.icon}
                  </div>

                  <h3 className="font-bold text-lg">
                    {game.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {game.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}