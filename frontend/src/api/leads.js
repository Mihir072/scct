import api from './client';

// Public lead submission
export const createLead = async (leadData) => {
  const response = await api.post('/api/leads', leadData);
  return response.data;
};

// Silent page tracking
export const trackPageView = async (pagePath, sessionId, utmSource) => {
  const response = await api.post('/api/track/pageview', {
    pagePath,
    sessionId,
    utmSource,
  });
  return response.data;
};

// Admin lead list
export const getAdminLeads = async ({
  page = 0,
  size = 10,
  status,
  courseId,
  source,
  isDuplicate,
  search,
  sortBy = 'createdAt',
  sortDir = 'desc',
}) => {
  const params = { page, size, sortBy, sortDir };
  if (status) params.status = status;
  if (courseId) params.courseId = courseId;
  if (source) params.source = source;
  if (isDuplicate !== undefined && isDuplicate !== null && isDuplicate !== '') {
    params.isDuplicate = isDuplicate;
  }
  if (search) params.search = search;

  const response = await api.get('/api/admin/leads', { params });
  return response.data;
};

// Admin leads general summary
export const getAdminLeadsSummary = async () => {
  const response = await api.get('/api/admin/leads/summary');
  return response.data;
};

// Admin update lead status
export const updateLeadStatus = async (leadId, newStatus) => {
  const response = await api.patch(`/api/admin/leads/${leadId}/status`, {
    newStatus,
  });
  return response.data;
};

// Export leads CSV with current filters
export const exportLeadsCsv = async ({
  status,
  courseId,
  source,
  isDuplicate,
  search,
}) => {
  const params = {};
  if (status) params.status = status;
  if (courseId) params.courseId = courseId;
  if (source) params.source = source;
  if (isDuplicate !== undefined && isDuplicate !== null && isDuplicate !== '') {
    params.isDuplicate = isDuplicate;
  }
  if (search) params.search = search;

  const response = await api.get('/api/admin/leads/export', {
    params,
    responseType: 'blob', // Download as binary/blob file content
  });
  return response.data;
};
