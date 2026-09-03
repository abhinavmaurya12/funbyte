import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchBar from "./elements/SearchBar";
import './App.css'
import Navbar from "./elements/Navbar";
import Numbercount from "./elements/Numbercount";
import Tictac from "./elements/Tictac";
import Rps from "./elements/Rps";
import Quiz from "./elements/Quiz";
import Guessnum from "./elements/Guessnum";
import Home from "./elements/Home";
import Snake from "./elements/Snakegame";
import Typingspeed from "./elements/Typingspeed";
import Hangman from "./elements/Hangman";
import Explore from "./elements/explore";
import Footer from "./elements/footer";
import Features from "./elements/features";
import FlappyBird from "./elements/FlappyBird";
import Game2048 from "./elements/Game2048";
import CarRace from "./elements/CarRace";

function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Something went wrong.</p>
      </div>
    </div>
  );
}

let router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Features />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/numbercount",
    element: (
      <>
        <Navbar />
        <Numbercount />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/tictac",
    element: (
      <>
        <Navbar />
        <Tictac />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/rps",
    element: (
      <>
        <Navbar />
        <Rps />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/quiz",
    element: (
      <>
        <Navbar />
        <Quiz />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/guessnum",
    element: (
      <>
        <Navbar />
        <Guessnum />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/snakegame",
    element: (
      <>
        <Navbar />
        <Snake />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/typingspeed",
    element: (
      <>
        <Navbar />
        <Typingspeed />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/hangman",
    element: (
      <>
        <Navbar />
        <Hangman />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/flappybird",
    element: (
      <>
        <Navbar />
        <FlappyBird />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/explore",
    element: (
      <>
        <Navbar />
        <Explore />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/game2048",
    element: (
      <>
        <Navbar />
        <Game2048 />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/carrace",
    element: (
      <>
        <Navbar />
        <CarRace />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/searchbar",
    element: (
      <>
        <Navbar />
        <SearchBar />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />
  }
], { basename: "/funbyte" });

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
