import { useCallback } from 'react';
import { ToastType } from '../components/Toast';

interface ToastOptions {
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const showToast = useCallback(({ message, type }: ToastOptions) => {
    const event = new CustomEvent('showToast', { detail: { message, type } });
    window.dispatchEvent(event);
  }, []);

  return { showToast };
};