import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Users, 
  Calendar, 
  Search, 
  Filter, 
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const ClubList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const clubs = [
    {
      id: 1,
      name: 'Computer Science Club',
      description: 'A community for computer science enthusiasts to learn, collaborate, and innovate together.',
      category: 'Technology',
      memberCount: 45,
      status: 'active',
      createdAt: '2024-01-15',
      leader: 'John Doe',
      events: 8
    },
    {
      id: 2,
      name: 'Photography Club',
      description: 'Capture moments and develop photography skills through workshops and photo walks.',
      category: 'Arts & Culture',
      memberCount: 32,
      status: 'active',
      createdAt: '2024-02-01',
      leader: 'Sarah Wilson',
      events: 5
    },
    {
      id: 3,
      name: 'Environmental Science Club',
      description: 'Promoting environmental awareness and sustainability on campus.',
      category: 'Science',
      memberCount: 28,
      status: 'pending',
      createdAt: '2024-02-10',
      leader: 'Mike Johnson',
      events: 3
    },
    {
      id: 4,
      name: 'Business Innovation Club',
      description: 'Fostering entrepreneurship and business innovation among students.',
      category: 'Business',
      memberCount: 38,
      status: 'active',
      createdAt: '2024-01-20',
      leader: 'Emily Chen',
      events: 6
    }
  ];

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || club.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'inactive': return 'bg-red-500/20 text-red-400 border-red-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'bg-blue-500/20 text-blue-400 border-blue-400/30',
      'Arts & Culture': 'bg-purple-500/20 text-purple-400 border-purple-400/30',
      'Science': 'bg-green-500/20 text-green-400 border-green-400/30',
      'Business': 'bg-orange-500/20 text-orange-400 border-orange-400/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Club Management</h1>
            <p className="text-gray-300">Manage all student clubs and their activities</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Club
          </motion.button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClubs.map((club, index) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Club Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {club.name}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {club.description}
                </p>
              </div>
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Club Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">{club.memberCount} members</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">{club.events} events</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 text-xs rounded-full border ${getCategoryColor(club.category)}`}>
                {club.category}
              </span>
              <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(club.status)}`}>
                {club.status}
              </span>
            </div>

            {/* Club Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Leader:</span>
                <span className="text-white">{club.leader}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Created:</span>
                <span className="text-white">{club.createdAt}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 pt-4 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all duration-200"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClubs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No clubs found</h3>
          <p className="text-gray-300 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first club'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2 inline" />
              Create Club
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ClubList;
