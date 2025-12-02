import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import type { GameDataNBA, GameDataNFL, GamePicks, TeamDetails } from "../services/types"

function GameDetail() {
  const { sport, homeTeam, awayTeam, date } = useParams()
  const navigate = useNavigate()
  const [gameData, setGameData] = useState<GameDataNBA | GameDataNFL | null>(null)
  const [picks, setPicks] = useState<GamePicks | null>(null)
  const [homeTeamData, setHomeTeamData] = useState<TeamDetails | null>(null)
  const [awayTeamData, setAwayTeamData] = useState<TeamDetails | null>(null)
  const [loading, setLoading] = useState(true)

  const apiUrl = import.meta.env.VITE_BACKEND_API_URL

  useEffect(() => {
    fetchGameDetails()
  }, [sport, homeTeam, awayTeam, date])

  const fetchGameDetails = async () => {
    try {
      const response = await fetch(`${apiUrl}/schedule/all`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()

      const games = sport === "nba" ? data.NBA_games : data.NFL_games
      const game = games.find(
        (g: any) =>
          g.home_team === homeTeam && g.away_team === awayTeam && new Date(g.event_date).toISOString() === date,
      )

      if (game) {
        setGameData(game)
        setPicks(sport === "nba" ? game.nba_picks : game.nfl_picks)
        setHomeTeamData(game.home_details)
        setAwayTeamData(game.away_details)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching game details:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-white">Loading...</div>
      </div>
    )
  }

  if (!gameData || !picks || !homeTeamData || !awayTeamData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-xl text-white">Game not found</div>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-accent text-black rounded-lg hover:bg-accent/80 transition-colors"
        >
          Back to Home
        </button>
      </div>
    )
  }

  const matchTime = new Date(gameData.event_date).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-6xl">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4 sm:mb-6 mx-auto sm:mx-0"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Games</span>
      </button>

      <div className="bg-tertiary rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-xl border border-secondary/20">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xs sm:text-sm text-secondary/70 font-bold mb-2">{matchTime}</h2>
          <div className="text-xs text-secondary/50 uppercase tracking-wider">{sport?.toUpperCase()}</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
          <div className="flex-1 w-full sm:w-auto flex flex-col items-center gap-2 sm:gap-3">
            <img
              src={awayTeamData.team_badge || "/placeholder.svg"}
              className="w-16 h-16 sm:w-24 sm:h-24 object-contain drop-shadow-lg"
              alt={awayTeamData.name}/>
            <h1 className="text-lg sm:text-2xl font-bold text-white text-center">{awayTeamData.name}</h1>
            <div className="text-xs sm:text-sm text-secondary/60">{awayTeamData.location}</div>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-accent">VS</div>

          <div className="flex-1 w-full sm:w-auto flex flex-col items-center gap-2 sm:gap-3">
            <img
              src={homeTeamData.team_badge || "/placeholder.svg"}
              className="w-16 h-16 sm:w-24 sm:h-24 object-contain drop-shadow-lg"
              alt={homeTeamData.name}
            />
            <h1 className="text-lg sm:text-2xl font-bold text-white text-center">{homeTeamData.name}</h1>
            <div className="text-xs sm:text-sm text-secondary/60">{homeTeamData.location}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="bg-tertiary rounded-xl overflow-hidden shadow-xl border border-secondary/20">
          <div className="bg-secondary/10 px-4 sm:px-6 py-3 sm:py-4 border-b border-secondary/20">
            <h3 className="text-lg sm:text-xl font-bold text-white">Spread Market</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div
                className={`p-3 sm:p-4 rounded-lg border-2 ${picks.spread_pick === "away" ? "bg-accent/20 border-accent" : "bg-gray-700/30 border-secondary/20"}`}
              >
                <div className="text-xs sm:text-sm text-secondary/70 mb-1">{awayTeamData.name}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-white">{gameData.away_handicap}</span>
                  <span className="text-lg sm:text-xl font-semibold text-white">{gameData.away_odds_spread}</span>
                </div>
                {picks.spread_pick === "away" && (
                  <div className="mt-2 text-xs sm:text-sm font-semibold text-accent">AI Pick ✓</div>
                )}
              </div>
              <div
                className={`p-3 sm:p-4 rounded-lg border-2 ${picks.spread_pick === "home" ? "bg-accent/20 border-accent" : "bg-gray-700/30 border-secondary/20"}`}
              >
                <div className="text-xs sm:text-sm text-secondary/70 mb-1">{homeTeamData.name}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-white">{gameData.home_handicap}</span>
                  <span className="text-lg sm:text-xl font-semibold text-white">{gameData.home_odds_spread}</span>
                </div>
                {picks.spread_pick === "home" && (
                  <div className="mt-2 text-xs sm:text-sm font-semibold text-accent">AI Pick ✓</div>
                )}
              </div>
            </div>
            <div className="bg-secondary/10 rounded-lg p-3 sm:p-4">
              <h4 className="text-xs sm:text-sm font-bold text-accent mb-2">AI Analysis</h4>
              <p className="text-xs sm:text-sm text-white leading-relaxed">{picks.spread_rationale}</p>
            </div>
          </div>
        </div>

        <div className="bg-tertiary rounded-xl overflow-hidden shadow-xl border border-secondary/20">
          <div className="bg-secondary/10 px-4 sm:px-6 py-3 sm:py-4 border-b border-secondary/20">
            <h3 className="text-lg sm:text-xl font-bold text-white">Totals Market</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div
                className={`p-3 sm:p-4 rounded-lg border-2 ${picks.total_pick === true ? "bg-accent/20 border-accent" : "bg-gray-700/30 border-secondary/20"}`}>
                <div className="text-xs sm:text-sm text-secondary/70 mb-1">Over</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-white">O {gameData.over_under_total}</span>
                  <span className="text-lg sm:text-xl font-semibold text-white">{gameData.over_odd}</span>
                </div>
                {picks.total_pick === true && (
                  <div className="mt-2 text-xs sm:text-sm font-semibold text-accent">AI Pick ✓</div>
                )}
              </div>
              <div
                className={`p-3 sm:p-4 rounded-lg border-2 ${picks.total_pick === false ? "bg-accent/20 border-accent" : "bg-gray-700/30 border-secondary/20"}`}>
                <div className="text-xs sm:text-sm text-secondary/70 mb-1">Under</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-white">U {gameData.over_under_total}</span>
                  <span className="text-lg sm:text-xl font-semibold text-white">{gameData.under_odd}</span>
                </div>
                {picks.total_pick === false && (
                  <div className="mt-2 text-xs sm:text-sm font-semibold text-accent">AI Pick ✓</div>
                )}
              </div>
            </div>
            <div className="bg-secondary/10 rounded-lg p-3 sm:p-4">
              <h4 className="text-xs sm:text-sm font-bold text-accent mb-2">AI Analysis</h4>
              <p className="text-xs sm:text-sm text-white leading-relaxed">{picks.total_rationale}</p>
            </div>
          </div>
        </div>

        <div className="bg-tertiary rounded-xl overflow-hidden shadow-xl border border-secondary/20">
          <div className="bg-secondary/10 px-4 sm:px-6 py-3 sm:py-4 border-b border-secondary/20">
            <h3 className="text-lg sm:text-xl font-bold text-white">Moneyline Market</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div
                className={`p-3 sm:p-4 rounded-lg border-2 ${picks.moneyline_pick === "away" ? "bg-accent/20 border-accent" : "bg-gray-700/30 border-secondary/20"}`}
              >
                <div className="text-xs sm:text-sm text-secondary/70 mb-1">{awayTeamData.name}</div>
                <div className="text-xl sm:text-2xl font-bold text-white">{gameData.away_odds_ml}</div>
                {picks.moneyline_pick === "away" && (
                  <div className="mt-2 text-xs sm:text-sm font-semibold text-accent">AI Pick ✓</div>
                )}
              </div>
              <div
                className={`p-3 sm:p-4 rounded-lg border-2 ${picks.moneyline_pick === "home" ? "bg-accent/20 border-accent" : "bg-gray-700/30 border-secondary/20"}`}
              >
                <div className="text-xs sm:text-sm text-secondary/70 mb-1">{homeTeamData.name}</div>
                <div className="text-xl sm:text-2xl font-bold text-white">{gameData.home_odds_ml}</div>
                {picks.moneyline_pick === "home" && (
                  <div className="mt-2 text-xs sm:text-sm font-semibold text-accent">AI Pick ✓</div>
                )}
              </div>
            </div>
            <div className="bg-secondary/10 rounded-lg p-3 sm:p-4">
              <h4 className="text-xs sm:text-sm font-bold text-accent mb-2">AI Analysis</h4>
              <p className="text-xs sm:text-sm text-white leading-relaxed">{picks.moneyline_rationale}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetail