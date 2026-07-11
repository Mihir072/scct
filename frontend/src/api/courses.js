/**
 * Course catalog API endpoints.
 * @module api/courses
 */
import api from './client';

/**
 * Fetches the list of active courses, optionally filtered by stream.
 * 
 * @param {string} [stream] - Optional stream to filter courses (e.g., 'Commerce', 'Science').
 * @returns {Promise<Array>} A promise resolving to an array of course objects.
 */
export const getCourses = async (stream) => {
  const params = {};
  if (stream) {
    params.stream = stream;
  }
  const response = await api.get('/api/courses', { params });
  return response.data;
};

/**
 * Fetches detailed information for a specific course by its unique slug.
 * 
 * @param {string} slug - The unique URL-friendly identifier of the course.
 * @returns {Promise<Object>} A promise resolving to the course details object.
 */
export const getCourseBySlug = async (slug) => {
  const response = await api.get(`/api/courses/${slug}`);
  return response.data;
};
