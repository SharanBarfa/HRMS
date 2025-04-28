import api from './api';

// Get all attendance records
export const getAttendanceRecords = async (params = {}) => {
  try {
    const response = await api.get('/attendance', { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Get attendance record by ID
export const getAttendanceById = async (id) => {
  try {
    const response = await api.get(`/attendance/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Create attendance record
export const createAttendance = async (attendanceData) => {
  try {
    const response = await api.post('/attendance', attendanceData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Update attendance record
export const updateAttendance = async (id, attendanceData) => {
  try {
    const response = await api.put(`/attendance/${id}`, attendanceData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Delete attendance record
export const deleteAttendance = async (id) => {
  try {
    const response = await api.delete(`/attendance/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Check in employee
export const checkIn = async (employeeId, location = '') => {
  try {
    const response = await api.post('/attendance/check-in', { employeeId, location });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Check out employee
export const checkOut = async (employeeId, location = '') => {
  try {
    const response = await api.post('/attendance/check-out', { employeeId, location });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};

// Get attendance stats
export const getAttendanceStats = async (params = {}) => {
  try {
    const response = await api.get('/attendance/stats', { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, error: 'Network error' };
  }
};
