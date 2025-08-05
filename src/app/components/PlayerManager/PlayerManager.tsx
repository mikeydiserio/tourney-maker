"use client";

import React from "react";
import * as S from "../../page.styles";
import { Player } from "../../types";
import { isPowerOfTwo } from "../../utils";

interface PlayerManagerProps {
  players: Player[];
  newPlayerName: string;
  setNewPlayerName: (name: string) => void;
  handleAddPlayer: () => void;
  handleRemovePlayer: (id: string) => void;
  handleStartTournament: () => void;
}

const PlayerManager: React.FC<PlayerManagerProps> = ({
  players,
  newPlayerName,
  setNewPlayerName,
  handleAddPlayer,
  handleRemovePlayer,
  handleStartTournament,
}) => {
  return (
    <S.PlayerInputSection>
      <label htmlFor="PlayerName">Add Competitors</label>
      <S.InputRow>
        <S.Input
          id="PlayerName"
          type="text"
          value={newPlayerName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewPlayerName(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && handleAddPlayer()
          }
          placeholder="Enter player name..."
        />
        <S.AddButton onClick={handleAddPlayer}>Add</S.AddButton>
      </S.InputRow>
      <S.Description>
        Add at least 2 competitors to start (power of 2: 2, 4, 8, 16, etc.)
      </S.Description>
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
          onClick={() => handleStartTournament()}
          disabled={players.length < 4 || !isPowerOfTwo(players.length)}
        >
          Start Tournament
        </S.StartButton>
      </div>
    </S.PlayerInputSection>
  );
};

export default PlayerManager;
