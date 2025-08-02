
import { useCallback } from 'react';

interface ToastOptions {
  message: string;
}

export const useToast = () => {
  const showToast = useCallback(({ message }: ToastOptions) => {
    const event = new CustomEvent('showToast', { detail: { message } });
    window.dispatchEvent(event);
  }, []);

  return { showToast };
};
