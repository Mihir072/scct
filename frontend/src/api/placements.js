import api from './client';

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

export const getPlacementsSummary = async () => {
  const response = await api.get('/api/placements/summary');
  return response.data;
};
