/**
 * Custom React hook for debouncing fast-changing dynamic values.
 * @module hooks/useDebounce
 */
import { useState, useEffect } from 'react';

/**
 * Delays updating the returned output value until a specified resting period has elapsed.
 * Highly useful for text search inputs to avoid spamming the backend API.
 * 
 * @param {any} value - The fast-changing dynamic value to debounce.
 * @param {number} [delay=500] - The debounce resting delay in milliseconds.
 * @returns {any} The debounced output value.
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
