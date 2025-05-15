import api from './api';
import mockAPI from './mockBackend';
import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../config';

// Configure axios defaults
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;

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

// Get team members
export const getTeamMembers = async () => {
  try {
    const response = await axios.get(`${API_URL}/teams/members`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching team members:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to fetch team members' };
  }
};

// Get current user's teams
export const getCurrentUserTeams = async () => {
  try {
    const response = await axios.get(`${API_URL}/teams/user`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching user teams:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to fetch user teams' };
  }
};
