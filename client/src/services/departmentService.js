import api from './api';
import mockAPI from './mockBackend';
import axios from 'axios';

// Get all departments
// export const getDepartments = async (params = {}) => {
//   try {
//     console.log('Fetching departments with params:', params);

//     // Use real API
//     const response = await api.get('/departments', { params });
//     console.log('Departments response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching departments:', error);
//     return { success: false, data: [], error: 'Failed to fetch departments' };
//   }
// };

const API_URL = 'http://localhost:5000/api';

export const getDepartments = async () => {
  try {
    const response = await axios.get(`${API_URL}/departments`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching departments' };
  }
};

// Get department by ID
export const getDepartmentById = async (id) => {
  try {
    console.log(`Fetching department with ID: ${id}`);

    // Use real API
    const response = await api.get(`/departments/${id}`);
    console.log('Department response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching department:', error);
    return { success: false, data: null, error: 'Failed to fetch department' };
  }
};

// Create department (admin only)
export const createDepartment = async (departmentData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.post(`${API_URL}/departments`, departmentData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error creating department' };
  }
};

// Update department (admin only)
export const updateDepartment = async (id, departmentData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.put(`${API_URL}/departments/${id}`, departmentData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error updating department' };
  }
};

// Delete department (admin only)
export const deleteDepartment = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.delete(`${API_URL}/departments/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error deleting department' };
  }
};

// Get department stats
export const getDepartmentStats = async () => {
  try {
    const response = await api.get('/departments/stats');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};
