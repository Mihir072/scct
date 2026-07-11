import api from './client';

export const getCourses = async (stream) => {
  const params = {};
  if (stream) {
    params.stream = stream;
  }
  const response = await api.get('/api/courses', { params });
  return response.data;
};

export const getCourseBySlug = async (slug) => {
  const response = await api.get(`/api/courses/${slug}`);
  return response.data;
};
