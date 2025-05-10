import api from './api';
import mockAPI from './mockBackend';

// Get all teams
export const getTeams = async (params = {}) => {
  try {
    console.log('Fetching teams with params:', params);
    const response = await api.get('/teams', { params });
    console.log('Teams response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Get team by ID
export const getTeamById = async (id) => {
  try {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Create team
export const createTeam = async (teamData) => {
  try {
    const response = await api.post('/teams', teamData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Update team
export const updateTeam = async (id, teamData) => {
  try {
    const response = await api.put(`/teams/${id}`, teamData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Delete team
export const deleteTeam = async (id) => {
  try {
    const response = await api.delete(`/teams/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Add member to team
export const addTeamMember = async (teamId, employeeId) => {
  try {
    const response = await api.put(`/teams/${teamId}/members`, { employeeId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Remove member from team
export const removeTeamMember = async (teamId, employeeId) => {
  try {
    const response = await api.delete(`/teams/${teamId}/members/${employeeId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Get teams for employee
export const getEmployeeTeams = async (employeeId) => {
  try {
    const response = await api.get(`/teams/employee/${employeeId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Get current user's teams
export const getCurrentUserTeams = async () => {
  try {
    console.log('Fetching current user teams');

    console.log('Fetching current user profile');
    // First get the current user's employee ID
    const userResponse = await api.get('/users/profile');
    console.log('User profile response:', userResponse.data);

    // Handle different user data structures
    const userData = userResponse.data.data || userResponse.data;
    const employeeId = userData?.employee?._id;

    console.log('Extracted employee ID:', employeeId);

    if (!employeeId) {
      console.warn('No employee ID found in user data');
      // Return a message with empty data array to inform the user
      return {
        success: true,
        data: [],
        message: 'No employee record found. Please complete your profile setup to view team data.',
        noEmployeeRecord: true
      };
    }

    // Then get the teams for this employee
    console.log(`Fetching teams for employee ${employeeId}`);
    const response = await api.get(`/teams/employee/${employeeId}`);
    console.log('Employee teams response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching current user teams:', error);
    // Return error message with empty data array
    return {
      success: false,
      data: [],
      error: error.response?.data?.error || error.message || 'Failed to fetch team data',
      message: 'Unable to load team data. Please try again later.'
    };
  }
};
