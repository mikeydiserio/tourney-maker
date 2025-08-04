'use client'

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{
  visible: boolean;
  type: ToastType;
}>`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: ${({ type }) => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#f44336';
      default:
        return '#333';
    }
  }};
  color: white;
  padding: 15px;
  border-radius: 5px;
  z-index: 1000;
  animation: ${({ visible }) => (visible ? slideUp : fadeOut)} 0.5s forwards;
`;

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer visible={visible} type={type}>
      {message}
    </ToastContainer>
  );
};

export default Toast;