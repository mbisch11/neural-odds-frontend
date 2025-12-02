import { useEffect, useState } from "react"
import nbaLogo from "/nba_logo.png"
import nflLogo from "/public/nfl_logo.png"
import MatchupCard from "../components/matchupCard"
import type { GameDataNBA, GameDataNFL } from "../services/types"

function Homescreen() {
  const [sport, setSport] = useState<string>("")
  const [nbaGames, setNbaGames] = useState<GameDataNBA[]>([])
  const [nflGames, setNflGames] = useState<GameDataNFL[]>([])

  const apiUrl = import.meta.env.VITE_BACKEND_API_URL

  useEffect(() => {
    fetchSchedule()
  }, [])

  const fetchSchedule = async () => {
    console.log(apiUrl)
    const response = await fetch(`${apiUrl}/schedule/all`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    const sortedNflGames = data.NFL_games.sort(
      (a: GameDataNFL, b: GameDataNFL) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime(),
    )
    const sortedNbaGames = data.NBA_games.sort(
      (a: GameDataNBA, b: GameDataNBA) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime(),
    )
    setNflGames(sortedNflGames)
    setNbaGames(sortedNbaGames)
  }

  const allGames = [
    ...nbaGames.map((game) => ({ ...game, sport: "nba" })),
    ...nflGames.map((game) => ({ ...game, sport: "nfl" })),
  ].sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())

  return (
    <>
      <div className="flex flex-col items-center gap-4 p-8 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent pb-1.5">
          AI-Powered Sports Betting Analysis
        </h1>
        <p className="text-base md:text-lg text-center text-gray-400 max-w-2xl">
          Get data-driven picks and insights for NBA and NFL games. Our AI analyzes odds, trends, and matchups to help
          you make smarter betting decisions.
        </p>
      </div>

      <div id="sportSelection" className="flex flex-row items-center gap-5 p-8 pt-4">
        <div
          id="nbaBttn"
          onClick={() => setSport(sport == "nba" ? "" : "nba")}
          className={
            sport == "nba"
              ? "h-28 aspect-square transition-all duration-200 p-3.5 rounded-full bg-accent/75 items-center hover:cursor-pointer shadow-lg shadow-accent/50 border-2 border-accent/80"
              : "h-28 aspect-square transition-all duration-200 p-3.5 rounded-full bg-tertiary/25 items-center hover:cursor-pointer hover:bg-tertiary/50 shadow-md hover:shadow-lg border-2 border-tertiary/40 hover:border-secondary/30"
          }
        >
          <img
            src={nbaLogo || "/placeholder.svg"}
            className="mx-auto my-auto h-full w-full object-contain opacity-100"
          ></img>
        </div>
        <div
          id="nflBttn"
          onClick={() => setSport(sport == "nfl" ? "" : "nfl")}
          className={
            sport == "nfl"
              ? "h-28 aspect-square transition-all duration-200 p-3.5 rounded-full bg-accent/75 items-center hover:cursor-pointer shadow-lg shadow-accent/50 border-2 border-accent/80"
              : "h-28 aspect-square transition-all duration-200 p-3.5 rounded-full bg-tertiary/25 items-center hover:cursor-pointer hover:bg-tertiary/50 shadow-md hover:shadow-lg border-2 border-tertiary/40 hover:border-secondary/30"
          }
        >
          <img
            src={nflLogo || "/placeholder.svg"}
            className="mx-auto my-auto h-full w-full object-contain opacity-100"
          ></img>
        </div>
      </div>
      <div id="matchups" className="flex flex-col gap-4 p-3">
        {sport == "nba"
          ? nbaGames.map((game) => (
              <MatchupCard
                key={`${game.home_team}-${game.away_team}-${game.event_date}`}
                gameData={game}
                picks={game.nba_picks}
                homeTeamData={game.home_details}
                awayTeamData={game.away_details}
                sport="nba"
              />
            ))
          : sport == "nfl"
            ? nflGames.map((game) => (
                <MatchupCard
                  key={`${game.home_team}-${game.away_team}-${game.event_date}`}
                  gameData={game}
                  picks={game.nfl_picks}
                  homeTeamData={game.home_details}
                  awayTeamData={game.away_details}
                  sport="nfl"
                />
              ))
            : allGames.map((game) => (
                <MatchupCard
                  key={`${game.home_team}-${game.away_team}-${game.event_date}`}
                  gameData={game}
                  picks={game.sport === "nba" ? (game as GameDataNBA).nba_picks : (game as GameDataNFL).nfl_picks}
                  homeTeamData={game.home_details}
                  awayTeamData={game.away_details}
                  sport={game.sport}
                />
              ))}
      </div>
    </>
  )
}

export default Homescreen