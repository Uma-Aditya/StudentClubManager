import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple mock user data for demo
  const mockUsers = [
    {
      id: 'admin-1',
      email: 'admin@university.edu',
      password: 'admin123',
      firstName: 'System',
      lastName: 'Administrator',
      role: 'admin',
      avatar: null,
      department: 'IT Administration',
      permissions: ['manage_clubs', 'manage_users', 'view_analytics', 'system_settings'],
      createdAt: new Date('2024-01-01'),
      lastLoginAt: new Date()
    },
    {
      id: 'student-1',
      email: 'student@university.edu',
      password: 'student123',
      firstName: 'John',
      lastName: 'Doe',
      role: 'member',
      avatar: null,
      department: 'Computer Science',
      academicYear: 2024,
      phone: '+1234567890',
      bio: 'Passionate about technology and innovation',
      interests: ['programming', 'AI', 'web development'],
      createdAt: new Date('2024-01-15'),
      lastLoginAt: new Date()
    },
    {
      id: 'leader-1',
      email: 'leader@university.edu',
      password: 'leader123',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'club_leader',
      avatar: null,
      department: 'Computer Science',
      academicYear: 2024,
      phone: '+1234567891',
      bio: 'Computer Science Club Leader',
      interests: ['programming', 'leadership', 'teaching'],
      createdAt: new Date('2024-01-10'),
      lastLoginAt: new Date()
    }
  ];

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        
        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      
      console.log('🔐 Login attempt:', { email, password: '***', role });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        console.log('❌ User not found:', email);
        throw new Error('Invalid email or password');
      }
      
      console.log('✅ User found:', { email: user.email, role: user.role });
      
      // Check password
      if (password !== user.password) {
        console.log('❌ Password mismatch');
        throw new Error('Invalid email or password');
      }
      
      // Simple role validation - just check if the user can access with selected role
      const canAccess = 
        (role === 'administrator' && user.role === 'admin') ||
        (role === 'student' && user.role === 'member') ||
        (role === 'leader' && user.role === 'club_leader') ||
        role === user.role;
      
      if (!canAccess) {
        console.log('❌ Role mismatch:', { selectedRole: role, userRole: user.role });
        throw new Error(`Access denied. This account has role: ${user.role}`);
      }
      
      console.log('✅ Authentication successful:', { email: user.email, role: user.role });
      
      // Generate mock token
      const token = `mock-jwt-token-${Date.now()}`;
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (error) {
      console.error('❌ Login error:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      setUser(null);
      setIsAuthenticated(false);
      
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock password validation
      if (currentPassword.length < 6) {
        throw new Error('Current password is incorrect');
      }
      
      if (newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters');
      }
      
      return { success: true };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...profileData };
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      throw new Error('Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isClubLeader = () => {
    return user?.role === 'club_leader' || user?.role === 'club_vice_leader';
  };

  const isMember = () => {
    return user?.role === 'member';
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    changePassword,
    updateProfile,
    hasPermission,
    isAdmin,
    isClubLeader,
    isMember
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
