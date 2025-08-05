"use client";

import React from "react";
import * as S from "../../page.styles";
import { Player, Round } from "../../types";

interface TournamentFlowProps {
  rounds: Round[];
  handleSelectWinner: (
    roundIndex: number,
    matchId: string,
    winner: Player
  ) => void;
  handleNextRound: () => void;
  isCurrentRoundComplete: boolean;
}

const TournamentFlow: React.FC<TournamentFlowProps> = ({
  rounds,
  handleSelectWinner,
  handleNextRound,
  isCurrentRoundComplete,
}) => {
  const getRoundTitle = (round: Round, roundIndex: number) => {
    const matchupsCount = round.matchups.length;

    if (matchupsCount === 1) {
      return "Final";
    }
    if (matchupsCount === 2) {
      return "Semi-Finals";
    }
    if (matchupsCount === 4) {
      return "Quarter-Finals";
    }
    return `Round ${roundIndex + 1}`;
  };

  const lastRound = rounds[rounds.length - 1];
  const isFinalRound = lastRound && lastRound.matchups.length === 1;

  return (
    <S.TournamentSection>
      <S.RoundsContainer>
        {rounds.map((round, roundIndex) => (
          <S.RoundColumn key={round.id} delay={roundIndex * 0.1}>
            <S.RoundTitle>{getRoundTitle(round, roundIndex)}</S.RoundTitle>
            {round.matchups.map((match) => (
              <S.MatchupContainer key={match.id}>
                <S.PlayerName
                  isWinner={match.winner?.id === match.player1.id}
                  onClick={() =>
                    handleSelectWinner(roundIndex, match.id, match.player1)
                  }
                >
                  {match.player1.name}
                </S.PlayerName>
                <S.Divider />
                <S.PlayerName
                  isWinner={match.winner?.id === match.player2.id}
                  onClick={() =>
                    handleSelectWinner(roundIndex, match.id, match.player2)
                  }
                >
                  {match.player2.name}
                </S.PlayerName>
                {match.winner && (
                  <S.WinnerInfo>Winner: {match.winner.name}</S.WinnerInfo>
                )}
              </S.MatchupContainer>
            ))}
          </S.RoundColumn>
        ))}
      </S.RoundsContainer>
      <S.StartButton
        onClick={handleNextRound}
        disabled={!isCurrentRoundComplete}
        $isActive={isCurrentRoundComplete}
      >
        {isFinalRound ? "Finish Tournament" : "Next Round"}
      </S.StartButton>
    </S.TournamentSection>
  );
};

export default TournamentFlow;
