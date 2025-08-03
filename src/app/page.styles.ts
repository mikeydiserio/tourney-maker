import { css, keyframes, styled } from "styled-components";
// --- KEYFRAME ANIMATIONS ---
export const slideIn = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;
export const winnerBounce = keyframes`
  0%, 100% { transform: scale(1.05); }
  50% { transform: scale(1.08); }
`;
export const checkmarkFadeIn = keyframes`
  0% { transform: translateY(-50%) scale(0); opacity: 0; }
  100% { transform: translateY(-50%) scale(1); opacity: 1; }
`;
export const winnerCelebration = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  70% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
`;
export const animatedGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
export const PageWrapper = styled.main`
  width: 80%;
  margin: auto;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  padding: 24px 0;
  display: flex;
  position: relative;
  top: 60px;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

export const NebulaContainer = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export const Header = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  color: #111827;
  line-height: 1.1;
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const Description = styled.p`
  font-size: 1.125rem;
  text-align: center;
  color: #4b5563;
  max-width: 42rem;
`;

export const PlayerInputSection = styled.div`
  width: 100%;
  max-width: 42rem;
  background: transparent;
  padding: 2rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`;

export const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  color: white;
  font-weight: 700;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:disabled {
    background: linear-gradient(to right, #9ca3af, #6b7280);
    box-shadow: none;
    cursor: not-allowed;
  }

  background: linear-gradient(to right, #3b82f6, #6366f1);
  &:hover:not(:disabled) {
    background: linear-gradient(to right, #2563eb, #4f46e5);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StartButton = styled.button<{ isActive?: boolean }>`
  padding: 0.75rem 1.5rem;
  color: white;
  font-weight: 700;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:disabled {
    background: linear-gradient(to right, #9ca3af, #6b7280);
    box-shadow: none;
    cursor: not-allowed;
  }

  padding: 1rem 2rem;
  background: linear-gradient(to right, #a855f7, #ec4899);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
  &:hover:not(:disabled) {
    background: linear-gradient(to right, #9333ea, #db2777);
  }
  ${({ isActive = false }) =>
    isActive &&
    css`
      animation: ${pulse} 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    `}
`;

export const ResetButton = styled.button`
  padding: 0.75rem 1.5rem;
  color: white;
  font-weight: 700;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:disabled {
    background: linear-gradient(to right, #9ca3af, #6b7280);
    box-shadow: none;
    cursor: not-allowed;
  }

  padding: 1rem 2rem;
  background: linear-gradient(to right, #ef4444, #f43f5e);
  &:hover:not(:disabled) {
    background: linear-gradient(to right, #dc2626, #e11d48);
  }
`;

export const PlayerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

export const PlayerTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #dbeafe;
  color: #1e40af;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
`;

export const RemoveButton = styled.button`
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: #1e40af;
  }
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const TournamentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

export const RoundsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
`;

export const RoundColumn = styled.div<{ delay?: number }>`
  flex-shrink: 0;
  width: 20rem;
  min-width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0;
  transform: translateY(20px);
  animation: ${slideIn} 0.5s ease-out forwards;
  animation-delay: ${({ delay }) => delay}s;
`;

export const RoundTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

export const MatchupContainer = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  backdrop-filter: blur(4px);
`;

export const PlayerCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition: all 0.2s ease;
  position: relative;
  font-weight: 500;

  &:not(.winner):not(.loser):hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  &.winner {
    background-color: #10b981;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.5);
    animation: ${winnerBounce} 0.3s ease-out;

    &::after {
      content: "✓";
      position: absolute;
      top: 50%;
      right: 1rem;
      transform: translateY(-50%) scale(1);
      font-size: 1.5rem;
      font-weight: bold;
      animation: ${checkmarkFadeIn} 0.3s ease-out;
    }
  }

  &.loser {
    background-color: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    text-decoration: line-through;
    opacity: 0.7;
  }
`;

export const WinnerSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

export const ChampionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #059669;
`;

export const WinnerDisplay = styled.div`
  display: inline-block;
  padding: 1.5rem;
  background: rgba(16, 185, 129, 0.8);
  color: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  backdrop-filter: blur(4px);
  opacity: 0;
  transform: scale(0.8);
  animation: ${winnerCelebration} 1s ease-out forwards;
  animation-delay: 0.5s;

  h3 {
    font-size: 2.25rem;
    font-weight: 700;
    margin: 0;
  }
`;

export const MessageBox = styled.div<{ visible?: boolean; type?: string }>`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%)
    ${({ visible }) => (visible ? "translateY(0)" : "translateY(-150%)")};
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  z-index: 50;
  transition: transform 0.5s ease-out;
  color: white;
  background-color: ${({ type }) =>
    type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#4b5563"};
`;
