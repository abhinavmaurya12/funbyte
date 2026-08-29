import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Games 1.0
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li><NavLink to="/tictac">Tic Tac Toe</NavLink></li>
              <li><NavLink to="/guessnum">Number Guess</NavLink></li>
              <li><NavLink to="/quiz">Quiz Challenge</NavLink></li>
              <li><NavLink to="/flappybird">Flappy Bird</NavLink></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Games 2.0
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li><NavLink to="/game2048">Game2048</NavLink></li>
              <li><NavLink to="/snakegame">Snake</NavLink></li>
              <li><NavLink to="/hangman">Hangman</NavLink></li>
              <li><NavLink to="/rps">Rock Paper Scissors</NavLink></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Games 3.0
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li><NavLink to="/typingspeed">Typing Speed Test</NavLink></li>
              <li><NavLink to="/numbercount">Number Counter</NavLink></li>
              <li><NavLink to="/carrace">Car Race</NavLink></li>
              <li><NavLink to="/">Coming Soon...more games!</NavLink></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li><NavLink to="/">Terms and Conditions</NavLink></li>
              <li><NavLink to="/">Privacy Policy</NavLink></li>
              <li><NavLink to="/">Game Updates</NavLink></li>
              <li><NavLink to="/">FAQ</NavLink></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-zinc-800 mt-12 pt-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FunByte 🎮
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                FunByte — Where Every Byte Brings Fun! 🎮
              </p>
            </div>

            <div className="flex gap-6 text-gray-500 dark:text-gray-400">
               <a
                href="#"
                className="hover:text-blue-600 transition"
              >
               Home
              </a>

              <a
                href="https://github.com/abhinavmaurya12"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600 transition"
              >
                GitHub
              </a>

             

              <a
                href="#"
                className="hover:text-blue-600 transition"
              >
               Suggestions
              </a>

              <a
                href="#"
                className="hover:text-blue-600 transition"
              >
               Add your game
              </a>
            </div>

          </div>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400" >
            © 2026 FunByte. All rights reserved. 🎮
            <br />
            Made with ❤️ by Abhinav Maurya
          </div>

        </div>
      </div>
    </footer>
  );
}