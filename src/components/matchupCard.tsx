import { useEffect, useState } from "react";
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
export default MatchupCard;