/**
 * Custom React hook for tracking anonymous page navigation metrics and traffic.
 * @module hooks/usePageViewTracker
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../api/leads';
import { getCapturedUtms } from '../utils/utmCapture';

/**
 * Retrieves an existing anonymous session ID from session storage, or generates a new one.
 * Session ID is bound to the tab lifecycle to track consecutive page hits.
 * 
 * @returns {string} The active alphanumeric session identifier.
 */
const getOrCreateSessionId = () => {
  if (typeof window === 'undefined') return '';
  let sessionId = sessionStorage.getItem('scct_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
    sessionStorage.setItem('scct_session_id', sessionId);
  }
  return sessionId;
};

/**
 * Silently records user navigation events whenever the react-router location changes.
 * This hook should be mounted once at a high-level public layout wrapper.
 */
export const usePageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname + location.search;
    const sessionId = getOrCreateSessionId();
    const utms = getCapturedUtms();
    const utmSource = utms.utmSource || '';

    // Fire tracking call silently
    trackPageView(pagePath, sessionId, utmSource)
      .catch((err) => console.debug('PageView tracking error (silenced):', err));
  }, [location]);
};
