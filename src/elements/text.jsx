// navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavHorizontal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
];

  return (
    <div className="p-8 w-full bg-white dark:bg-black">
      {/* <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Horizontal Navigation
      </h3> */}

      <nav className="bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h2 className="text-xl font-bold text-gray-850 dark:text-white">
                  FunByte
                </h2>
                <h6 className="text-blue-600 dark:text-sky-400">
                  Fun Starts Here
                </h6>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => (
  <NavLink
    key={item.name}
    to={item.path}
    className={({ isActive }) =>
      `inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      }`
    }
  >
    {item.name}
  </NavLink>
))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* <button className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                 ▶ Play Now 
              </button> */}
              <button className="hidden md:block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                <NavLink to="/explore" className="ml-2">🎯 Explore </NavLink>
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-zinc-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
  <NavLink
    key={item.name}
    to={item.path}
    onClick={() => setIsMenuOpen(false)}
    className={({ isActive }) =>
      `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
        isActive
          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800"
      }`
    }
  >
    {item.name}
  </NavLink>
))}
              <div className="border-t border-gray-200 dark:border-zinc-800 pt-4 mt-4">
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <NavLink to="/explore" className="ml-2">🎯 Explore </NavLink>
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white mt-2"
                >
                    ▶ Play Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}


// home.jsx
export default function Home(){
  return(
    <>
  <section className="relative w-full h-screen bg-white dark:bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-black dark:to-purple-900/20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            🔥 Play New Mini Games & Beat Your High Scores →
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
           Welcome to 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              FunByte
            </span>
            <br />
            – Your Ultimate Mini Games Hub
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
           Jump into a world of fun with exciting games, No downloads, no waiting—just instant entertainment at your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Let's Play 
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-zinc-600 font-semibold rounded-lg transition-colors duration-200">
             🚀 Start Playing
            </button>
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
        </div>
      </div>

      <div className="absolute top-20 right-10 w-20 h-20 bg-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
    </section>
      </>
    )
  }

  //freatures.jsx
  import { NavLink } from "react-router-dom";

export default function Features() {
  const features = [
    {
      title: "Number Counter",
      description:
        "Get intelligent suggestions and automate repetitive tasks with our advanced AI technology.",
      image: "https://play-lh.googleusercontent.com/k2mR04q4mgZw0vcRlpaXTtP12ifYJFOryzYudLx4i8_sQvoIK_Vw3t9YKbJa0OmiWxwBEdUnZV3YX9tajQd-GFA=w600-h300-pc0xffffff-pd",
      badge: "New",
      badgeColor: "bg-green-500",
    },
    {
      title: "Tic Tac Toe",
      description:
        "Challenge your friends to a game of Tic Tac Toe and see who's the best!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKNKaKsJoO93z-1rtHLaDh1yxVQsHn5SuKLQ&s",
      badge: "Popular",
      badgeColor: "bg-blue-500",
    },
    {
      title: "Rock Paper Scissors",
      description:
        "Test your luck and strategy in this classic game of Rock Paper Scissors.",
      image: "https://static.vecteezy.com/system/resources/previews/010/307/906/non_2x/hands-playing-rock-paper-scissors-game-flat-design-style-illustration-vector.jpg",
      badge: null,
    },
    {
      title: "Quiz Game",
      description:
        "Challenge your knowledge with our fun and interactive quiz game, covering a wide range of topics!",
      image: "https://thumbs.dreamstime.com/b/quiz-logo-icon-vector-symbol-flat-cartoon-bubble-speeches-question-check-mark-signs-as-competition-game-interview-160701701.jpg",
      badge: "Beta",
      badgeColor: "bg-purple-500",
    },
    {
      title: "Guess the Number",
      description:
        "Test your guessing skills in this exciting number guessing game.",
      image: "https://play-lh.googleusercontent.com/HkBG-8GuBksC4nWLBWIuwqeAuIG-WNnNCOecLWKrm0MyzC9agQtvbMtwF_AEL4chFDQUPxAbdAetyT7S1hEm5Ik",
      badge: null,
    },
    {
      title: "Typing Speed Test",
      description:
        "Improve your typing skills and see how fast you can type with our fun typing speed test!",
      image: "https://play-lh.googleusercontent.com/hSuOQgMElmnsBMw-F5ZrqWSnpf3nZ2AmZPdNALD7G2CRKSxM8ia07ogmkIrAqHIvzKR5",
      badge: "Updated",
      badgeColor: "bg-orange-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎮 FunByte Games Collection
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore Our Fun Games
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {feature.badge && (
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white rounded-full ${feature.badgeColor}`}
                  >
                    {feature.badge}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Play Now
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            <NavLink to="/explore">Explore All Features</NavLink>
          </button>
        </div>
      </div>
    </section>
  );
}

//footer.jsx
import { NavLink } from "react-router-dom";

export default function Footer1() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              FunByte
            </h3>
            <p className="text-blue-600 dark:text-sky-400">Fun Starts Here</p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
             Play New Mini Games & Beat Your High Scores →
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            <NavLink
              to="/"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Home
            </NavLink>

           

            <NavLink
                to="/quiz"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Quiz Game
              </NavLink>

                <NavLink
                to="/rps"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                RPS Game
              </NavLink>

              <NavLink
                to="/tictac"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Tic Tac
              </NavLink>

              <NavLink
                to="/snakegame"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Snake Game
              </NavLink>

              <NavLink
                to="/typingspeed"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Typing Speed
              </NavLink>

              <NavLink
                to="/hangman"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Hangman
              </NavLink>

               {/* <NavLink
              to="/explore"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Explore
            </NavLink> */}

            {/* <NavLink
              to="/about"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Contact
            </NavLink> */}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 FunByte. All rights reserved.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Designed with ❤️ by Abhinav 
          </p>
        </div>

      </div>
    </footer>
  );
}