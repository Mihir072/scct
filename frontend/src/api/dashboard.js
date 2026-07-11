import api from './client';

export const getSiteHealth = async (from, to) => {
  const params = {};
  if (from) params.from = from;
  if (to) params.to = to;
  const response = await api.get('/api/admin/dashboard/site-health', { params });
  return response.data;
};

export const getFunnelMetrics = async (courseId, source) => {
  const params = {};
  if (courseId) params.courseId = courseId;
  if (source) params.source = source;
  const response = await api.get('/api/admin/dashboard/funnel', { params });
  return response.data;
};

export const getConversionMetrics = async () => {
  const response = await api.get('/api/admin/dashboard/conversion');
  return response.data;
};

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
