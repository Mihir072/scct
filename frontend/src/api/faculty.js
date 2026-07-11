import api from './client';

export const getFaculty = async (courseId, departmentId) => {
  const params = {};
  if (courseId) {
    params.courseId = courseId;
  }
  if (departmentId) {
    params.departmentId = departmentId;
  }
  const response = await api.get('/api/faculty', { params });
  return response.data;
};
