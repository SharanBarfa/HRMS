import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import AdminAttendance from './pages/admin/AdminAttendance';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Performance from './pages/Performance';
import Reports from './pages/Reports';


// Employee Pages
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeProfile from './pages/employee/EmployeeProfile';
import EmployeeAttendance from './pages/employee/EmployeeAttendance';
import EmployeePerformance from './pages/employee/EmployeePerformance';
import EmployeeTeam from './pages/employee/EmployeeTeam';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardRedirect from './components/common/DashboardRedirect';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route element={<ProtectedRoute requireAdmin={true} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/departments" element={<Departments />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/performance" element={<Performance />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>

        {/* Employee routes */}
        <Route element={<ProtectedRoute requireEmployee={true} />}>
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
          <Route path="/employee/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee/performance" element={<EmployeePerformance />} />
          <Route path="/employee/team" element={<EmployeeTeam />} />
        </Route>

        {/* Redirect old dashboard path to role-specific dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />

        {/* Fallback route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App
