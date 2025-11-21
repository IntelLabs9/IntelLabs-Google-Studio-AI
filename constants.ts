
import { Match, LeagueStanding, HistoricMatch } from './types';

// Logos for reuse
const LOGOS = {
  REAL_MADRID: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png',
  MAN_CITY: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png',
  ARSENAL: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png',
  LIVERPOOL: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png',
  BAYERN: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
  PSG: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png',
  BARCELONA: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
  CHELSEA: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png',
  JUVENTUS: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/1200px-Juventus_FC_2017_icon_%28black%29.svg.png',
  DORTMUND: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png',
  TOTTENHAM: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/1200px-Tottenham_Hotspur.svg.png',
  ASTON_VILLA: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Aston_Villa_FC_crest_%282016%29.svg/1200px-Aston_Villa_FC_crest_%282016%29.svg.png',
  MAN_UTD: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png'
};

export const LEAGUE_LOGOS: Record<string, string> = {
  'Champions League': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UEFA_Champions_League_logo_%282%29.svg/1200px-UEFA_Champions_League_logo_%282%29.svg.png',
  'Premier League': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png',
  'Bundesliga': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png',
  'La Liga': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaLiga_Santander.svg/1200px-LaLiga_Santander.svg.png',
};

// Helper to generate a quick player
// Extended to support optional stats/rating overrides
const player = (name: string, num: number, pos: string, imgId: number, rating?: number, stats?: any) => ({
  id: `${name}-${num}`,
  name,
  number: num,
  position: pos,
  imageUrl: `https://randomuser.me/api/portraits/men/${imgId}.jpg`, // Placeholder
  rating: rating || Number((Math.random() * 2 + 6).toFixed(1)), // Random 6.0-8.0 if not provided
  seasonStats: stats
});

export const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    league: 'Champions League',
    date: 'Today, 24 Oct',
    time: '72\'',
    isLive: true,
    isFavorite: false,
    momentum: 65,
    momentumHistory: [0, 10, 5, -10, -25, -40, -15, 0, 20, 45, 60, 55, 70, 65],
    homeTeam: {
      id: 't1',
      name: 'Real Madrid',
      logoUrl: LOGOS.REAL_MADRID,
      score: 2,
      form: [
        { result: 'W', opponentLogo: LOGOS.BARCELONA, score: '3-1', isHome: true },
        { result: 'W', opponentLogo: LOGOS.CHELSEA, score: '2-0', isHome: false },
        { result: 'D', opponentLogo: LOGOS.MAN_CITY, score: '1-1', isHome: true },
        { result: 'W', opponentLogo: LOGOS.JUVENTUS, score: '1-0', isHome: false },
        { result: 'L', opponentLogo: LOGOS.PSG, score: '1-2', isHome: false }
      ],
      lineup: {
        formation: '4-3-3',
        isConfirmed: true,
        manager: { id: 'm1', name: 'C. Ancelotti', imageUrl: 'https://randomuser.me/api/portraits/men/88.jpg' },
        starting: [
          player('Courtois', 1, 'GK', 1),
          player('Carvajal', 2, 'RB', 2, 7.2, { tacklesPerGame: 2.4, interceptions: 1.1 }), 
          player('Militao', 3, 'CB', 3), 
          player('Alaba', 4, 'CB', 4), 
          player('Mendy', 23, 'LB', 5),
          player('Valverde', 15, 'CM', 6), 
          player('Tchouameni', 18, 'CDM', 7), 
          player('Modric', 10, 'CM', 8),
          player('Rodrygo', 11, 'RW', 9), 
          player('Bellingham', 5, 'CAM', 10, 8.4, { goals: 14, assists: 5, passAccuracy: 89 }), 
          player('Vinicius Jr', 7, 'LW', 11, 8.1, { goals: 10, assists: 7, shotsPerGame: 3.2 })
        ],
        bench: [
          player('Kepa', 25, 'GK', 12), player('Nacho', 6, 'CB', 13), player('Kroos', 8, 'CM', 14), player('Camavinga', 12, 'CM', 15), player('Joselu', 14, 'ST', 16)
        ]
      }
    },
    awayTeam: {
      id: 't2',
      name: 'Man City',
      logoUrl: LOGOS.MAN_CITY,
      score: 1,
      form: [
        { result: 'W', opponentLogo: LOGOS.LIVERPOOL, score: '4-1', isHome: true },
        { result: 'D', opponentLogo: LOGOS.REAL_MADRID, score: '1-1', isHome: false },
        { result: 'W', opponentLogo: LOGOS.ARSENAL, score: '3-0', isHome: true },
        { result: 'W', opponentLogo: LOGOS.CHELSEA, score: '1-0', isHome: true },
        { result: 'W', opponentLogo: LOGOS.BAYERN, score: '2-1', isHome: false }
      ],
      lineup: {
        formation: '3-2-4-1',
        isConfirmed: true,
        manager: { id: 'm2', name: 'Pep Guardiola', imageUrl: 'https://randomuser.me/api/portraits/men/89.jpg' },
        starting: [
          player('Ederson', 31, 'GK', 20),
          player('Walker', 2, 'CB', 21, 7.0, { tacklesPerGame: 1.8, interceptions: 0.9 }), 
          player('Dias', 3, 'CB', 22), 
          player('Gvardiol', 24, 'CB', 23),
          player('Stones', 5, 'CDM', 24), 
          player('Rodri', 16, 'CDM', 25),
          player('Silva', 20, 'RW', 26), 
          player('De Bruyne', 17, 'CAM', 27, 8.3, { goals: 4, assists: 12, passAccuracy: 86 }), 
          player('Alvarez', 19, 'CAM', 28), 
          player('Foden', 47, 'LW', 29),
          player('Haaland', 9, 'ST', 30, 7.9, { goals: 22, assists: 4, shotsPerGame: 4.1 })
        ],
        bench: [
          player('Ortega', 18, 'GK', 31), player('Ake', 6, 'CB', 32), player('Kovacic', 8, 'CM', 33), player('Doku', 11, 'LW', 34), player('Grealish', 10, 'LW', 35)
        ]
      }
    },
    events: [
        { id: 'e1', type: 'GOAL', minute: 12, teamId: 't1', playerName: 'Vinicius Jr' },
        { id: 'e2', type: 'GOAL', minute: 45, teamId: 't2', playerName: 'E. Haaland' },
        { id: 'e3', type: 'YELLOW_CARD', minute: 52, teamId: 't1', playerName: 'D. Carvajal' },
        { id: 'e4', type: 'GOAL', minute: 68, teamId: 't1', playerName: 'J. Bellingham' }
    ],
    trends: [
        "Real Madrid: Unbeaten in last 15 home UCL matches.",
        "Man City: Scored in 22 consecutive away games.",
        "H2H: Over 2.5 goals in last 4 meetings."
    ],
    stats: {
      homePossession: 55,
      awayPossession: 45,
      homeShots: 12,
      awayShots: 8,
      homeOnTarget: 5,
      awayOnTarget: 3,
      homeCorners: 6,
      awayCorners: 3,
      homeYellowCards: 2,
      awayYellowCards: 1,
      homeRedCards: 0,
      awayRedCards: 0,
      homeAttacks: 45,
      awayAttacks: 30
    }
  },
  {
    id: 'm2',
    league: 'Premier League',
    date: 'Today, 24 Oct',
    time: '88\'',
    isLive: true,
    isFavorite: false,
    momentum: -80,
    momentumHistory: [0, -10, 5, -5, -20, -35, -30, -50, -65, -75, -80, -90, -80],
    homeTeam: {
      id: 't3',
      name: 'Arsenal',
      logoUrl: LOGOS.ARSENAL,
      score: 1,
      form: [
        { result: 'W', opponentLogo: LOGOS.CHELSEA, score: '3-1', isHome: true },
        { result: 'W', opponentLogo: LOGOS.MAN_CITY, score: '1-0', isHome: false },
        { result: 'W', opponentLogo: LOGOS.DORTMUND, score: '2-0', isHome: true },
        { result: 'D', opponentLogo: LOGOS.LIVERPOOL, score: '2-2', isHome: false },
        { result: 'W', opponentLogo: LOGOS.JUVENTUS, score: '1-0', isHome: true }
      ],
      lineup: {
        formation: '4-2-3-1',
        isConfirmed: false,
        manager: { id: 'm3', name: 'M. Arteta', imageUrl: 'https://randomuser.me/api/portraits/men/90.jpg' },
        starting: [
          player('Raya', 22, 'GK', 40),
          player('White', 4, 'RB', 41), 
          player('Saliba', 2, 'CB', 42, 7.5, { tacklesPerGame: 2.1, interceptions: 1.3 }), 
          player('Gabriel', 6, 'CB', 43), 
          player('Zinchenko', 35, 'LB', 44),
          player('Rice', 41, 'CDM', 45, 7.8, { goals: 3, assists: 4, passAccuracy: 91 }), 
          player('Partey', 5, 'CDM', 46),
          player('Saka', 7, 'RW', 47, 8.0, { goals: 11, assists: 8, shotsPerGame: 2.9 }), 
          player('Odegaard', 8, 'CAM', 48), 
          player('Martinelli', 11, 'LW', 49),
          player('Jesus', 9, 'ST', 50)
        ],
        bench: [
          player('Ramsdale', 1, 'GK', 51), player('Tomiyasu', 18, 'DF', 52), player('Havertz', 29, 'MF', 53), player('Trossard', 19, 'FW', 54)
        ]
      }
    },
    awayTeam: {
      id: 't4',
      name: 'Liverpool',
      logoUrl: LOGOS.LIVERPOOL,
      score: 3,
      form: [
        { result: 'W', opponentLogo: LOGOS.MAN_CITY, score: '1-0', isHome: true },
        { result: 'L', opponentLogo: LOGOS.ARSENAL, score: '1-2', isHome: true },
        { result: 'W', opponentLogo: LOGOS.CHELSEA, score: '3-0', isHome: false },
        { result: 'W', opponentLogo: LOGOS.BARCELONA, score: '4-0', isHome: true },
        { result: 'W', opponentLogo: LOGOS.PSG, score: '2-1', isHome: false }
      ],
      lineup: {
        formation: '4-3-3',
        isConfirmed: false,
        manager: { id: 'm4', name: 'J. Klopp', imageUrl: 'https://randomuser.me/api/portraits/men/91.jpg' },
        starting: [
          player('Alisson', 1, 'GK', 60),
          player('Arnold', 66, 'RB', 61), 
          player('Konate', 5, 'CB', 62), 
          player('Van Dijk', 4, 'CB', 63, 7.6, { tacklesPerGame: 1.5, interceptions: 1.8 }), 
          player('Robertson', 26, 'LB', 64),
          player('Szoboszlai', 8, 'CM', 65, 7.7, { goals: 5, assists: 3, passAccuracy: 85 }), 
          player('Mac Allister', 10, 'CDM', 66), 
          player('Gravenberch', 38, 'CM', 67),
          player('Salah', 11, 'RW', 68, 8.2, { goals: 18, assists: 9, shotsPerGame: 3.5 }), 
          player('Nunez', 9, 'ST', 69), 
          player('Diaz', 7, 'LW', 70)
        ],
        bench: [
          player('Kelleher', 62, 'GK', 71), player('Gomez', 2, 'DF', 72), player('Endo', 3, 'MF', 73), player('Jota', 20, 'FW', 74)
        ]
      }
    },
    events: [
        { id: 'e5', type: 'GOAL', minute: 23, teamId: 't4', playerName: 'M. Salah' },
        { id: 'e6', type: 'GOAL', minute: 41, teamId: 't3', playerName: 'B. Saka' },
        { id: 'e7', type: 'RED_CARD', minute: 65, teamId: 't3', playerName: 'G. Xhaka' },
        { id: 'e8', type: 'GOAL', minute: 78, teamId: 't4', playerName: 'D. Nunez' },
        { id: 'e9', type: 'GOAL', minute: 85, teamId: 't4', playerName: 'L. Diaz' },
    ],
    stats: {
      homePossession: 42,
      awayPossession: 58,
      homeShots: 5,
      awayShots: 18,
      homeOnTarget: 2,
      awayOnTarget: 9,
      homeCorners: 2,
      awayCorners: 9,
      homeYellowCards: 1,
      awayYellowCards: 0,
      homeRedCards: 1,
      awayRedCards: 0,
      homeAttacks: 20,
      awayAttacks: 60
    }
  },
  {
    id: 'm3',
    league: 'Bundesliga',
    date: 'Tomorrow, 25 Oct',
    time: '20:45',
    isLive: false,
    isFavorite: false,
    momentum: 0,
    momentumHistory: [],
    homeTeam: {
      id: 't5',
      name: 'Bayern',
      logoUrl: LOGOS.BAYERN,
      score: 0,
      form: [
        { result: 'W', opponentLogo: LOGOS.DORTMUND, score: '3-2', isHome: false },
        { result: 'W', opponentLogo: LOGOS.PSG, score: '2-0', isHome: true },
        { result: 'L', opponentLogo: LOGOS.MAN_CITY, score: '0-3', isHome: false },
        { result: 'W', opponentLogo: LOGOS.REAL_MADRID, score: '2-1', isHome: true },
        { result: 'W', opponentLogo: LOGOS.BARCELONA, score: '1-0', isHome: false }
      ],
      lineup: {
        formation: '4-2-3-1',
        isConfirmed: false,
        manager: { id: 'm5', name: 'T. Tuchel', imageUrl: 'https://randomuser.me/api/portraits/men/92.jpg' },
        starting: [
            player('Neuer', 1, 'GK', 80),
            player('Laimer', 27, 'RB', 81), 
            player('Upamecano', 2, 'CB', 82), 
            player('Kim', 3, 'CB', 83), 
            player('Davies', 19, 'LB', 84, 7.3, { tacklesPerGame: 2.0, interceptions: 1.2 }),
            player('Kimmich', 6, 'CDM', 85), 
            player('Goretzka', 8, 'CDM', 86),
            player('Sane', 10, 'RW', 87), 
            player('Musiala', 42, 'CAM', 88, 8.1, { goals: 7, assists: 6, passAccuracy: 88 }), 
            player('Coman', 11, 'LW', 89),
            player('Kane', 9, 'ST', 90, 8.5, { goals: 25, assists: 6, shotsPerGame: 3.8 })
        ],
        bench: [
            player('Ulreich', 26, 'GK', 91), player('Muller', 25, 'FW', 92), player('Tel', 39, 'FW', 93)
        ]
      }
    },
    awayTeam: {
      id: 't6',
      name: 'PSG',
      logoUrl: LOGOS.PSG,
      score: 0,
      form: [
        { result: 'D', opponentLogo: LOGOS.REAL_MADRID, score: '2-2', isHome: true },
        { result: 'W', opponentLogo: LOGOS.BAYERN, score: '1-0', isHome: true },
        { result: 'W', opponentLogo: LOGOS.JUVENTUS, score: '2-1', isHome: false },
        { result: 'W', opponentLogo: LOGOS.ARSENAL, score: '2-0', isHome: false },
        { result: 'W', opponentLogo: LOGOS.LIVERPOOL, score: '3-2', isHome: true }
      ],
      lineup: {
        formation: '4-3-3',
        isConfirmed: false,
        manager: { id: 'm6', name: 'L. Enrique', imageUrl: 'https://randomuser.me/api/portraits/men/93.jpg' },
        starting: [
            player('Donnarumma', 99, 'GK', 100),
            player('Hakimi', 2, 'RB', 101, 7.4, { tacklesPerGame: 2.2, interceptions: 0.8 }), 
            player('Marquinhos', 5, 'CB', 102), 
            player('Skriniar', 37, 'CB', 103), 
            player('Hernandez', 21, 'LB', 104),
            player('Zaire-Emery', 33, 'CM', 105, 7.6, { goals: 2, assists: 4, passAccuracy: 90 }), 
            player('Ugarte', 4, 'CDM', 106), 
            player('Vitinha', 17, 'CM', 107),
            player('Dembele', 10, 'RW', 108), 
            player('Ramos', 9, 'ST', 109), 
            player('Mbappe', 7, 'LW', 110, 8.8, { goals: 20, assists: 5, shotsPerGame: 4.5 })
        ],
        bench: [
            player('Navas', 1, 'GK', 111), player('Asensio', 11, 'FW', 112), player('Lee', 19, 'MF', 113)
        ]
      }
    },
    events: [],
    trends: [
        "Bayern Munich: Over 2.5 goals in 8/10 home matches this season.",
        "H2H: Both teams scored in 4 of the last 5 meetings.",
        "PSG: Scored first in 7/8 recent away games.",
        "Market Trend: High volume on Home Win & BTTS (+180)."
    ],
    stats: {
      homePossession: 50,
      awayPossession: 50,
      homeShots: 0,
      awayShots: 0,
      homeOnTarget: 0,
      awayOnTarget: 0,
      homeCorners: 0,
      awayCorners: 0,
      homeYellowCards: 0,
      awayYellowCards: 0,
      homeRedCards: 0,
      awayRedCards: 0,
      homeAttacks: 0,
      awayAttacks: 0
    }
  }
];

export const COLORS = {
  background: '#0A0E27',
  indigo: '#6366F1',
  emerald: '#10B981',
  white: '#F8F9FA',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  glassBg: 'rgba(255, 255, 255, 0.05)',
};

// MOCK STANDINGS
export const MOCK_STANDINGS: LeagueStanding[] = [
  { rank: 1, teamName: 'Arsenal', teamLogo: LOGOS.ARSENAL, played: 11, won: 8, drawn: 2, lost: 1, goalsFor: 20, goalsAgainst: 5, points: 26, form: ['W', 'W', 'W', 'W', 'D'] },
  { rank: 2, teamName: 'Man City', teamLogo: LOGOS.MAN_CITY, played: 11, won: 7, drawn: 1, lost: 3, goalsFor: 23, goalsAgainst: 8, points: 22, form: ['W', 'W', 'L', 'W', 'W'] },
  { rank: 3, teamName: 'Chelsea', teamLogo: LOGOS.CHELSEA, played: 11, won: 6, drawn: 2, lost: 3, goalsFor: 21, goalsAgainst: 11, points: 20, form: ['W', 'W', 'L', 'W', 'W'] },
  { rank: 4, teamName: 'Liverpool', teamLogo: LOGOS.LIVERPOOL, played: 11, won: 6, drawn: 0, lost: 5, goalsFor: 18, goalsAgainst: 17, points: 18, form: ['L', 'L', 'L', 'W', 'L'] },
  { rank: 5, teamName: 'Tottenham', teamLogo: LOGOS.TOTTENHAM, played: 11, won: 5, drawn: 3, lost: 3, goalsFor: 19, goalsAgainst: 10, points: 18, form: ['W', 'L', 'W', 'L', 'D'] },
  { rank: 6, teamName: 'Aston Villa', teamLogo: LOGOS.ASTON_VILLA, played: 11, won: 5, drawn: 3, lost: 3, goalsFor: 13, goalsAgainst: 10, points: 18, form: ['W', 'W', 'W', 'L', 'W'] },
  { rank: 7, teamName: 'Man Utd', teamLogo: LOGOS.MAN_UTD, played: 11, won: 5, drawn: 3, lost: 3, goalsFor: 19, goalsAgainst: 18, points: 18, form: ['W', 'W', 'W', 'D', 'D'] },
  { rank: 8, teamName: 'Real Madrid', teamLogo: LOGOS.REAL_MADRID, played: 11, won: 5, drawn: 2, lost: 4, goalsFor: 15, goalsAgainst: 12, points: 17, form: ['W', 'D', 'L', 'W', 'W'] },
  { rank: 9, teamName: 'Bayern', teamLogo: LOGOS.BAYERN, played: 11, won: 4, drawn: 4, lost: 3, goalsFor: 14, goalsAgainst: 12, points: 16, form: ['D', 'D', 'W', 'L', 'W'] },
  { rank: 10, teamName: 'Dortmund', teamLogo: LOGOS.DORTMUND, played: 11, won: 4, drawn: 3, lost: 4, goalsFor: 12, goalsAgainst: 15, points: 15, form: ['L', 'W', 'L', 'D', 'W'] },
];

export const MOCK_HISTORY: HistoricMatch[] = [
  { id: 'h1', date: '30/03/2024', league: 'Premier League', homeTeam: 'Chelsea', awayTeam: 'Burnley', homeScore: 2, awayScore: 2, result: 'D' },
  { id: 'h2', date: '07/10/2023', league: 'Premier League', homeTeam: 'Burnley', awayTeam: 'Chelsea', homeScore: 1, awayScore: 4, result: 'W' },
  { id: 'h3', date: '05/03/2022', league: 'Premier League', homeTeam: 'Burnley', awayTeam: 'Chelsea', homeScore: 0, awayScore: 4, result: 'W' },
  { id: 'h4', date: '06/11/2021', league: 'Premier League', homeTeam: 'Chelsea', awayTeam: 'Burnley', homeScore: 1, awayScore: 1, result: 'D' },
  { id: 'h5', date: '31/01/2021', league: 'Premier League', homeTeam: 'Chelsea', awayTeam: 'Burnley', homeScore: 2, awayScore: 0, result: 'W' },
  { id: 'h6', date: '31/10/2020', league: 'Premier League', homeTeam: 'Burnley', awayTeam: 'Chelsea', homeScore: 0, awayScore: 3, result: 'W' },
  { id: 'h7', date: '11/01/2020', league: 'Premier League', homeTeam: 'Chelsea', awayTeam: 'Burnley', homeScore: 3, awayScore: 0, result: 'W' },
  { id: 'h8', date: '26/10/2019', league: 'Premier League', homeTeam: 'Burnley', awayTeam: 'Chelsea', homeScore: 2, awayScore: 4, result: 'W' },
  { id: 'h9', date: '22/04/2019', league: 'Premier League', homeTeam: 'Chelsea', awayTeam: 'Burnley', homeScore: 2, awayScore: 2, result: 'D' },
  { id: 'h10', date: '28/10/2018', league: 'Premier League', homeTeam: 'Burnley', awayTeam: 'Chelsea', homeScore: 0, awayScore: 4, result: 'W' },
];
