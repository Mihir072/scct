import { useEffect, useRef } from 'react';

/**
 * usePolling - calls `callback` immediately and then every `intervalMs` milliseconds.
 * Automatically clears the interval when the component unmounts or deps change.
 *
 * @param {Function} callback  - async function to run on each tick
 * @param {number}   intervalMs - polling interval in ms (default 30 000 = 30 s)
 * @param {Array}    deps       - re-start polling when these values change
 */
const usePolling = (callback, intervalMs = 30000, deps = []) => {
  const callbackRef = useRef(callback);

  // Always use the latest callback without restarting the interval
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Run immediately on mount / dep change
    callbackRef.current();

    const id = setInterval(() => {
      callbackRef.current();
    }, intervalMs);

    // Cleanup on unmount or when deps/intervalMs change
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, intervalMs]);
};

export default usePolling;
