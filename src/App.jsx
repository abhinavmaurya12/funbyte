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
import Explore from "./elements/Explore";
import Footer from "./elements/Footer";
import Features from "./elements/features";
import FlappyBird from "./elements/FlappyBird";
import Game2048 from "./elements/Game2048";
import CarRace from "./elements/CarRace";
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
    )
  },
  {
    path: "/numbercount",
    element: (
      <>
        <Navbar />
        <Numbercount />
        <Footer />
      </>
    )
  },
  {
    path: "/tictac",
    element: (
      <>
        <Navbar />
        <Tictac />
        <Footer />
      </>
    )
  },
  {
    path: "/rps",
    element: (
      <>
        <Navbar />
        <Rps />
        <Footer />
      </>
    )
  },
  {
    path: "/quiz",
    element: (
      <>
        <Navbar />
        <Quiz />
        <Footer />
      </>
    )
  },
  {
    path: "/guessnum",
    element: (
      <>
        <Navbar />
        <Guessnum />
        <Footer />
      </>
    )
  },
  {
    path: "/snakegame",
    element: (
      <>
        <Navbar />
        <Snake />
        <Footer />
      </>
    )
  },
  {
    path: "/typingspeed",
    element: (
      <>
        <Navbar />
        <Typingspeed />
        <Footer />
      </>
    )
  },
  {
    path: "/hangman",
    element: (
      <>
        <Navbar />
        <Hangman />
        <Footer />
      </>
    )
  },
  {
    path: "/flappybird",
    element: (
      <>
        <Navbar />
        <FlappyBird />
        <Footer />
      </>
    )
  },
  {
    path: "/explore",
    element: (
      <>
        <Navbar />
        <Explore />
        <Footer />
      </>
    )
  },
  {
    path: "/game2048",
    element: (
      <>
        <Navbar />
        <Game2048 />
        <Footer />
      </>
    )
  },
  {
    path: "/carrace",
    element: (
      <>
        <Navbar />
        <CarRace />
        <Footer />
      </>
    )
  },
  {
    path: "/searchbar",
    element: (
      <>
        <Navbar />
        <SearchBar />
        <Footer />
      </>
    )
  }

]);

function App() {

  return (
    <>
     <RouterProvider router={router} />
    




    </>
  )
}

export default App
