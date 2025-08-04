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

export interface Tournament {
  id: string;
  date: string;
  players: Player[];
  rounds: Round[];
  champion: Player | null;
}