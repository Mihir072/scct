/**
 * API client endpoints for lead management and tracking.
 * @module api/leads
 */
import api from './client';

/**
 * Submits a new admission lead enquiry from the public-facing form.
 * 
 * @param {Object} leadData - The candidate's submission details (name, email, course, etc.).
 * @returns {Promise<Object>} A promise resolving to the created lead confirmation.
 */
export const createLead = async (leadData) => {
  const response = await api.post('/api/leads', leadData);
  return response.data;
};

/**
 * Silently tracks a page view for analytics purposes.
 * 
 * @param {string} pagePath - The URL path of the page viewed.
 * @param {string} sessionId - An anonymous session identifier.
 * @param {string} [utmSource] - Optional UTM marketing source parameter.
 * @returns {Promise<Object>} A promise resolving when the tracking event is logged.
 */
export const trackPageView = async (pagePath, sessionId, utmSource) => {
  const response = await api.post('/api/track/pageview', {
    pagePath,
    sessionId,
    utmSource,
  });
  return response.data;
};

/**
 * Fetches a paginated and filtered list of leads for the admin dashboard.
 * 
 * @param {Object} params - Query parameters for pagination and filtering.
 * @param {number} [params.page=0] - The zero-indexed page number.
 * @param {number} [params.size=10] - The number of records per page.
 * @param {string} [params.status] - Filter by specific lead status.
 * @param {string} [params.courseId] - Filter by requested course UUID.
 * @param {string} [params.source] - Filter by acquisition source.
 * @param {string|boolean} [params.isDuplicate] - Filter for duplicated entries.
 * @param {string} [params.search] - General keyword search query.
 * @param {string} [params.sortBy='createdAt'] - Field to sort by.
 * @param {string} [params.sortDir='desc'] - Sort direction ('asc' or 'desc').
 * @returns {Promise<Object>} A promise resolving to the paginated lead data list.
 */
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

/**
 * Retrieves high-level summarized metrics regarding all recorded leads.
 * 
 * @returns {Promise<Object>} A promise resolving to summary statistics and breakdowns.
 */
export const getAdminLeadsSummary = async () => {
  const response = await api.get('/api/admin/leads/summary');
  return response.data;
};

/**
 * Updates the progression status pipeline of an existing lead.
 * 
 * @param {string} leadId - The UUID of the lead being updated.
 * @param {string} newStatus - The target pipeline status enum value.
 * @returns {Promise<Object>} A promise resolving to the updated lead record.
 */
export const updateLeadStatus = async (leadId, newStatus) => {
  const response = await api.patch(`/api/admin/leads/${leadId}/status`, {
    newStatus,
  });
  return response.data;
};

/**
 * Generates and downloads a CSV export of leads matching current filter criteria.
 * 
 * @param {Object} params - Query parameters to filter the exported dataset.
 * @param {string} [params.status] - Status filter for the export.
 * @param {string} [params.courseId] - Course filter for the export.
 * @param {string} [params.source] - Source filter for the export.
 * @param {string|boolean} [params.isDuplicate] - Duplicate flag filter.
 * @param {string} [params.search] - Keyword search filter.
 * @returns {Promise<Blob>} A promise resolving to the binary CSV file blob.
 */
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
