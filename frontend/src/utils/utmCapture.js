/**
 * Utility functions for capturing and retrieving UTM marketing parameters.
 * @module utils/utmCapture
 */

/**
 * Extracts standard UTM parameters from the current URL query string and persists them to session storage.
 */
export const captureUtmParameters = () => {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  utmKeys.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      sessionStorage.setItem(key, value);
    }
  });
};

/**
 * Retrieves the persisted UTM marketing parameters from session storage.
 * 
 * @returns {Object} An object containing the extracted UTM parameters (source, medium, campaign, term, content).
 */
export const getCapturedUtms = () => {
  if (typeof window === 'undefined') return {};

  return {
    utmSource: sessionStorage.getItem('utm_source') || null,
    utmMedium: sessionStorage.getItem('utm_medium') || null,
    utmCampaign: sessionStorage.getItem('utm_campaign') || null,
    utmTerm: sessionStorage.getItem('utm_term') || null,
    utmContent: sessionStorage.getItem('utm_content') || null,
  };
};
