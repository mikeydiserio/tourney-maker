"use client";
import { useMemo, useState } from "react";
import Header from "./components/Header";
import HistoryPanel from "./components/HistoryPanel";
import PlayerManager from "./components/PlayerManager";
import SaveGameDialog from "./components/SaveGameDialog";
import TournamentFlow from "./components/TournamentFlow";
import CosmicNebulaBackground from "./CosmicNebulaBackground";
import FireBackground from "./FireBackground";
import ForestBackground from "./ForestBackground";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useToast } from "./hooks/useToast";
import OceanBackground from "./OceanBackground";
import * as S from "./page.styles";
import { Matchup, Player, Round, Tournament } from "./types";
import { isPowerOfTwo, shuffleArray } from "./utils";

export default function HomePage() {
  const { showToast } = useToast();
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [tourneyState, setGameState] = useState<
    "setup" | "tournament" | "finished"
  >("setup");
  const [champion, setChampion] = useState<Player | null>(null);
  const [history, setHistory] = useLocalStorage<Tournament[]>(
    "tournamentHistory",
    []
  );
  const [isHistoryPanelOpen, setHistoryPanelOpen] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [background, setBackground] = useState("cosmic");

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      if (players.length >= 32) {
        showToast({ message: "Maximum 32 players supported.", type: "error" });
        return;
      }
      setPlayers([
        ...players,
        { id: crypto.randomUUID(), name: newPlayerName.trim() },
      ]);
      setNewPlayerName("");
    } else {
      showToast({ message: "Please enter a player name.", type: "error" });
    }
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const handleStartTournament = () => {
    if (players.length < 4 || !isPowerOfTwo(players.length)) {
      showToast({
        message: "Requires 4, 8, 16, or 32 players.",
        type: "error",
      });
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

  const handleSelectWinner = (
    roundIndex: number,
    matchId: string,
    winner: Player
  ) => {
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
    setShowSaveDialog(true);
  };

  const saveGame = () => {
    const newTournament: Tournament = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      players,
      rounds,
      champion,
    };
    setHistory([newTournament, ...history]);
    resetState();
  };

  const resetState = () => {
    setPlayers([]);
    setRounds([]);
    setGameState("setup");
    setChampion(null);
    setNewPlayerName("");
    setShowSaveDialog(false);
  };

  const handleSelectTournament = (tournament: Tournament) => {
    setPlayers(tournament.players);
    setRounds(tournament.rounds);
    setChampion(tournament.champion);
    setGameState("finished");
    setHistoryPanelOpen(false);
  };

  const isCurrentRoundComplete = useMemo(() => {
    if (rounds.length === 0) return false;
    const lastRound = rounds[rounds.length - 1];
    return lastRound.matchups.every((m) => m.winner !== null);
  }, [rounds]);

  const renderBackground = () => {
    switch (background) {
      case "fire":
        return <FireBackground />;
      case "ocean":
        return <OceanBackground />;
      case "forest":
        return <ForestBackground />;
      default:
        return <CosmicNebulaBackground />;
    }
  };

  return (
    <>
      <S.NebulaContainer>{renderBackground()}</S.NebulaContainer>
      <Header onBackgroundChange={setBackground} />
      <S.PageWrapper>
        <S.HistoryButton onClick={() => setHistoryPanelOpen(true)}>
          History
        </S.HistoryButton>
        <HistoryPanel
          isOpen={isHistoryPanelOpen}
          tournaments={history}
          onSelectTournament={handleSelectTournament}
        />

        {tourneyState !== "finished" && <S.Header>Tournament Builder</S.Header>}

        {tourneyState === "setup" && (
          <PlayerManager
            players={players}
            newPlayerName={newPlayerName}
            setNewPlayerName={setNewPlayerName}
            handleAddPlayer={handleAddPlayer}
            handleRemovePlayer={handleRemovePlayer}
            handleStartTournament={handleStartTournament}
          />
        )}

        {tourneyState === "tournament" && (
          <TournamentFlow
            rounds={rounds}
            handleSelectWinner={handleSelectWinner}
            handleNextRound={handleNextRound}
            isCurrentRoundComplete={isCurrentRoundComplete}
          />
        )}

        {tourneyState === "finished" && champion && (
          <S.WinnerSection>
            <S.ChampionTitle>Champion!</S.ChampionTitle>
            <S.WinnerDisplay>
              <h3>{champion.name}</h3>
            </S.WinnerDisplay>
            <S.ResetButton onClick={handleReset}>New Tournament</S.ResetButton>
          </S.WinnerSection>
        )}
      </S.PageWrapper>

      {showSaveDialog && (
        <SaveGameDialog
          onSave={saveGame}
          onDontSave={resetState}
          onCancel={() => setShowSaveDialog(false)}
        />
      )}
    </>
  );
}
