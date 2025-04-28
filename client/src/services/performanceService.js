import api from './api';

// Get all performance reviews
export const getPerformanceReviews = async (params = {}) => {
  try {
    const response = await api.get('/performance', { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Get performance review by ID
export const getPerformanceById = async (id) => {
  try {
    const response = await api.get(`/performance/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Create performance review
export const createPerformance = async (performanceData) => {
  try {
    const response = await api.post('/performance', performanceData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Update performance review
export const updatePerformance = async (id, performanceData) => {
  try {
    const response = await api.put(`/performance/${id}`, performanceData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Delete performance review
export const deletePerformance = async (id) => {
  try {
    const response = await api.delete(`/performance/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Acknowledge performance review
export const acknowledgePerformance = async (id, comments = '') => {
  try {
    const response = await api.put(`/performance/${id}/acknowledge`, { comments });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Get performance stats
export const getPerformanceStats = async (params = {}) => {
  try {
    const response = await api.get('/performance/stats', { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};
