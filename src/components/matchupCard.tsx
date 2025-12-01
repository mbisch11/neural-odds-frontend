import { useEffect, useState } from "react"
import type { GamePicks, TeamDetails } from "../services/types"

interface matchupCardProps {
  gameData: any
  picks: GamePicks
  homeTeamData: TeamDetails
  awayTeamData: TeamDetails
}

function MatchupCard(props: matchupCardProps) {
    const [gameData] = useState<any>(props.gameData)
    const [picks] = useState<GamePicks>(props.picks)
    const [homeTeamData] = useState<TeamDetails>(props.homeTeamData)
    const [awayTeamData] = useState<TeamDetails>(props.awayTeamData)

    useEffect(() => {
    })

    const matchTime = new Date(gameData.event_date).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })

  return (
    <>
      <div className="bg-tertiary rounded-xl flex flex-col overflow-hidden shadow-xl border border-secondary/20 hover:shadow-3xl hover:border-secondary/30 transition-all duration-200">

        {/* Betting grid */}
        <div className="flex flex-col">
          {/* Column headers */}
          <div className="flex border-b border-secondary/10">
            <div className="w-1/3 flex justify-between items-center px-4 py-2 border-b border-secondary/10">
                <h3 className="text-sm text-secondary/70 font-bold">{matchTime}</h3>
            </div>
            {/* Header with time */}
            <div className="w-[22.22%] text-center py-2 text-xs font-semibold text-secondary/60 border-l border-secondary/10">
              Spread
            </div>
            <div className="w-[22.22%] text-center py-2 text-xs font-semibold text-secondary/60 border-l border-secondary/10">
              Total
            </div>
            <div className="w-[22.22%] text-center py-2 text-xs font-semibold text-secondary/60 border-l border-secondary/10">
              Moneyline
            </div>
          </div>

          {/* Home team row */}
          <div className="flex border-b border-secondary/10">
            {/* Team info */}
            <div className="w-1/3 flex items-center gap-3 px-3 py-3">
              <img
                src={homeTeamData.team_badge || "/placeholder.svg"}
                className="w-10 h-10 object-contain drop-shadow-md shrink-0"
                alt={homeTeamData.name}
              />
              <div className="flex flex-col min-w-0">
                <h3 className="text-base font-bold truncate text-white">{homeTeamData.name}</h3>
              </div>
            </div>

            {/* Spread */}
            <div
              className={`w-[22.22%] flex flex-col items-center justify-center border-l border-secondary/10 cursor-pointer transition-all duration-150 ${
                picks.spread_pick == "home"
                  ? "bg-accent text-black shadow-md"
                  : "bg-gray-700/30 text-white hover:bg-gray-700/40"
              }`}
            >
              <div className="text-sm font-bold">{gameData.home_handicap}</div>
              <div
                className={`text-lg font-extrabold ${picks.spread_pick == "home" ? "text-black" : "text-green-400"}`}
              >
                {gameData.home_odds_spread}
              </div>
            </div>

            {/* Over */}
            <div
              className={`w-[22.22%] flex flex-col items-center justify-center border-l border-secondary/10 cursor-pointer transition-all duration-150 ${
                picks.total_pick == true
                  ? "bg-accent text-black shadow-md"
                  : "bg-gray-700/30 text-white hover:bg-gray-700/40"
              }`}
            >
              <div className="text-sm font-bold">O {gameData.over_under_total}</div>
              <div className={`text-lg font-extrabold ${picks.total_pick == true ? "text-black" : "text-green-400"}`}>
                {gameData.over_odd}
              </div>
            </div>

            {/* Moneyline */}
            <div
              className={`w-[22.22%] flex flex-col items-center justify-center border-l border-secondary/10 cursor-pointer transition-all duration-150 ${
                picks.moneyline_pick == "home"
                  ? "bg-accent text-black shadow-md"
                  : "bg-gray-700/30 text-white hover:bg-gray-700/40"
              }`}
            >
              <div
                className={`text-lg font-extrabold ${picks.moneyline_pick == "home" ? "text-black" : "text-green-400"}`}
              >
                {gameData.home_odds_ml}
              </div>
            </div>
          </div>

          {/* Away team row */}
          <div className="flex">
            {/* Team info */}
            <div className="w-1/3 flex items-center gap-3 px-3 py-3">
              <img
                src={awayTeamData.team_badge || "/placeholder.svg"}
                className="w-10 h-10 object-contain drop-shadow-md shrink-0"
                alt={awayTeamData.name}
              />
              <div className="flex flex-col min-w-0">
                <h3 className="text-base font-bold truncate text-white">{awayTeamData.name}</h3>
              </div>
            </div>

            {/* Spread */}
            <div
              className={`w-[22.22%] flex flex-col items-center justify-center border-l border-secondary/10 cursor-pointer transition-all duration-150 ${
                picks.spread_pick == "away"
                  ? "bg-accent text-black shadow-md"
                  : "bg-gray-700/30 text-white hover:bg-gray-700/40"
              }`}
            >
              <div className="text-sm font-bold">{gameData.away_handicap}</div>
              <div
                className={`text-lg font-extrabold ${picks.spread_pick == "away" ? "text-black" : "text-green-400"}`}
              >
                {gameData.away_odds_spread}
              </div>
            </div>

            {/* Under */}
            <div
              className={`w-[22.22%] flex flex-col items-center justify-center border-l border-secondary/10 cursor-pointer transition-all duration-150 ${
                picks.total_pick == false
                  ? "bg-accent text-black shadow-md"
                  : "bg-gray-700/30 text-white hover:bg-gray-700/40"
              }`}
            >
              <div className="text-sm font-bold">U {gameData.over_under_total}</div>
              <div className={`text-lg font-extrabold ${picks.total_pick == false ? "text-black" : "text-green-400"}`}>
                {gameData.under_odd}
              </div>
            </div>

            {/* Moneyline */}
            <div
              className={`w-[22.22%] flex flex-col items-center justify-center border-l border-secondary/10 cursor-pointer transition-all duration-150 ${
                picks.moneyline_pick == "away"
                  ? "bg-accent text-black shadow-md"
                  : "bg-gray-700/30 text-white hover:bg-gray-700/40"
              }`}
            >
              <div
                className={`text-lg font-extrabold ${picks.moneyline_pick == "away" ? "text-black" : "text-green-400"}`}
              >
                {gameData.away_odds_ml}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default MatchupCard




/*import { useEffect, useState } from "react";
import type { GamePicks, TeamDetails } from "../services/types";

interface matchupCardProps {
    gameData : any,
    picks : GamePicks,
    homeTeamData : TeamDetails,
    awayTeamData : TeamDetails
}

function MatchupCard(props : matchupCardProps){
    const [gameData] = useState<any>(props.gameData);
    const [picks] = useState<GamePicks>(props.picks);
    const [homeTeamData] = useState<TeamDetails>(props.homeTeamData);
    const [awayTeamData] = useState<TeamDetails>(props.awayTeamData);

    useEffect(() => {
        console.log(props);
    })

    const matchTime = gameData.event_date.toLocaleString();

    return(
        <>
            <div className="bg-tertiary rounded-2xl flex flex-col h-fit p-2.5 gap-2">
                <div id="topRow" className="flex flex-row gap-2">
                    <div id="homeTeam" className="gap-3 flex flex-row w-1/3 p-2">
                        <img src={homeTeamData.team_badge} className="w-8 aspect-square"></img>
                        <h3 className="md:text-xl mobile:text-lg">{homeTeamData.name}</h3>
                    </div>
                    <div id="homeML" className={`w-2/9 rounded-tl-2xl ${picks.moneyline_pick == 'home' ? "bg-accent text-black" : "bg-gray-300/45 text-white"}`}>
                        <h3 className="md:text-xl mobile:text-lg">Moneyline</h3>
                        <h3 className="md:text-xl mobile:text-lg">{gameData.home_odds_ml}</h3>
                    </div>
                    <div id="homeSpread" className={`w-2/9 ${picks.spread_pick == 'home' ? "bg-accent text-black" : "bg-gray-300/45 text-white"}`}>
                        <h3 className="md:text-xl mobile:text-lg">{gameData.home_handicap}</h3>
                        <h3 className="md:text-xl mobile:text-lg">{gameData.away_odds_spread}</h3>
                    </div>
                    <div id="over" className={`w-2/9 rounded-tr-2xl ${picks.total_pick == true ? "bg-accent text-black" : "bg-gray-300/45 text-white"}`}>
                        <h3 className="md:text-xl mobile:text-lg">Over {gameData.over_under_total}</h3>
                        <h3 className="md:text-xl mobile:text-lg">{gameData.over_odd}</h3>
                    </div> 
                </div>
                <div id="bottomRow" className="flex flex-row gap-2">
                    <div id="awayTeam" className="gap-3 flex flex-row w-1/3 p-2">
                        <img src={awayTeamData.team_badge} className="w-8 aspect-square"></img>
                        <h3 className="md:text-xl mobile:text-lg">{awayTeamData.name}</h3>
                    </div>
                    <div id="awayML" className={`w-2/9 rounded-bl-2xl ${picks.moneyline_pick == 'away' ? "bg-accent text-black" : "bg-gray-300/45 text-white"}`}>
                        <h3 className="md:text-xl mobile:text-lg">Moneyline</h3>
                        <h3 className="md:text-xl mobile:text-lg">{gameData.away_odds_ml}</h3>
                    </div>
                    <div id="awaySpread" className={`w-2/9 ${picks.spread_pick == 'away' ? "bg-accent text-black" : "bg-gray-300/45 text-white"}`}>
                        <h3 className="md:text-xl mobile:text-lg">{gameData.away_handicap}</h3>
                        <h3 className="md:text-xl mobile:text-lg">{gameData.away_odds_spread}</h3>
                    </div>
                    <div id="under" className={`w-2/9 rounded-br-2xl ${picks.total_pick == false ? "bg-accent text-black" : "bg-gray-300/45 text-white"}`}>
                        <h3 className="md:text-xl mobile:text-lg">Under {gameData.over_under_total}</h3>
                        <h3 className="md:text-xl mobile:text-lg">{gameData.under_odd}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MatchupCard;*/