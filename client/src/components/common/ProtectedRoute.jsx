import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../layout/AdminLayout';
import EmployeeLayout from '../layout/EmployeeLayout';

const ProtectedRoute = ({ requireAdmin = false, requireEmployee = false, children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Handle redirection from old dashboard path
  if (location.pathname === '/dashboard') {
    return user.role === 'admin'
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/employee/dashboard" replace />;
  }

  // Check role requirements
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/employee/dashboard" replace />;
  }

  if (requireEmployee && user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If children are provided, render them directly
  if (children) {
    return children;
  }

  // Determine which layout to use based on user role
  if (user.role === 'admin') {
    return (
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    );
  } else {
    return (
      <EmployeeLayout>
        <Outlet />
      </EmployeeLayout>
    );
  }
};

export default ProtectedRoute;
