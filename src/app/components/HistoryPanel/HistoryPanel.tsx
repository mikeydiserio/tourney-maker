'use client'

import React from 'react';
import styled from 'styled-components';
import { Tournament } from '../types';

const PanelContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: #1c162f;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  overflow-y: auto;
  z-index: 1500;
  transform: translateX(100%);
  transition: transform 0.4s ease-in-out;

  &.open {
    transform: translateX(0);
  }
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const HistoryItem = styled.li`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: #ff69b4;
  }

  p {
    margin: 0;
    color: #b0a8d9;
    font-size: 0.9rem;
  }
`;

interface HistoryPanelProps {
  isOpen: boolean;
  tournaments: Tournament[];
  onSelectTournament: (tournament: Tournament) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, tournaments, onSelectTournament }) => {
  return (
    <PanelContainer className={isOpen ? 'open' : ''}>
      <h2>Tournament History</h2>
      <HistoryList>
        {tournaments.map((t) => (
          <HistoryItem key={t.id} onClick={() => onSelectTournament(t)}>
            <h3>Champion: {t.champion?.name || 'N/A'}</h3>
            <p>Date: {new Date(t.date).toLocaleDateString()}</p>
            <p>{t.players.length} Players</p>
          </HistoryItem>
        ))}
      </HistoryList>
    </PanelContainer>
  );
};

export default HistoryPanel;
