/**
 * Placement and alumni success API endpoints.
 * @module api/placements
 */
import api from './client';

/**
 * Fetches placement records, optionally filtered by academic year and course.
 * 
 * @param {string} [year] - Optional academic year filter (e.g., '2023-2024').
 * @param {string} [courseId] - Optional course UUID to filter placements.
 * @returns {Promise<Array>} A promise resolving to a list of placement objects.
 */
export const getPlacements = async (year, courseId) => {
  const params = {};
  if (year) {
    params.year = year;
  }
  if (courseId) {
    params.courseId = courseId;
  }
  const response = await api.get('/api/placements', { params });
  return response.data;
};

/**
 * Retrieves aggregate placement statistics, including top recruiters and average packages.
 * 
 * @returns {Promise<Object>} A promise resolving to placement summary metrics.
 */
export const getPlacementsSummary = async () => {
  const response = await api.get('/api/placements/summary');
  return response.data;
};
