import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import SignupPage from './pages/auth/SignupPage';
import AdminDashboard from './pages/admin/Dashboard';
import MemberDashboard from './pages/member/Dashboard';
import MemberFeatures from './components/member/MemberFeatures';
import ClubDiscovery from './pages/clubs/ClubDiscovery';
import ClubDetail from './pages/clubs/ClubDetail';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorPage from './components/ErrorPage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <ErrorPage 
        title="Access Denied" 
        message={`You don't have permission to access this page. Required role: ${allowedRoles.join(' or ')}`}
        code="403"
      />
    );
  }

  return children;
};

// Login Page Component
const LoginPage = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // Redirect based on user role
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        
        {/* Interactive Floating Shapes */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          animate={{ 
            y: [0, 15, 0],
            scale: [1, 0.9, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2 
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4 
          }}
        />
        
        {/* Additional floating particles */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-3 h-3 bg-yellow-400/30 rounded-full"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full"
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
        />
      </div>
      
      <LoginForm />
    </div>
  );
};

// Main App Component
const AppContent = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected Member Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['member', 'club_leader', 'club_vice_leader']}>
                <MemberDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/member" 
            element={
              <ProtectedRoute allowedRoles={['member', 'club_leader', 'club_vice_leader']}>
                <MemberFeatures />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/clubs" 
            element={
              <ProtectedRoute>
                <ClubDiscovery />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/clubs/:id" 
            element={
              <ProtectedRoute>
                <ClubDetail />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Catch all route */}
          <Route path="*" element={
            <ErrorPage 
              title="Page Not Found" 
              message="The page you're looking for doesn't exist."
              code="404"
            />
          } />
        </Routes>
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
};

// Root App Component with Providers
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
