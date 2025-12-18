import { useEffect, useRef, useState } from 'react';

const SHOW_LOADING_TMO = 1500;

export function useDelayedLoading(
  loading: boolean,
  delay = SHOW_LOADING_TMO,
): boolean {
  const [showLoading, setShowLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShowLoading(false);

    if (loading) {
      timeoutRef.current = setTimeout(() => {
        setShowLoading(true);
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loading, delay]);

  return showLoading;
}
