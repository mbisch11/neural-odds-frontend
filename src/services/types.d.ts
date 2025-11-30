export interface TeamDetails {
    name: string;
    stadium: string;
    team_id: string;
    location: string;
    team_logo: string;
    team_badge: string;
    team_equipment: string;
}
export interface GamePicks {
    away_team: string; 
    home_team: string; 
    total_pick: boolean;
    spread_pick: 'home' | 'away';
    moneyline_pick: 'home' | 'away';
    total_rationale: string;
    spread_rationale: string;
    moneyline_rationale: string;
}
export interface GameDataNBA {
    home_team: string;
    away_team: string;
    event_date: Date;
    
    home_odds_ml: string;
    away_odds_ml: string;
    
    home_handicap: string;
    away_handicap: string;
    
    home_odds_spread: string;
    away_odds_spread: string;
    
    over_under_total: string;
    over_odd: string;
    under_odd: string;

    nba_picks: GamePicks;
    home_details: TeamDetails;
    away_details: TeamDetails;
}
export interface GameDataNFL {
    home_team: string;
    away_team: string;
    event_date: Date;
    
    home_odds_ml: string;
    away_odds_ml: string;
    
    home_handicap: string;
    away_handicap: string;
    
    home_odds_spread: string;
    away_odds_spread: string;
    
    over_under_total: string;
    over_odd: string;
    under_odd: string;

    nfl_picks: GamePicks;
    home_details: TeamDetails;
    away_details: TeamDetails;
}