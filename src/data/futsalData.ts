export const teamStandings = [
  { position: 1, team: "Barrio Antioquia", played: 6, won: 6, drawn: 0, lost: 0, goalsFor: 34, goalsAgainst: 12, goalDifference: 22, points: 18 },
  { position: 2, team: "Ignis Fenix", played: 6, won: 5, drawn: 0, lost: 1, goalsFor: 29, goalsAgainst: 13, goalDifference: 16, points: 15 },
  { position: 3, team: "Papoi FC", played: 6, won: 4, drawn: 2, lost: 0, goalsFor: 37, goalsAgainst: 18, goalDifference: 19, points: 14 },
  { position: 4, team: "A.S Godnes", played: 6, won: 4, drawn: 1, lost: 1, goalsFor: 28, goalsAgainst: 17, goalDifference: 11, points: 13 },
  { position: 5, team: "Goat Island", played: 6, won: 4, drawn: 1, lost: 1, goalsFor: 23, goalsAgainst: 12, goalDifference: 11, points: 13 },
  { position: 6, team: "San Marino", played: 6, won: 4, drawn: 0, lost: 2, goalsFor: 18, goalsAgainst: 10, goalDifference: 8, points: 12 },
  { position: 7, team: "Sleiffens", played: 6, won: 2, drawn: 3, lost: 1, goalsFor: 25, goalsAgainst: 17, goalDifference: 8, points: 9 },
  { position: 8, team: "Arnaldítos FC", played: 6, won: 2, drawn: 0, lost: 4, goalsFor: 17, goalsAgainst: 16, goalDifference: 1, points: 6 },
  { position: 9, team: "Champs FC", played: 6, won: 2, drawn: 0, lost: 4, goalsFor: 27, goalsAgainst: 37, goalDifference: -10, points: 6 },
  { position: 10, team: "Moba FC", played: 6, won: 1, drawn: 0, lost: 5, goalsFor: 7, goalsAgainst: 29, goalDifference: -22, points: 3 },
  { position: 11, team: "Bodo", played: 6, won: 1, drawn: 0, lost: 5, goalsFor: 4, goalsAgainst: 26, goalDifference: -22, points: 3 },
  { position: 12, team: "Team Plumas", played: 6, won: 0, drawn: 1, lost: 5, goalsFor: 13, goalsAgainst: 25, goalDifference: -12, points: 1 },
  { position: 13, team: "Los Socios FC", played: 6, won: 0, drawn: 0, lost: 6, goalsFor: 12, goalsAgainst: 42, goalDifference: -30, points: 0 },
];

export const scheduledMatches = [
  {
    id: 1,
    date: "2026-08-30",
    time: "18:00",
    homeTeam: "Barrio Antioquia",
    awayTeam: "Champs FC",
    venue: "Coliseo Central",
  },
  {
    id: 2,
    date: "2026-08-30",
    time: "19:30",
    homeTeam: "Ignis Fenix",
    awayTeam: "San Marino",
    venue: "Arena Metropolitana",
  },
  {
    id: 3,
    date: "2026-08-31",
    time: "18:30",
    homeTeam: "Papoi FC",
    awayTeam: "Moba FC",
    venue: "Polideportivo Municipal",
  },
  {
    id: 4,
    date: "2026-08-31",
    time: "20:00",
    homeTeam: "Goat Island",
    awayTeam: "A.S Godnes",
    venue: "Coliseo Central",
  },
];

export const playerStandings = [
  { position: 1, player: "Mateo Rojas", team: "Barrio Antioquia", goals: 15, assists: 7 },
  { position: 2, player: "Lucas Méndez", team: "Ignis Fenix", goals: 13, assists: 5 },
  { position: 3, player: "Diego Paredes", team: "Papoi FC", goals: 11, assists: 6 },
  { position: 4, player: "Santiago Cruz", team: "A.S Godnes", goals: 10, assists: 8 },
  { position: 5, player: "Nicolás Vera", team: "Goat Island", goals: 9, assists: 4 },
  { position: 6, player: "Emilio Torres", team: "San Marino", goals: 8, assists: 5 },
];

export const teams = teamStandings.map((standing) => ({
  name: standing.team,
  origin: "Sucre, Bolivia",
  players: 10,
}));
