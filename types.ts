
export interface FormResult {
  result: 'W' | 'D' | 'L';
  opponentLogo: string;
  score: string;
  isHome: boolean;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string; // e.g. "GK", "CB", "ST"
  imageUrl: string;
  isCaptain?: boolean;
  rating?: number;
  seasonStats?: {
    goals?: number;
    assists?: number;
    shotsPerGame?: number;
    passAccuracy?: number;
    tacklesPerGame?: number;
    interceptions?: number;
    cleanSheets?: number;
    saves?: number;
    [key: string]: number | undefined;
  };
}

export interface Manager {
  id: string;
  name: string;
  imageUrl: string;
}

export interface TeamLineup {
  formation: string; // e.g. "4-3-3", "4-2-3-1"
  isConfirmed: boolean;
  starting: Player[];
  bench: Player[];
  manager: Manager;
}

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  score: number;
  form: FormResult[]; // Last 5 games with opponent info
  lineup?: TeamLineup;
}

export interface MatchStats {
  homePossession: number;
  awayPossession: number;
  homeShots: number;
  awayShots: number;
  homeOnTarget: number;
  awayOnTarget: number;
  homeCorners: number;
  awayCorners: number;
  homeYellowCards: number;
  awayYellowCards: number;
  homeRedCards: number;
  awayRedCards: number;
  homeAttacks: number; // Dangerous Attacks
  awayAttacks: number;
}

export interface MatchEvent {
  id: string;
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'PENALTY_SCORED' | 'PENALTY_MISSED';
  minute: number;
  teamId: string;
  playerName: string;
}

export interface Match {
  id: string;
  league: string;
  date: string; // New Date Field
  time: string; // e.g., "64'" or "20:00"
  isLive: boolean;
  isFavorite: boolean; // UI State
  homeTeam: Team;
  awayTeam: Team;
  momentum: number; // -100 (Away Domination) to 100 (Home Domination)
  momentumHistory: number[]; // History of momentum values for graph
  stats: MatchStats;
  events: MatchEvent[];
  trends?: string[]; // Elite Insights
}

export enum AIPredictionStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  SYNTHESIZING = 'SYNTHESIZING',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
}

export interface PredictionResult {
  aggressive: string;
  conservative: string;
  reasoning: string;
  type?: 'PRE_MATCH' | 'LIVE_INSIGHT';
}

export interface LeagueStanding {
  rank: number;
  teamName: string;
  teamLogo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface HistoricMatch {
  id: string;
  date: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  result: 'W' | 'D' | 'L'; // Perspective of the focus team
}
