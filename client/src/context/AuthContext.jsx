import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as authService from '../services/authService';

// Create context
const AuthContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initAuth = () => {
      try {
        // Check if user is authenticated
        if (authService.isAuthenticated()) {
          // Get user from local storage
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      setUser(response.data);
      toast.success('Registration successful!');

      // Redirect based on user role (default is employee for new registrations)
      if (response.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }

      return response;
    } catch (error) {
      toast.error(error.error || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      setUser(response.data);
      toast.success('Login successful!');

      // Redirect based on user role
      if (response.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }

      return response;
    } catch (error) {
      toast.error(error.error || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    setUser(null);
    toast.info('Logged out successfully');
    navigate('/');
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.updateUserProfile(userData);
      setUser(response.data);
      toast.success('Profile updated successfully!');
      return response;
    } catch (error) {
      toast.error(error.error || 'Failed to update profile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get user profile
  const refreshProfile = async () => {
    try {
      setLoading(true);
      const response = await authService.getUserProfile();
      console.log('Refreshed profile:', response.data);
      setUser(response.data);
      return response;
    } catch (error) {
      console.error('Failed to refresh profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
        refreshProfile,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
