"use client";

import React from 'react';
import * as S from './TournamentVisualizer.styles';
import { Round } from '../types';

interface TournamentVisualizerProps {
  rounds: Round[];
}

const TournamentVisualizer: React.FC<TournamentVisualizerProps> = ({ rounds }) => {
  if (rounds.length === 0) {
    return null;
  }

  // Find the current game to highlight
  let currentMatchupId: string | null = null;
  for (const round of rounds) {
    const firstUndecidedMatch = round.matchups.find(m => !m.winner);
    if (firstUndecidedMatch) {
      currentMatchupId = firstUndecidedMatch.id;
      break;
    }
  }

  return (
    <S.VisualizerContainer>
      <S.Bracket>
        {rounds.map((round, roundIndex) => (
          <S.RoundColumn key={round.id}>
            {round.matchups.map((matchup, matchupIndex) => (
              <S.MatchupCardWrapper key={matchup.id}>
                <S.MatchupCard isCurrent={matchup.id === currentMatchupId}>
                  <S.PlayerName winner={matchup.winner?.id === matchup.player1.id}>
                    {matchup.player1.name}
                  </S.PlayerName>
                  <S.PlayerName winner={matchup.winner?.id === matchup.player2.id}>
                    {matchup.player2.name}
                  </S.PlayerName>
                </S.MatchupCard>
                {/* Render connector lines for all but the final round */}
                {roundIndex < rounds.length - 1 && <S.Connector isTop={matchupIndex % 2 === 0} />}
              </S.MatchupCardWrapper>
            ))}
          </S.RoundColumn>
        ))}
      </S.Bracket>
    </S.VisualizerContainer>
  );
};

export default TournamentVisualizer;
