'use client'

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

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

const ToastContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #333;
  color: white;
  padding: 15px;
  border-radius: 5px;
  z-index: 1000;
  animation: ${({ visible }) => (visible ? slideUp : fadeOut)} 0.5s forwards;
`;

interface ToastEventDetail {
  message: string;
}

const Toast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleShowToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastEventDetail>;
      setMessage(customEvent.detail.message);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 3000);
    };

    window.addEventListener('showToast', handleShowToast);

    return () => {
      window.removeEventListener('showToast', handleShowToast);
    };
  }, []);

  if (!visible) return null;

  return <ToastContainer visible={visible}>{message}</ToastContainer>;
};

export default Toast;
