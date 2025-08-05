
'use client'

import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Button = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: black;
  }
`;

interface HeaderProps {
  onBackgroundChange: (background: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onBackgroundChange }) => {
  return (
    <HeaderContainer>
      <Button onClick={() => onBackgroundChange('cosmic')}>Cosmic Nebula</Button>
      <Button onClick={() => onBackgroundChange('fire')}>Fire</Button>
      <Button onClick={() => onBackgroundChange('ocean')}>Ocean</Button>
      <Button onClick={() => onBackgroundChange('forest')}>Forest</Button>
    </HeaderContainer>
  );
};

export default Header;
