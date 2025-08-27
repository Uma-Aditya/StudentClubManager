import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Building2,
  Calendar,
  TrendingUp,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Activity,
  BarChart3,
  PieChart,
  Settings,
  Bell,
  User,
  LogOut,
  Shield,
  Crown,
  Award,
  BookOpen,
  Camera,
  Music,
  Gamepad2,
  MapPin,
  Mail,
  Phone,
  Database,
  FileText,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckSquare,
  Square,
  Filter as FilterIcon,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [systemStats, setSystemStats] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [systemHealth, setSystemHealth] = useState({});

  // Mock data for clubs
  const mockClubs = [
    {
      id: '1',
      name: 'Computer Science Club',
      description: 'A club for computer science enthusiasts',
      category: 'technology',
      status: 'active',
      memberCount: 45,
      leader: 'John Smith',
      createdAt: '2024-01-15',
      logo: null,
      events: 8,
      revenue: 1200
    },
    {
      id: '2',
      name: 'Photography Club',
      description: 'Capture moments, create memories',
      category: 'arts',
      status: 'active',
      memberCount: 32,
      leader: 'Sarah Johnson',
      createdAt: '2024-01-20',
      logo: null,
      events: 5,
      revenue: 800
    },
    {
      id: '3',
      name: 'Debate Club',
      description: 'Develop critical thinking and public speaking skills',
      category: 'academic',
      status: 'pending',
      memberCount: 28,
      leader: 'Mike Davis',
      createdAt: '2024-02-01',
      logo: null,
      events: 3,
      revenue: 400
    },
    {
      id: '4',
      name: 'Basketball Club',
      description: 'Stay fit and have fun playing basketball',
      category: 'sports',
      status: 'suspended',
      memberCount: 15,
      leader: 'Alex Wilson',
      createdAt: '2024-01-10',
      logo: null,
      events: 2,
      revenue: 300
    }
  ];

  // Mock data for users
  const mockUsers = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@university.edu',
      role: 'member',
      department: 'Computer Science',
      status: 'active',
      joinedAt: '2024-01-15',
      lastLogin: '2024-02-14 10:30',
      clubs: ['Computer Science Club', 'Photography Club'],
      events: 12,
      achievements: 5
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@university.edu',
      role: 'club_leader',
      department: 'Fine Arts',
      status: 'active',
      joinedAt: '2024-01-10',
      lastLogin: '2024-02-14 09:15',
      clubs: ['Photography Club'],
      events: 8,
      achievements: 3
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Davis',
      email: 'mike.davis@university.edu',
      role: 'club_leader',
      department: 'Political Science',
      status: 'pending',
      joinedAt: '2024-02-01',
      lastLogin: '2024-02-13 16:45',
      clubs: ['Debate Club'],
      events: 4,
      achievements: 2
    },
    {
      id: '4',
      firstName: 'Alex',
      lastName: 'Wilson',
      email: 'alex.wilson@university.edu',
      role: 'member',
      department: 'Physical Education',
      status: 'suspended',
      joinedAt: '2024-01-05',
      lastLogin: '2024-02-10 14:20',
      clubs: ['Basketball Club'],
      events: 6,
      achievements: 1
    }
  ];

  // Mock system statistics
  const mockSystemStats = {
    totalUsers: 1250,
    activeUsers: 1180,
    totalClubs: 45,
    activeClubs: 42,
    totalEvents: 156,
    upcomingEvents: 23,
    totalRevenue: 15600,
    monthlyGrowth: 12.5,
    systemUptime: 99.8,
    databaseSize: '2.4 GB',
    activeSessions: 89
  };

  // Mock recent activities
  const mockRecentActivities = [
    {
      id: '1',
      type: 'user_registration',
      user: 'Emma Brown',
      action: 'New user registered',
      timestamp: '2024-02-14 11:30',
      severity: 'info'
    },
    {
      id: '2',
      type: 'club_creation',
      user: 'David Chen',
      action: 'Created new club: Music Ensemble',
      timestamp: '2024-02-14 10:45',
      severity: 'info'
    },
    {
      id: '3',
      type: 'system_alert',
      user: 'System',
      action: 'Database backup completed',
      timestamp: '2024-02-14 09:00',
      severity: 'success'
    },
    {
      id: '4',
      type: 'security_alert',
      user: 'System',
      action: 'Multiple failed login attempts detected',
      timestamp: '2024-02-14 08:15',
      severity: 'warning'
    }
  ];

  // Mock pending approvals
  const mockPendingApprovals = [
    {
      id: '1',
      type: 'club_approval',
      title: 'New Club: Gaming Club',
      description: 'Request to create a new gaming club',
      requester: 'David Chen',
      submittedAt: '2024-02-14 10:30',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'user_approval',
      title: 'Club Leader Application',
      description: 'Mike Davis applying for Debate Club leadership',
      requester: 'Mike Davis',
      submittedAt: '2024-02-14 09:15',
      priority: 'high'
    },
    {
      id: '3',
      type: 'event_approval',
      title: 'Large Event: Tech Conference',
      description: 'Request to host a 200-person tech conference',
      requester: 'Computer Science Club',
      submittedAt: '2024-02-14 08:45',
      priority: 'high'
    }
  ];

  // Mock system health
  const mockSystemHealth = {
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 92,
    database: 88,
    api: 95
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setClubs(mockClubs);
      setUsers(mockUsers);
      setSystemStats(mockSystemStats);
      setRecentActivities(mockRecentActivities);
      setPendingApprovals(mockPendingApprovals);
      setSystemHealth(mockSystemHealth);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    {
      title: 'Total Clubs',
      value: clubs.length,
      change: '+12%',
      changeType: 'positive',
      icon: Building2,
      color: 'blue'
    },
    {
      title: 'Active Members',
      value: clubs.reduce((sum, club) => sum + club.memberCount, 0),
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Pending Approvals',
      value: clubs.filter(club => club.status === 'pending').length,
      change: '+3',
      changeType: 'neutral',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Suspended Clubs',
      value: clubs.filter(club => club.status === 'suspended').length,
      change: '-1',
      changeType: 'negative',
      icon: XCircle,
      color: 'red'
    }
  ];

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || club.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateClub = (clubData) => {
    const newClub = {
      id: Date.now().toString(),
      ...clubData,
      memberCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setClubs([...clubs, newClub]);
    setShowCreateModal(false);
    toast.success('Club created successfully!');
  };

  const handleUpdateClub = (clubId, updatedData) => {
    setClubs(clubs.map(club => 
      club.id === clubId ? { ...club, ...updatedData } : club
    ));
    setSelectedClub(null);
    toast.success('Club updated successfully!');
  };

  const handleDeleteClub = (clubId) => {
    if (window.confirm('Are you sure you want to delete this club? This action cannot be undone.')) {
      setClubs(clubs.filter(club => club.id !== clubId));
      toast.success('Club deleted successfully!');
    }
  };

    const handleStatusChange = (clubId, newStatus) => {
    setClubs(clubs.map(club =>
      club.id === clubId ? { ...club, status: newStatus } : club
    ));
    toast.success(`Club status updated to ${newStatus}`);
  };

  // User management functions
  const handleUserStatusChange = (userId, newStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast.success(`User status updated to ${newStatus}`);
  };

  const handleUserRoleChange = (userId, newRole) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
    toast.success(`User role updated to ${newRole}`);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    }
  };

  // Approval functions
  const handleApproveRequest = (requestId) => {
    setPendingApprovals(pendingApprovals.filter(req => req.id !== requestId));
    toast.success('Request approved successfully');
  };

  const handleRejectRequest = (requestId) => {
    setPendingApprovals(pendingApprovals.filter(req => req.id !== requestId));
    toast.error('Request rejected');
  };

  // System functions
  const handleSystemBackup = () => {
    toast.success('System backup initiated');
  };

  const handleSystemRestart = () => {
    if (window.confirm('Are you sure you want to restart the system?')) {
      toast.success('System restart initiated');
    }
  };

  const handleDatabaseOptimization = () => {
    toast.success('Database optimization started');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'clubs', label: 'Club Management', icon: Building2 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'approvals', label: 'Approvals', icon: CheckSquare },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'system', label: 'System', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'technology': return 'bg-blue-100 text-blue-800';
      case 'arts': return 'bg-purple-100 text-purple-800';
      case 'sports': return 'bg-green-100 text-green-800';
      case 'academic': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white text-center mt-4">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-300 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">{user?.firstName} {user?.lastName}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

                        {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    {/* System Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-300 text-sm font-medium">Total Users</p>
                            <p className="text-3xl font-bold text-white mt-2">{systemStats.totalUsers}</p>
                            <div className="flex items-center gap-1 mt-2 text-green-400">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-sm font-medium">+{systemStats.monthlyGrowth}%</span>
                            </div>
                          </div>
                          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-400" />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-300 text-sm font-medium">Active Clubs</p>
                            <p className="text-3xl font-bold text-white mt-2">{systemStats.activeClubs}</p>
                            <div className="flex items-center gap-1 mt-2 text-green-400">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-sm font-medium">+3 this month</span>
                            </div>
                          </div>
                          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-green-400" />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-300 text-sm font-medium">Total Revenue</p>
                            <p className="text-3xl font-bold text-white mt-2">${systemStats.totalRevenue}</p>
                            <div className="flex items-center gap-1 mt-2 text-green-400">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-sm font-medium">+8.5%</span>
                            </div>
                          </div>
                          <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                            <Star className="w-6 h-6 text-yellow-400" />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-300 text-sm font-medium">System Uptime</p>
                            <p className="text-3xl font-bold text-white mt-2">{systemStats.systemUptime}%</p>
                            <div className="flex items-center gap-1 mt-2 text-green-400">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">Healthy</span>
                            </div>
                          </div>
                          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <Database className="w-6 h-6 text-purple-400" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* System Health & Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* System Health */}
                      <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                        <h3 className="text-xl font-bold text-white mb-4">System Health</h3>
                        <div className="space-y-4">
                          {Object.entries(systemHealth).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-gray-300 capitalize">{key}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-700 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      value > 80 ? 'bg-green-500' : 
                                      value > 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${value}%` }}
                                  ></div>
                                </div>
                                <span className="text-white text-sm w-8">{value}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                          {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                              <div className={`w-2 h-2 rounded-full ${
                                activity.severity === 'success' ? 'bg-green-400' :
                                activity.severity === 'warning' ? 'bg-yellow-400' :
                                activity.severity === 'error' ? 'bg-red-400' : 'bg-blue-400'
                              }`}></div>
                              <div className="flex-1">
                                <p className="text-white font-medium">{activity.action}</p>
                                <p className="text-gray-300 text-sm">by {activity.user}</p>
                              </div>
                              <span className="text-gray-400 text-sm">{activity.timestamp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pending Approvals */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Pending Approvals</h3>
                        <span className="text-yellow-400 text-sm">{pendingApprovals.length} pending</span>
                      </div>
                      <div className="space-y-4">
                        {pendingApprovals.slice(0, 3).map((approval) => (
                          <div key={approval.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                            <div>
                              <h4 className="text-white font-medium">{approval.title}</h4>
                              <p className="text-gray-300 text-sm">{approval.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                <span>by {approval.requester}</span>
                                <span>{approval.submittedAt}</span>
                                <span className={`px-2 py-1 rounded-full ${
                                  approval.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                  approval.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-green-500/20 text-green-400'
                                }`}>
                                  {approval.priority}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleApproveRequest(approval.id)}
                                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectRequest(approval.id)}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

        {/* Club Management Tab */}
        {activeTab === 'clubs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header with Search and Create */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search clubs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                Create Club
              </button>
            </div>

            {/* Clubs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{club.name}</h3>
                      <p className="text-gray-300 text-sm mb-2">{club.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(club.category)}`}>
                          {club.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(club.status)}`}>
                          {club.status}
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                    <span>Leader: {club.leader}</span>
                    <span>{club.memberCount} members</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedClub(club)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClub(club.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                    {club.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(club.id, 'active')}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredClubs.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg">No clubs found</p>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </motion.div>
        )}

                        {/* User Management Tab */}
                {activeTab === 'users' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Header with Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="all">All Roles</option>
                          <option value="member">Members</option>
                          <option value="club_leader">Club Leaders</option>
                          <option value="admin">Admins</option>
                        </select>
                        <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </div>
                      <button
                        onClick={() => setShowUserModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
                      >
                        <Plus className="w-5 h-5" />
                        Add User
                      </button>
                    </div>

                    {/* Users Table */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-white/5">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Login</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            {users.map((user) => (
                              <tr key={user.id} className="hover:bg-white/5">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                      <span className="text-white font-bold">
                                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                      </span>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-white">
                                        {user.firstName} {user.lastName}
                                      </div>
                                      <div className="text-sm text-gray-300">{user.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                                    user.role === 'club_leader' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-green-500/20 text-green-400'
                                  }`}>
                                    {user.role.replace('_', ' ')}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {user.department}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                    user.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                                  }`}>
                                    {user.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {user.lastLogin}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => setSelectedUser(user)}
                                      className="text-blue-400 hover:text-blue-300"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteUser(user.id)}
                                      className="text-red-400 hover:text-red-300"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Approvals Tab */}
                {activeTab === 'approvals' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Pending Approvals</h2>
                    
                    <div className="space-y-4">
                      {pendingApprovals.map((approval) => (
                        <div key={approval.id} className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-white">{approval.title}</h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  approval.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                  approval.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-green-500/20 text-green-400'
                                }`}>
                                  {approval.priority}
                                </span>
                              </div>
                              <p className="text-gray-300 mb-3">{approval.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span>Requester: {approval.requester}</span>
                                <span>Submitted: {approval.submittedAt}</span>
                                <span>Type: {approval.type.replace('_', ' ')}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleApproveRequest(approval.id)}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectRequest(approval.id)}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* System Tab */}
                {activeTab === 'system' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">System Management</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* System Health */}
                      <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                        <h3 className="text-xl font-bold text-white mb-4">System Health</h3>
                        <div className="space-y-4">
                          {Object.entries(systemHealth).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-gray-300 capitalize">{key}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-32 bg-gray-700 rounded-full h-3">
                                  <div 
                                    className={`h-3 rounded-full ${
                                      value > 80 ? 'bg-green-500' : 
                                      value > 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${value}%` }}
                                  ></div>
                                </div>
                                <span className="text-white text-sm w-12">{value}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* System Actions */}
                      <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                        <h3 className="text-xl font-bold text-white mb-4">System Actions</h3>
                        <div className="space-y-3">
                          <button
                            onClick={handleSystemBackup}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            <Database className="w-5 h-5" />
                            Create System Backup
                          </button>
                          <button
                            onClick={handleDatabaseOptimization}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          >
                            <RefreshCw className="w-5 h-5" />
                            Optimize Database
                          </button>
                          <button
                            onClick={handleSystemRestart}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          >
                            <AlertTriangle className="w-5 h-5" />
                            Restart System
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* System Information */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                      <h3 className="text-xl font-bold text-white mb-4">System Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Database Size:</span>
                          <span className="text-white">{systemStats.databaseSize}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Active Sessions:</span>
                          <span className="text-white">{systemStats.activeSessions}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">System Uptime:</span>
                          <span className="text-white">{systemStats.systemUptime}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Total Events:</span>
                          <span className="text-white">{systemStats.totalEvents}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

        {activeTab === 'analytics' && (
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Analytics</h3>
            <p className="text-gray-300">Analytics dashboard coming soon...</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Settings</h3>
            <p className="text-gray-300">System settings coming soon...</p>
          </div>
        )}
      </div>

      {/* Create/Edit Club Modal */}
      {(showCreateModal || selectedClub) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {selectedClub ? 'Edit Club' : 'Create New Club'}
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Club Name</label>
                <input
                  type="text"
                  defaultValue={selectedClub?.name || ''}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter club name"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <textarea
                  defaultValue={selectedClub?.description || ''}
                  rows="3"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter club description"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Category</label>
                <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="technology">Technology</option>
                  <option value="arts">Arts</option>
                  <option value="sports">Sports</option>
                  <option value="academic">Academic</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedClub(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-colors"
                >
                  {selectedClub ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
