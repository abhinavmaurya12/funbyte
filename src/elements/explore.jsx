import { NavLink } from "react-router-dom";

export default function Explore() {
  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-blue-600 p-8 rounded-3xl shadow-2xl w-full max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Explore FunByte Games
          </h1>
          <p className="text-white text-xl mb-6">
            Dive into a world of fun and challenge with our collection of games! Whether you're in the mood for a quick quiz, a strategic tic-tac-toe match, or a classic hangman challenge, FunByte has something for everyone. Click on any game below to start playing and test your skills!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <NavLink to="/quiz" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Quiz Game
            </NavLink>
            <NavLink to="/rps" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Rock Paper Scissors
            </NavLink>
            <NavLink to="/numbercount" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Number Counter
            </NavLink>
            <NavLink to="/typingspeed" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Typing Speed Test
            </NavLink>
            <NavLink to="/hangman" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Hangman
            </NavLink>
            <NavLink to="/snakegame" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Snake Game
            </NavLink>
            <NavLink to="/game2048" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Game 2048
            </NavLink>
            <NavLink to="/spinwheel" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Spin the Wheel
            </NavLink>
            <NavLink to="/tictac" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Tic Tac Toe
            </NavLink>
            <NavLink to="/flappybird" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Flappy Bird
            </NavLink>
            <NavLink to="/guessnum" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Guess the Number
            </NavLink>
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
    
