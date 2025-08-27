import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X,
  Home,
  Users,
  Calendar,
  Megaphone,
  Trophy,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch notifications
    if (user) {
      // Mock notifications - replace with actual API call
      setNotifications([
        {
          id: 1,
          title: 'New Event',
          message: 'Photography Club workshop starts in 2 hours',
          isRead: false,
          timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
        },
        {
          id: 2,
          title: 'Achievement Unlocked',
          message: 'You earned the "Active Member" badge!',
          isRead: false,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        }
      ]);
      setUnreadCount(2);
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Clubs', href: '/clubs', icon: Users },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Announcements', href: '/announcements', icon: Megaphone },
    { name: 'Achievements', href: '/achievements', icon: Trophy },
  ];

  const isActiveRoute = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="backdrop-blur-xl bg-white/10 border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">
                Student Clubs
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActiveRoute(item.href)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search clubs, events, people..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Right Side - User Menu & Notifications */}
          <div className="flex items-center gap-4">
            {/* Search Button for Mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(false)}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors relative"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg z-50"
                  >
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-3">Notifications</h3>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                notification.isRead ? 'bg-white/5' : 'bg-blue-500/10 border border-blue-500/20'
                              }`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <div className="flex items-start gap-3">
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                )}
                                <div className="flex-1">
                                  <h4 className="text-white font-medium text-sm mb-1">
                                    {notification.title}
                                  </h4>
                                  <p className="text-gray-300 text-xs mb-2">
                                    {notification.message}
                                  </p>
                                  <span className="text-gray-500 text-xs">
                                    {notification.timestamp.toLocaleTimeString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-400 py-4">
                            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No notifications</p>
                          </div>
                        )}
                      </div>
                      {notifications.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm transition-colors">
                            View all notifications
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-white font-semibold text-sm">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  {user?.firstName}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg z-50"
                  >
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-white/20">
                        <p className="text-white text-sm font-medium">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-gray-400 text-sm">{user?.email}</p>
                      </div>
                      
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                      </div>
                      
                      <div className="py-1 border-t border-white/20">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/20"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search clubs, events, people..."
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActiveRoute(item.href)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
