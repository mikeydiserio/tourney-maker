import styled, { css } from 'styled-components';

export const VisualizerContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(23, 23, 23, 0.85);
  backdrop-filter: blur(10px);
  padding: 1rem;
  z-index: 900;
  overflow-x: auto;
  border-bottom: 1px solid #333;
`;

export const Bracket = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: fit-content;
`;

export const RoundColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 40px; /* Space between rounds */
  min-height: 100%;
`;

export const MatchupCardWrapper = styled.div`
  position: relative;
  margin: 20px 0;
`;

export const MatchupCard = styled.div<{ isCurrent?: boolean }>`
  background: #2a2a2a;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 0.8rem;
  width: 150px;
  transition: all 0.3s ease;

  ${({ isCurrent }) =>
    isCurrent &&
    css`
      border-color: #00aaff;
      box-shadow: 0 0 15px rgba(0, 170, 255, 0.7);
    `}
`;

export const PlayerName = styled.div<{ winner?: boolean }>`
  color: ${({ winner }) => (winner ? '#ffffff' : '#888')};
  font-weight: ${({ winner }) => (winner ? 'bold' : 'normal')};
  padding: 2px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Connector = styled.div<{ isTop: boolean }>`
  position: absolute;
  top: 50%;
  right: -25px; /* Positioned between rounds */
  width: 20px;
  height: 2px;
  background-color: #555;

  &::after {
    content: '';
    position: absolute;
    top: ${({ isTop }) => (isTop ? '0' : 'auto')};
    bottom: ${({ isTop }) => (isTop ? 'auto' : '0')};
    left: 100%;
    width: 2px;
    height: 42px; /* Adjust based on matchup card height and spacing */
    background-color: #555;
    transform: ${({ isTop }) => (isTop ? 'translateY(-100%)' : 'translateY(100%)')};
  }
`;