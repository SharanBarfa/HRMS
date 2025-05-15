import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../config';

// Configure axios defaults
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;

// Get all projects
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get project by ID
export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a project
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(`${API_URL}/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a project
export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_URL}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add task to project
export const addTaskToProject = async (projectId, taskData) => {
  try {
    const response = await axios.post(`${API_URL}/projects/${projectId}/tasks`, taskData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding task:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to add task' };
  }
};

// Update task status
export const updateTaskStatus = async (projectId, taskId, status) => {
  try {
    const response = await axios.patch(`${API_URL}/projects/${projectId}/tasks/${taskId}`, { status });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error updating task status:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to update task status' };
  }
};

// Get project messages
export const getProjectMessages = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}/messages`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching project messages:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to fetch messages' };
  }
};

// Send message to project
export const sendProjectMessage = async (projectId, messageData) => {
  try {
    const response = await axios.post(`${API_URL}/projects/${projectId}/messages`, messageData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to send message' };
  }
};

// Update project progress
export const updateProjectProgress = async (projectId, progress) => {
  try {
    const response = await axios.put(`${API_URL}/projects/${projectId}/progress`, { progress });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get projects by department
export const getProjectsByDepartment = async (departmentId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/department/${departmentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get projects by manager
export const getProjectsByManager = async (managerId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/manager/${managerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 