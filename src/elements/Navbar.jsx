import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavHorizontal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Number Count", path: "/numbercount" },
    { name: "Tic Tac", path: "/tictac" },
    { name: "RPS Game", path: "/rps" },
    { name: "Quiz Game", path: "/quiz" },
    { name: "Guess Number", path: "/guessnum" },
    { name: "Snake Game", path: "/snakegame" },
    { name: "Typing Speed", path: "/typingspeed" },
    { name: "Hangman", path: "/hangman" },
    { name: "CarRace", path: "/carrace" }
  ];

  const filteredItems = navItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-white dark:bg-black px-4 py-3">
      <nav className="max-w-7xl mx-auto bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              FunByte 🎮
            </h2>
            <p className="text-xs text-blue-600 dark:text-sky-400">
              Fun Starts Here
            </p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search Bar */}



            {/* Nav Links */}
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

<NavLink
  to="/searchbar"
  className="flex items-center gap-3 px-4 py-2 rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-300 hover:shadow-lg hover:border-blue-500 transition-all duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
    />
  </svg>

  <span>FunByte search best</span>

  {/* <kbd className="hidden md:block px-2 py-1 text-xs rounded bg-gray-100 dark:bg-zinc-800">
    Ctrl K
  </kbd> */}
</NavLink>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-500"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-zinc-800 py-4">
            {/* Mobile Search */}

<NavLink
  to="/searchbar"
  onClick={() => setIsMenuOpen(false)}
  className="block w-full mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
>
  <div className="flex items-center gap-3">
    <span className="text-2xl">🔍</span>

    <div>
      <h3 className="font-bold">Search FunByte</h3>
      <p className="text-sm text-white/80">
        Find games instantly
      </p>
    </div>
  </div>
</NavLink>

            <div className="space-y-2">
              {(searchTerm ? filteredItems : navItems).map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setSearchTerm("");
                  }}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}