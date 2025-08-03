"use client";

import { useMemo, useState } from "react";
import TournamentVisualizer from "./components/TournamentVisualizer";
import { useToast } from "./hooks/useToast";
import * as S from './page.styles';
import ThreeBackground from "./ThreeBackground";
import {
  Matchup,
  Player,
  Round
} from './types';
import { isPowerOfTwo, shuffleArray } from "./utils";


export default function HomePage() {
  const { showToast } = useToast();
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [tourneyState, setGameState] = useState<"setup" | "tournament" | "finished">("setup");
  const [champion, setChampion] = useState<Player | null>(null);

  

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      if (players.length >= 32) {
        showToast({ message: "Maximum 32 players supported." });
        return;
      }
      setPlayers([...players, { id: crypto.randomUUID(), name: newPlayerName.trim() }]);
      setNewPlayerName("");
    } else {
      showToast({ message: "Please enter a player name." });
    }
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const handleStartTournament = () => {
    if (players.length < 4 || !isPowerOfTwo(players.length)) {
      showToast({ message: "Requires 4, 8, 16, or 32 players." });
      return;
    }
    setGameState("tournament");
    const shuffledPlayers = shuffleArray(players);
    const initialMatchups: Matchup[] = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      initialMatchups.push({
        id: crypto.randomUUID(),
        player1: shuffledPlayers[i],
        player2: shuffledPlayers[i + 1],
        winner: null,
      });
    }
    setRounds([{ id: crypto.randomUUID(), matchups: initialMatchups }]);
  };

  const handleSelectWinner = (roundIndex: number, matchId: string, winner: Player) => {
    const newRounds = [...rounds];
    const match = newRounds[roundIndex].matchups.find((m) => m.id === matchId);
    if (match) {
      match.winner = match.winner?.id === winner.id ? null : winner;
      setRounds(newRounds);
    }
  };

  const handleNextRound = () => {
    const lastRound = rounds[rounds.length - 1];
    const winners = lastRound.matchups.map((m) => m.winner!);

    if (winners.length === 1) {
      setChampion(winners[0]);
      setGameState("finished");
      return;
    }

    const shuffledWinners = shuffleArray(winners);
    const nextMatchups: Matchup[] = [];
    for (let i = 0; i < shuffledWinners.length; i += 2) {
      nextMatchups.push({
        id: crypto.randomUUID(),
        player1: shuffledWinners[i],
        player2: shuffledWinners[i + 1],
        winner: null,
      });
    }
    setRounds([...rounds, { id: crypto.randomUUID(), matchups: nextMatchups }]);
  };

  const handleReset = () => {
    setPlayers([]);
    setRounds([]);
    setGameState("setup");
    setChampion(null);
    setNewPlayerName("");
  };

  const isCurrentRoundComplete = useMemo(() => {
    if (rounds.length === 0) return false;
    const lastRound = rounds[rounds.length - 1];
    return lastRound.matchups.every((m) => m.winner !== null);
  }, [rounds]);

  return (
    <>
    <S.NebulaContainer>
      <ThreeBackground />
    </S.NebulaContainer>
    {tourneyState === "tournament" && <TournamentVisualizer rounds={rounds} />}


      
      <S.PageWrapper>
          {tourneyState !== "finished" && (
            <S.Header>Tournament Builder</S.Header>
          )}

          {tourneyState === "setup" && (
            <>
              <S.Description>
                Enter player names to build your bracket. You'll need a power of two (4, 8, 16, or 32) to begin.
              </S.Description>
              <S.PlayerInputSection>
                <S.InputRow>
                  <S.Input
                    type="text"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddPlayer()}
                    placeholder="Enter player name..."
                  />
                  <S.AddButton onClick={handleAddPlayer}>Add Player</S.AddButton>
                </S.InputRow>
                <S.PlayerList>
                  {players.map((player) => (
                    <S.PlayerTag key={player.id}>
                      <span>{player.name}</span>
                      <S.RemoveButton onClick={() => handleRemovePlayer(player.id)}>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </S.RemoveButton>
                    </S.PlayerTag>
                  ))}
                </S.PlayerList>
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <S.StartButton
                    onClick={handleStartTournament}
                    disabled={players.length < 4 || !isPowerOfTwo(players.length)}
                  >
                    Start Tournament
                  </S.StartButton>
                </div>
              </S.PlayerInputSection>
            </>
          )}

          {tourneyState === "tournament" && (
            <S.TournamentSection>
              <S.RoundsContainer>
                {rounds.map((round, roundIndex) => (
                  <S.RoundColumn key={round.id} delay={roundIndex * 0.1}>
                    <S.RoundTitle>
                      {round.matchups.length === 1 ? "Final" : `Round ${roundIndex + 1}`}
                    </S.RoundTitle>
                    {round.matchups.map((match) => (
                      <S.MatchupContainer key={match.id}>
                        {[match.player1, match.player2].map((player) => (
                          <S.PlayerCard
                            key={player.id}
                            className={
                              match.winner?.id === player.id
                                ? "winner"
                                : match.winner
                                ? "loser"
                                : ""
                            }
                            onClick={() => handleSelectWinner(roundIndex, match.id, player)}
                          >
                            <span>{player.name}</span>
                          </S.PlayerCard>
                        ))}
                      </S.MatchupContainer>
                    ))}
                  </S.RoundColumn>
                ))}
              </S.RoundsContainer>
              <S.StartButton
                onClick={handleNextRound}
                disabled={!isCurrentRoundComplete}
                isActive={isCurrentRoundComplete}
              >
                Next Round
              </S.StartButton>
            </S.TournamentSection>
          )}

          {tourneyState === "finished" && champion && (
            <S.WinnerSection>
              <S.ChampionTitle>Champion!</S.ChampionTitle>
              <S.WinnerDisplay>
                <h3>{champion.name}</h3>
              </S.WinnerDisplay>
              <S.ResetButton onClick={handleReset}>Reset Tournament</S.ResetButton>
            </S.WinnerSection>
          )}
      </S.PageWrapper>
    </>
  );
}