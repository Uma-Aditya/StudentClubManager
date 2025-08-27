import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Megaphone, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Star,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { clubsAPI, eventsAPI, announcementsAPI, membershipsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const LeaderDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [club, setClub] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    upcomingEvents: 0,
    totalEvents: 0
  });

  useEffect(() => {
    fetchLeaderData();
  }, []);

  const fetchLeaderData = async () => {
    try {
      setLoading(true);
      
      // Fetch club details
      if (user?.clubId) {
        const clubResponse = await clubsAPI.getById(user.clubId);
        if (clubResponse.data.success) {
          setClub(clubResponse.data.data);
        }
      }

      // Fetch club events
      if (user?.clubId) {
        const eventsResponse = await eventsAPI.getAll({ clubId: user.clubId, limit: 5 });
        if (eventsResponse.data.success) {
          setRecentEvents(eventsResponse.data.data);
        }
      }

      // Fetch announcements
      if (user?.clubId) {
        const announcementsResponse = await announcementsAPI.getByClub(user.clubId);
        if (announcementsResponse.data.success) {
          setAnnouncements(announcementsResponse.data.data);
        }
      }

      // Fetch members
      if (user?.clubId) {
        const membersResponse = await membershipsAPI.getByClub(user.clubId);
        if (membersResponse.data.success) {
          setMembers(membersResponse.data.data);
          setStats(prev => ({
            ...prev,
            totalMembers: membersResponse.data.data.length,
            activeMembers: membersResponse.data.data.filter(m => m.status === 'active').length
          }));
        }
      }

      // Fetch event stats
      if (user?.clubId) {
        const eventsResponse = await eventsAPI.getAll({ clubId: user.clubId });
        if (eventsResponse.data.success) {
          const events = eventsResponse.data.data;
          setStats(prev => ({
            ...prev,
            totalEvents: events.length,
            upcomingEvents: events.filter(e => e.status === 'upcoming').length
          }));
        }
      }

    } catch (error) {
      console.error('Error fetching leader data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventsAPI.delete(eventId);
        toast.success('Event deleted successfully');
        fetchLeaderData();
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await announcementsAPI.delete(announcementId);
        toast.success('Announcement deleted successfully');
        fetchLeaderData();
      } catch (error) {
        toast.error('Failed to delete announcement');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">No Club Found</h1>
          <p className="text-gray-300">You are not associated with any club as a leader.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 mb-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{club.name.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.firstName}!</h1>
                  <p className="text-gray-300 text-lg">You're leading the {club.name} club</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                New Event
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <Megaphone className="w-4 h-4" />
                Announcement
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-white font-semibold">Total Members</h3>
                <p className="text-3xl font-bold text-blue-400">{stats.totalMembers}</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              {stats.activeMembers} active members
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-white font-semibold">Upcoming Events</h3>
                <p className="text-3xl font-bold text-green-400">{stats.upcomingEvents}</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              {stats.totalEvents} total events
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-white font-semibold">Engagement</h3>
                <p className="text-3xl font-bold text-purple-400">
                  {stats.totalMembers > 0 ? Math.round((stats.activeMembers / stats.totalMembers) * 100) : 0}%
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Member participation rate
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-8 h-8 text-yellow-400" />
              <div>
                <h3 className="text-white font-semibold">Recent Activity</h3>
                <p className="text-3xl font-bold text-yellow-400">
                  {announcements.length + recentEvents.length}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Updates this week
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Events</h2>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentEvents.length > 0 ? (
                recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.startTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' :
                        event.status === 'ongoing' ? 'bg-green-500/20 text-green-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {event.status}
                      </span>
                      <div className="flex gap-1">
                        <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-green-400 hover:text-green-300 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No events scheduled yet</p>
                  <button className="mt-2 text-blue-400 hover:text-blue-300">
                    Create your first event
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions & Announcements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <Plus className="w-5 h-5" />
                  Create Event
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  <Megaphone className="w-5 h-5" />
                  Send Announcement
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  <Users className="w-5 h-5" />
                  Manage Members
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                  <TrendingUp className="w-5 h-5" />
                  View Analytics
                </button>
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Announcements</h3>
              <div className="space-y-3">
                {announcements.length > 0 ? (
                  announcements.slice(0, 3).map((announcement) => (
                    <div key={announcement.id} className="p-3 bg-white/5 rounded-lg">
                      <h4 className="text-white font-medium text-sm mb-1">{announcement.title}</h4>
                      <p className="text-gray-400 text-xs mb-2">{announcement.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-xs">
                          {new Date(announcement.createdAt).toLocaleDateString()}
                        </span>
                        <button 
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-4">
                    <Megaphone className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No announcements yet</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Members Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mt-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Club Members</h2>
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              View All Members
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.slice(0, 6).map((member) => (
              <div key={member.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {member.user.firstName.charAt(0)}{member.user.lastName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">
                      {member.user.firstName} {member.user.lastName}
                    </h4>
                    <div className="flex items-center gap-2">
                      {member.role === 'leader' && <Star className="w-3 h-3 text-yellow-400" />}
                      {member.role === 'vice_leader' && <Star className="w-3 h-3 text-blue-400" />}
                      <span className="text-xs text-gray-400 capitalize">
                        {member.role.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{member.user.email}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    member.status === 'active' ? 'bg-green-500/20 text-green-300' :
                    member.status === 'inactive' ? 'bg-red-500/20 text-red-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderDashboard;
