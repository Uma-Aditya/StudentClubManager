import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  Building,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  UserCheck,
  FileText,
  Bell,
  Search,
  ChevronDown,
  Crown
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Overview', href: '/admin', icon: Home },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Club Management', href: '/admin/clubs', icon: Building },
    { name: 'Event Management', href: '/admin/events', icon: Calendar },
    { name: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3 },
    { name: 'Approvals', href: '/admin/approvals', icon: UserCheck },
    { name: 'Content Management', href: '/admin/content', icon: FileText },
    { name: 'System Settings', href: '/admin/settings', icon: Settings }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActiveRoute = (href) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  const Sidebar = () => (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900/95 backdrop-blur-xl border-r border-white/20 shadow-2xl"
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Admin Panel</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActiveRoute(item.href)
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-400/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
            <span className="text-primary-400 font-semibold text-sm">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-400 truncate capitalize">
              {user?.role?.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const TopBar = () => (
    <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-xl border-b border-white/20">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
            <span>Admin</span>
            <ChevronDown className="w-4 h-4" />
            <span className="text-white">
              {navigation.find(item => isActiveRoute(item.href))?.name || 'Dashboard'}
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-800/50 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none w-48"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center">
                <span className="text-primary-400 font-semibold text-sm">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl py-2"
                >
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-sm font-medium text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {user?.role?.replace('_', ' ')}
                    </p>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      to="/admin/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </div>
                  
                  <div className="border-t border-white/10 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && <Sidebar />}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <TopBar />
        
        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
