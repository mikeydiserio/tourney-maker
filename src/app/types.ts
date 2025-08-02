// --- TYPE DEFINITIONS ---
export interface Player {
  id: string;
  name: string;
}
export interface Matchup {
  id: string;
  player1: Player;
  player2: Player;
  winner: Player | null;
}
export interface Round {
  id: string;
  matchups: Matchup[];
}
