import mockAPI from './mockBackend';

// Register user
export const register = async (userData) => {
  try {
    // Use mock API in development, real API in production
    const response = await mockAPI.register(userData);
    if (response.success) {
      // Save token and user data to local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  } catch (error) {
    throw { success: false, error: error.message || 'Network error' };
  }
};

// Login user
export const login = async (email, password) => {
  try {
    // Use mock API in development, real API in production
    const response = await mockAPI.login(email, password);
    if (response.success) {
      // Save token and user data to local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  } catch (error) {
    throw { success: false, error: error.message || 'Network error' };
  }
};

// Logout user
export const logout = () => {
  // Remove token and user data from local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    // For simplicity, we'll just check if the token exists
    // In a real app, we would verify the token on the server
    return true;
  } catch (error) {
    // Invalid token, logout user
    logout();
    return false;
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await mockAPI.getProfile(token);
    return response;
  } catch (error) {
    throw { success: false, error: error.message || 'Network error' };
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await mockAPI.updateProfile(token, userData);
    if (response.success) {
      // Update user data in local storage
      const currentUser = getCurrentUser();
      const updatedUser = { ...currentUser, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    return response;
  } catch (error) {
    throw { success: false, error: error.message || 'Network error' };
  }
};
