import styled, { createGlobalStyle, keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #0c0a1d;
    color: #e0e0e0;
    font-family: 'Libertinus Serif', serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

export const NebulaContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  animation: ${fadeIn} 0.8s ease-out;
`;

export const Header = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(138, 43, 226, 0.5);
  margin-bottom: 1rem;
  letter-spacing: 2px;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: #b0a8d9;
  margin-bottom: 2rem;
  max-width: 600px;
  text-align: center;
  line-height: 1.6;
`;

export const PlayerInputSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const InputRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #4a2a69;
  background: #1c162f;
  color: #e0e0e0;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #8a80b4;
  }

  &:focus {
    outline: none;
    border-color: #8a2be2;
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.5);
  }
`;

export const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: linear-gradient(45deg, #8a2be2, #4a0d67);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);
  }
`;

export const PlayerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const PlayerTag = styled.div`
  display: flex;
  align-items: center;
  background: #2a214d;
  color: #c7c0e8;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #8a80b4;
  margin-left: 0.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: #ff69b4;
  }
`;

export const StartButton = styled.button<{ isActive?: boolean }>`
  padding: 1rem 2.5rem;
  border-radius: 50px;
  border: none;
  background: ${({ isActive }) => (isActive ? 'linear-gradient(45deg, #ff69b4, #ffb6c1)' : 'linear-gradient(45deg, #8a2be2, #4a0d67)')};
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);

  &:disabled {
    background: #3d325a;
    color: #7a709e;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:not(:disabled):hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px ${({ isActive }) => (isActive ? 'rgba(255, 105, 180, 0.5)' : 'rgba(138, 43, 226, 0.5)')};
  }
`;

export const TournamentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: ${fadeIn} 0.8s ease-out;
  background: rgba(10, 25, 47, 0.4);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const RoundsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding: 1rem;
  width: 100%;
`;

export const RoundColumn = styled.div<{ delay?: number }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 250px;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${({ delay }) => delay || 0}s;
  opacity: 0;
`;

export const RoundTitle = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 0 8px rgba(138, 43, 226, 0.7);
`;

export const MatchupContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

export const PlayerName = styled.div<{ isWinner?: boolean }>`
  padding: 1rem;
  color: #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ isWinner }) => (isWinner ? 'rgba(76, 175, 80, 0.2)' : 'transparent')};
  font-weight: ${({ isWinner }) => (isWinner ? 'bold' : 'normal')};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0;
`;

export const WinnerInfo = styled.div`
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  text-align: center;
  font-weight: bold;
`;

export const WinnerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

export const ChampionTitle = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  color: #ff69b4;
  text-shadow: 0 0 15px #ff69b4, 0 0 30px #8a2be2;
  margin-bottom: 1rem;
`;

export const WinnerDisplay = styled.div`
  background: linear-gradient(45deg, #8a2be2, #4a0d67);
  padding: 2rem 4rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

  h3 {
    font-size: 2.5rem;
    color: white;
    margin: 0;
  }
`;

export const ResetButton = styled(StartButton)`
  background: linear-gradient(45deg, #ff69b4, #ffb6c1);
`;

export const HistoryButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;