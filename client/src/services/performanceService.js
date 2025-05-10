import api from './api';
import mockAPI from './mockBackend';

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

// Get employee performance reviews
export const getEmployeePerformance = async (employeeId, params = {}) => {
  try {
    const response = await api.get('/performance', {
      params: {
        employee: employeeId,
        ...params
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Get current user's performance reviews
export const getCurrentUserPerformance = async (params = {}) => {
  try {
    console.log('Fetching current user performance');

    console.log('Fetching current user profile for performance');
    // First get the current user's employee ID
    const userResponse = await api.get('/users/profile');
    console.log('User profile response for performance:', userResponse.data);

    // Handle different user data structures
    const userData = userResponse.data.data || userResponse.data;
    const employeeId = userData?.employee?._id;

    console.log('Extracted employee ID for performance:', employeeId);

    if (!employeeId) {
      console.warn('No employee ID found in user data for performance');
      // Return a message with empty data array to inform the user
      return {
        success: true,
        data: [],
        message: 'No employee record found. Please complete your profile setup to view performance data.',
        noEmployeeRecord: true
      };
    }

    // Then get the performance reviews for this employee
    console.log(`Fetching performance for employee ${employeeId}`);
    const response = await api.get('/performance', {
      params: {
        employee: employeeId,
        ...params
      }
    });
    console.log('Employee performance response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching current user performance:', error);
    // Return error message with empty data array
    return {
      success: false,
      data: [],
      error: error.response?.data?.error || error.message || 'Failed to fetch performance data',
      message: 'Unable to load performance data. Please try again later.'
    };
  }
};
