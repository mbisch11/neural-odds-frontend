import { useEffect, useState } from "react";
import nbaLogo from "/nba_logo.png";
import nflLogo from "/public/nfl_logo.png";
import MatchupCard from "../components/matchupCard";
import type { GameDataNBA, GameDataNFL } from "../services/types";

function Homescreen(){
    const [sport, setSport] = useState<string>("");
    const [nbaGames, setNbaGames] = useState<GameDataNBA[]>([]); 
    const [nflGames, setNflGames] = useState<GameDataNFL[]>([]); 

    const apiUrl = import.meta.env.BACKEND_API_URL

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        console.log(apiUrl);
        const response = await fetch(`${apiUrl}/schedule/all`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setNflGames(data.NFL_games);
        setNbaGames(data.NBA_games);        
    }

    return (
        <>
            <div id="sportSelection" className="flex flex-row items-center gap-5 p-8">
                <div id="nbaBttn" 
                    onClick={() => setSport(sport == "nba" ? "" : "nba")} 
                    className={
                        sport == "nba" 
                        ? "h-28 aspect-square transition-all duration-200 p-3.5 rounded-full bg-accent/75 items-center hover:cursor-pointer" 
                        : "h-28 aspect-square transition-all duration-200 p-3.5 rounded-full bg-tertiary/25 items-center hover:cursor-pointer hover:bg-tertiary/50"
                    }
                >
                    <img src={nbaLogo} className="mx-auto my-auto h-full w-full object-contain opacity-100"></img>
                </div>
                <div id="nflBttn" 
                    onClick={() => setSport(sport == "nfl" ? "" : "nfl")} 
                    className={
                        sport == "nfl" 
                        ? "h-28 aspect-square transition-all duration-200 p-3.5 rounded-full bg-accent/75 items-center hover:cursor-pointer" 
                        : "h-28 aspect-square transition-all duration-200 p-3.5 rounded-full bg-tertiary/25 items-center hover:cursor-pointer hover:bg-tertiary/50"
                    }
                >
                    <img src={nflLogo} className="mx-auto my-auto h-full w-full object-contain opacity-100"></img>
                </div>
            </div>
            <div id="matchups" className="flex flex-col gap-4 p-3">
                {sport == "nba" ? nbaGames.map(game => (
                    <MatchupCard key={`${game.home_team}-${game.away_team}-${game.event_date}`} gameData={game} picks={game.nba_picks} homeTeamData={game.home_details} awayTeamData={game.away_details} />
                )) : sport == "nfl" ? nflGames.map(game => (
                    <MatchupCard key={`${game.home_team}-${game.away_team}-${game.event_date}`} gameData={game} picks={game.nfl_picks} homeTeamData={game.home_details} awayTeamData={game.away_details} />
                )) : null}
            </div>
        </>
    )
}

export default Homescreen;