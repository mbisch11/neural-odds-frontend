import "./App.css"
import { Routes, Route, Link } from "react-router-dom"
import Homescreen from "./pages/homescreen"
import GameDetail from "./pages/gameDetail"
import longLogo from "/NeuralOdds_logo_long_transparent.png"

function App() {
  return (
    <>
      <div id="header" className="w-screen h-24 bg-tertiary position-fixed flex flex-row justify-between items-center">
        <div id="leftSide" className="flex flex-row h-[calc(100%)] px-4 sm:px-6 py-3 overflow-hidden">
          <Link to="/" className="flex items-center max-w-[150px] sm:max-w-none">
            <img
              src={longLogo || "/placeholder.svg"}
              className="h-full w-auto object-contain hover:opacity-80 transition-opacity"
              alt="NeuralOdds Logo"
            />
          </Link>
        </div>
        <div id="rightSide" className="flex flex-row px-4 sm:px-6 py-3">
        </div>
      </div>
      <div id="mainBody">
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/game/:sport/:homeTeam/:awayTeam/:date" element={<GameDetail />} />
        </Routes>
      </div>
    </>
  )
}

export default App
