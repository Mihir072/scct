import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../api/leads';
import { getCapturedUtms } from '../utils/utmCapture';

// Generates a unique session ID if not exists
const getOrCreateSessionId = () => {
  if (typeof window === 'undefined') return '';
  let sessionId = sessionStorage.getItem('scct_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
    sessionStorage.setItem('scct_session_id', sessionId);
  }
  return sessionId;
};

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
