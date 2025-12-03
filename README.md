# NeuralOdds — AI-Powered Sports Betting Insights

NeuralOdds is a full-stack sports analytics platform that provides AI-informed betting recommendations based on historical data, recent news, sportsbook odds, and automated nightly schedule updates.

This project consists of two repositories:

Frontend (React + Vite + Tailwind): https://github.com/mbisch11/neural-odds-frontend

Backend (Node.js + Express + Supabase): https://github.com/mbisch11/neural-odds-backend

## Features

 - AI-generated predictions for Moneyline, Spread, and Totals
 - Automated nightly ingestion of NBA/NFL schedules and odds
 - Full Supabase integration for data storage
 - Simple and responsive UI
 - Modular backend supporting multiple leagues
 - Designed for future machine learning model integration

## Project Structure
```
neural-odds/
├── frontend/     # React client (Vite + TypeScript)
└── backend/      # Node.js API server + Supabase logic
```
## Backend Setup
### Requirements

 - Node 18+
 - Supabase project
 - Apify API key
 - .env file containing required secrets

### Installation
```
cd neural-odds-backend
npm install
```
### Running Locally
```
npm run dev
```
### Environment Variables

Create a `.env` file with:
```
SUPABASE_URL=your-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
APIFY_TOKEN=your-apify-token
PORT=5001
```
### API Endpoints (Simplified)
| Method |	Endpoint |	Description |
| :----- | :-------: | -----------: |
| GET |	/cron/nba-schedule |	Fetches and stores NBA games |
| GET |	/cron/nfl-schedule |	Fetches and stores NFL games |
| GET |	/games/:league |	Returns combined schedule + odds |
| GET |	/picks/:league |	Returns AI-generated predictions |

## Frontend Setup
### Requirements

 - Node 18+
 - Vite
 - TailwindCSS

### Installation
```
cd neural-odds-frontend
npm install
```
### Running Locally
```
npm run dev
```
### Environment Variables

Vite requires variables prefixed with VITE_.

Create .env:
```
VITE_BACKEND_URL=http://localhost:5001
```
### Connecting to Backend

Example fetch usage:
```
fetch(`${import.meta.env.VITE_BACKEND_URL}/games/nba`)
  .then(res => res.json())
  .then(data => console.log(data));
```
### Database Overview (Supabase)

 - Primary tables used:
 - nba_games, nfl_games
 - nba_picks, nfl_picks
 - nba_teams, nfl_teams

Each game record includes team identifiers, event date, moneyline odds, spread, total, and metadata.

RLS policies must allow inserts via the service role key.

## Deployment
### Frontend

Built and deployed through Vercel.

### Backend

Can be deployed on Vercel, Railway, Render, or any Node-compatible environment.
Cron endpoints can be triggered by Vercel Scheduled Jobs or an external cron service.
