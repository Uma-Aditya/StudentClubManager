import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  UserPlus,
  UserMinus,
  Plus,
  Minus,
  Eye,
  Clock,
  Award,
  AlertTriangle
} from 'lucide-react';

const Overview = () => {
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalClubs: 23,
    activeEvents: 8,
    pendingApprovals: 5,
    monthlyGrowth: 12.5,
    userEngagement: 78.3,
    eventAttendance: 89.2,
    clubActivity: 65.7
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'user_joined',
      message: 'New user John Doe joined the Computer Science Club',
      time: '2 minutes ago',
      icon: UserPlus,
      color: 'text-green-400'
    },
    {
      id: 2,
      type: 'club_created',
      message: 'Photography Club was created by Sarah Wilson',
      time: '15 minutes ago',
      icon: Building,
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'event_scheduled',
      message: 'Tech Workshop scheduled for next Friday',
      time: '1 hour ago',
      icon: Calendar,
      color: 'text-purple-400'
    },
    {
      id: 4,
      type: 'approval_needed',
      message: 'New club proposal requires admin approval',
      time: '2 hours ago',
      icon: AlertTriangle,
      color: 'text-yellow-400'
    }
  ]);

  const [quickActions] = useState([
    {
      title: 'Create Club',
      description: 'Add a new student club',
      icon: Plus,
      color: 'bg-blue-500',
      action: () => console.log('Create Club')
    },
    {
      title: 'Approve Requests',
      description: 'Review pending approvals',
      icon: Eye,
      color: 'bg-green-500',
      action: () => console.log('Approve Requests')
    },
    {
      title: 'Generate Report',
      description: 'Create activity report',
      icon: TrendingUp,
      color: 'bg-purple-500',
      action: () => console.log('Generate Report')
    },
    {
      title: 'Manage Users',
      description: 'View and edit user accounts',
      icon: Users,
      color: 'bg-orange-500',
      action: () => console.log('Manage Users')
    }
  ]);

  const StatCard = ({ title, value, change, icon: Icon, color, trend = 'up' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300"
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {change}%
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-300 text-sm">{title}</p>
    </motion.div>
  );

  const ActivityItem = ({ activity, index }) => {
    const Icon = activity.icon;
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200"
      >
        <div className={`w-10 h-10 ${activity.color} bg-opacity-20 rounded-full flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm">{activity.message}</p>
          <p className="text-gray-400 text-xs">{activity.time}</p>
        </div>
      </motion.div>
    );
  };

  const QuickActionCard = ({ action, index }) => {
    const Icon = action.icon;
    return (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={action.action}
        className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 text-left hover:bg-white/15 transition-all duration-300 group"
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
        <p className="text-gray-300 text-sm">{action.description}</p>
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-300">Welcome back! Here's what's happening with your student clubs.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change={stats.monthlyGrowth}
          icon={Users}
          color="bg-blue-500"
          trend="up"
        />
        <StatCard
          title="Active Clubs"
          value={stats.totalClubs}
          change={-2.1}
          icon={Building}
          color="bg-green-500"
          trend="down"
        />
        <StatCard
          title="Active Events"
          value={stats.activeEvents}
          change={15.3}
          icon={Calendar}
          color="bg-purple-500"
          trend="up"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          change={8.7}
          icon={AlertTriangle}
          color="bg-yellow-500"
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <QuickActionCard key={action.title} action={action} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Engagement */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Recent Activity */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <ActivityItem key={activity.id} activity={activity} index={index} />
              ))}
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Engagement Metrics</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">User Engagement</span>
                  <span className="text-white font-semibold">{stats.userEngagement}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.userEngagement}%` }}
                    className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Event Attendance</span>
                  <span className="text-white font-semibold">{stats.eventAttendance}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.eventAttendance}%` }}
                    className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Club Activity</span>
                  <span className="text-white font-semibold">{stats.clubActivity}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.clubActivity}%` }}
                    className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Monthly Growth</span>
                  <span className="text-white font-semibold">+{stats.monthlyGrowth}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(stats.monthlyGrowth * 5, 100)}%` }}
                    className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Top Performing Club</h3>
          <p className="text-gray-300 text-sm">Computer Science Club</p>
          <p className="text-primary-400 text-xs mt-1">98% engagement rate</p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Next Event</h3>
          <p className="text-gray-300 text-sm">Tech Workshop</p>
          <p className="text-primary-400 text-xs mt-1">In 2 days</p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">System Status</h3>
          <p className="text-green-400 text-sm">All Systems Operational</p>
          <p className="text-gray-400 text-xs mt-1">99.9% uptime</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
