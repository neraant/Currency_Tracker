import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: string, milliseconds: number) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const timeoutRef = useRef<number | null | NodeJS.Timeout>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, milliseconds);

    timeoutRef.current = id;

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = null;
    };
  }, [value]);

  return { debouncedValue };
};
