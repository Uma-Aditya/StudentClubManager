import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Search, 
  Filter, 
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  TrendingUp
} from 'lucide-react';

const EventList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const events = [
    {
      id: 1,
      title: 'Tech Workshop: Introduction to AI',
      description: 'Learn the basics of artificial intelligence and machine learning in this hands-on workshop.',
      club: 'Computer Science Club',
      date: '2024-03-15',
      time: '14:00',
      location: 'Engineering Building, Room 201',
      capacity: 50,
      registered: 35,
      status: 'upcoming',
      category: 'Workshop'
    },
    {
      id: 2,
      title: 'Photography Exhibition',
      description: 'Showcase of student photography work from the Photography Club.',
      club: 'Photography Club',
      date: '2024-03-10',
      time: '18:00',
      location: 'Student Center Gallery',
      capacity: 100,
      registered: 78,
      status: 'upcoming',
      category: 'Exhibition'
    },
    {
      id: 3,
      title: 'Environmental Awareness Seminar',
      description: 'Discussion on climate change and sustainable practices for students.',
      club: 'Environmental Science Club',
      date: '2024-03-08',
      time: '16:00',
      location: 'Science Building, Auditorium',
      capacity: 200,
      registered: 145,
      status: 'ongoing',
      category: 'Seminar'
    },
    {
      id: 4,
      title: 'Business Pitch Competition',
      description: 'Students present their business ideas to a panel of judges.',
      club: 'Business Innovation Club',
      date: '2024-03-20',
      time: '19:00',
      location: 'Business School, Conference Room',
      capacity: 80,
      registered: 62,
      status: 'upcoming',
      category: 'Competition'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'ongoing': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Workshop': 'bg-purple-500/20 text-purple-400 border-purple-400/30',
      'Exhibition': 'bg-pink-500/20 text-pink-400 border-pink-400/30',
      'Seminar': 'bg-green-500/20 text-green-400 border-green-400/30',
      'Competition': 'bg-orange-500/20 text-orange-400 border-orange-400/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  };

  const getRegistrationProgress = (registered, capacity) => {
    return (registered / capacity) * 100;
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
            <h1 className="text-3xl font-bold text-white mb-2">Event Management</h1>
            <p className="text-gray-300">Manage all club events and activities</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
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
                placeholder="Search events..."
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
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Event Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {event.description}
                </p>
              </div>
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">{event.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">{event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">{event.club}</span>
              </div>
            </div>

            {/* Registration Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Registration</span>
                <span className="text-white">{event.registered}/{event.capacity}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getRegistrationProgress(event.registered, event.capacity)}%` }}
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    getRegistrationProgress(event.registered, event.capacity) > 80 
                      ? 'bg-green-500' 
                      : getRegistrationProgress(event.registered, event.capacity) > 50 
                      ? 'bg-yellow-500' 
                      : 'bg-blue-500'
                  }`}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 text-xs rounded-full border ${getCategoryColor(event.category)}`}>
                {event.category}
              </span>
              <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(event.status)}`}>
                {event.status}
              </span>
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
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
          <p className="text-gray-300 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first event'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2 inline" />
              Create Event
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default EventList;
