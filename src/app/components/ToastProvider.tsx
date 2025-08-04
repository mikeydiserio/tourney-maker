'use client'

import React, { useState, useCallback, ReactNode, useEffect } from 'react';
import Toast, { ToastType } from './Toast';

interface ToastInfo {
  id: number;
  message: string;
  type: ToastType;
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  const handleClose = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    const handleShowToast = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: string; type: ToastType }>;
      showToast(customEvent.detail.message, customEvent.detail.type);
    };

    window.addEventListener('showToast', handleShowToast);

    return () => {
      window.removeEventListener('showToast', handleShowToast);
    };
  }, [showToast]);

  return (
    <>
      {children}
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000 }}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => handleClose(toast.id)}
          />
        ))}
      </div>
    </>
  );
};
