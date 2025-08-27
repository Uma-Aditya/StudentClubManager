import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  Users,
  Calendar,
  Megaphone,
  Trophy,
  BarChart3,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  BookOpen,
  Award,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Sidebar = ({ isOpen, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Overview and statistics'
    },
    {
      name: 'Clubs',
      href: '/clubs',
      icon: Users,
      description: 'Manage your clubs'
    },
    {
      name: 'Events',
      href: '/events',
      icon: Calendar,
      description: 'Event management'
    },
    {
      name: 'Announcements',
      href: '/announcements',
      icon: Megaphone,
      description: 'Club announcements'
    },
    {
      name: 'Achievements',
      href: '/achievements',
      icon: Trophy,
      description: 'Badges and rewards'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Reports and insights'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Account preferences'
    }
  ];

  const isActiveRoute = (href) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const sidebarVariants = {
    open: { width: collapsed ? 80 : 280, opacity: 1 },
    closed: { width: 0, opacity: 0 }
  };

  const contentVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          className="fixed left-0 top-0 h-full bg-white/10 backdrop-blur-xl border-r border-white/20 z-40 overflow-hidden"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              {!collapsed && (
                <motion.div
                  variants={contentVariants}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <span className="text-white font-bold text-lg">Student Clubs</span>
                </motion.div>
              )}
              
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* User Info */}
            {!collapsed && (
              <motion.div
                variants={contentVariants}
                className="p-4 border-b border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-white font-semibold">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-gray-400 text-sm truncate">
                      {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActiveRoute(item.href)
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${
                      isActiveRoute(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`} />
                    
                    {!collapsed && (
                      <motion.div
                        variants={contentVariants}
                        className="flex-1 min-w-0"
                      >
                        <span className="font-medium">{item.name}</span>
                        <p className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Actions */}
            {!collapsed && (
              <motion.div
                variants={contentVariants}
                className="p-4 border-t border-white/20"
              >
                <h3 className="text-white font-medium text-sm mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm">
                    <Bell className="w-4 h-4" />
                    Notifications
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm">
                    <BookOpen className="w-4 h-4" />
                    Help & Support
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm">
                    <Award className="w-4 h-4" />
                    View Achievements
                  </button>
                </div>
              </motion.div>
            )}

            {/* Footer */}
            <div className="p-4 border-t border-white/20">
              {!collapsed ? (
                <motion.div
                  variants={contentVariants}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-3 px-3 py-2 text-gray-400 text-sm">
                    <Activity className="w-4 h-4" />
                    <span>Online</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
