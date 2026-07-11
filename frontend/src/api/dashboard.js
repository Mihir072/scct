/**
 * Admin dashboard analytics and reporting API endpoints.
 * @module api/dashboard
 */
import api from './client';

/**
 * Fetches overall site health diagnostics and page view traffic over a date range.
 * 
 * @param {string} [from] - Optional ISO date string for the start of the reporting period.
 * @param {string} [to] - Optional ISO date string for the end of the reporting period.
 * @returns {Promise<Object>} A promise resolving to site health and traffic metrics.
 */
export const getSiteHealth = async (from, to) => {
  const params = {};
  if (from) params.from = from;
  if (to) params.to = to;
  const response = await api.get('/api/admin/dashboard/site-health', { params });
  return response.data;
};

/**
 * Retrieves lead conversion funnel metrics, showing progression through various statuses.
 * 
 * @param {string} [courseId] - Optional UUID of a course to filter the funnel.
 * @param {string} [source] - Optional source channel string to filter the funnel.
 * @returns {Promise<Object>} A promise resolving to funnel stage metrics and drop-off percentages.
 */
export const getFunnelMetrics = async (courseId, source) => {
  const params = {};
  if (courseId) params.courseId = courseId;
  if (source) params.source = source;
  const response = await api.get('/api/admin/dashboard/funnel', { params });
  return response.data;
};

/**
 * Retrieves aggregate conversion rates broken down by course and marketing source.
 * 
 * @returns {Promise<Object>} A promise resolving to course and source conversion statistics.
 */
export const getConversionMetrics = async () => {
  const response = await api.get('/api/admin/dashboard/conversion');
  return response.data;
};

/**
 * Triggers a download of the lead conversion funnel data in CSV format.
 * 
 * @param {string} [courseId] - Optional UUID of a course to filter the export.
 * @param {string} [source] - Optional source channel string to filter the export.
 * @returns {Promise<Blob>} A promise resolving to the binary CSV file blob.
 */
export const exportFunnelCsv = async (courseId, source) => {
  const params = {};
  if (courseId) params.courseId = courseId;
  if (source) params.source = source;
  const response = await api.get('/api/admin/dashboard/funnel/export', {
    params,
    responseType: 'blob',
  });
  return response.data;
};
