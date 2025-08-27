import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Star, 
  Heart, 
  Bookmark, 
  MessageSquare, 
  Bell, 
  Settings,
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  Award,
  Trophy,
  Activity,
  Building2,
  User,
  Edit,
  Camera,
  Share2,
  Download,
  Upload
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const MemberFeatures = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [myClubs, setMyClubs] = useState([]);
  const [availableClubs, setAvailableClubs] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [myAchievements, setMyAchievements] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for member features
  const mockMyClubs = [
    {
      id: '1',
      name: 'Computer Science Club',
      role: 'member',
      joinedAt: '2024-02-15',
      memberCount: 45,
      category: 'technology',
      nextMeeting: '2024-02-20 18:00',
      location: 'Room 301, Engineering Building',
      isActive: true
    },
    {
      id: '2',
      name: 'Photography Club',
      role: 'member',
      joinedAt: '2024-02-10',
      memberCount: 32,
      category: 'arts',
      nextMeeting: '2024-02-22 19:00',
      location: 'Art Studio, Fine Arts Building',
      isActive: true
    }
  ];

  const mockAvailableClubs = [
    {
      id: '3',
      name: 'Debate Club',
      category: 'academic',
      memberCount: 28,
      description: 'Develop critical thinking and public speaking skills',
      rating: 4.7,
      meetingTime: 'Every Monday, 5:30 PM',
      location: 'Conference Room A, Library',
      tags: ['debate', 'public speaking', 'critical thinking']
    },
    {
      id: '4',
      name: 'Basketball Club',
      category: 'sports',
      memberCount: 15,
      description: 'Stay fit and have fun playing basketball',
      rating: 4.5,
      meetingTime: 'Every Saturday, 2:00 PM',
      location: 'University Gymnasium',
      tags: ['basketball', 'sports', 'fitness']
    },
    {
      id: '5',
      name: 'Music Ensemble',
      category: 'music',
      memberCount: 22,
      description: 'Create beautiful music together',
      rating: 4.9,
      meetingTime: 'Every Wednesday, 6:30 PM',
      location: 'Music Hall, Performing Arts Center',
      tags: ['music', 'ensemble', 'concerts']
    }
  ];

  const mockMyEvents = [
    {
      id: '1',
      title: 'Coding Workshop: React Basics',
      club: 'Computer Science Club',
      date: '2024-02-15',
      time: '6:00 PM',
      location: 'Room 301, Engineering Building',
      status: 'registered',
      attendees: 25,
      maxAttendees: 30
    },
    {
      id: '2',
      title: 'Photo Walk',
      club: 'Photography Club',
      date: '2024-02-18',
      time: '3:00 PM',
      location: 'Central Park',
      status: 'registered',
      attendees: 18,
      maxAttendees: 25
    }
  ];

  const mockUpcomingEvents = [
    {
      id: '3',
      title: 'Debate Tournament',
      club: 'Debate Club',
      date: '2024-02-25',
      time: '5:30 PM',
      location: 'Conference Room A, Library',
      status: 'available',
      attendees: 12,
      maxAttendees: 20
    },
    {
      id: '4',
      title: 'Basketball Tournament',
      club: 'Basketball Club',
      date: '2024-02-28',
      time: '2:00 PM',
      location: 'University Gymnasium',
      status: 'available',
      attendees: 8,
      maxAttendees: 16
    }
  ];

  const mockAchievements = [
    {
      id: '1',
      title: 'First Event',
      description: 'Attended your first club event',
      icon: Star,
      color: 'yellow',
      earnedAt: '2024-01-20',
      points: 50
    },
    {
      id: '2',
      title: 'Active Member',
      description: 'Joined 3 different clubs',
      icon: Users,
      color: 'blue',
      earnedAt: '2024-02-01',
      points: 100
    },
    {
      id: '3',
      title: 'Event Organizer',
      description: 'Helped organize a club event',
      icon: Trophy,
      color: 'green',
      earnedAt: '2024-02-10',
      points: 150
    }
  ];

  const mockNotifications = [
    {
      id: '1',
      title: 'New Event: Coding Workshop',
      message: 'A new coding workshop has been scheduled for next week',
      club: 'Computer Science Club',
      type: 'event',
      isRead: false,
      createdAt: '2024-02-14 10:30'
    },
    {
      id: '2',
      title: 'Club Meeting Reminder',
      message: 'Don\'t forget about the Photography Club meeting tomorrow',
      club: 'Photography Club',
      type: 'reminder',
      isRead: false,
      createdAt: '2024-02-14 09:15'
    },
    {
      id: '3',
      title: 'Achievement Unlocked',
      message: 'Congratulations! You\'ve earned the "Active Member" badge',
      club: 'System',
      type: 'achievement',
      isRead: true,
      createdAt: '2024-02-13 16:45'
    }
  ];

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setMyClubs(mockMyClubs);
      setAvailableClubs(mockAvailableClubs);
      setMyEvents(mockMyEvents);
      setUpcomingEvents(mockUpcomingEvents);
      setMyAchievements(mockAchievements);
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const handleJoinClub = (clubId) => {
    const club = availableClubs.find(c => c.id === clubId);
    if (club) {
      const newClub = {
        ...club,
        role: 'member',
        joinedAt: new Date().toISOString().split('T')[0],
        isActive: true
      };
      setMyClubs([...myClubs, newClub]);
      setAvailableClubs(availableClubs.filter(c => c.id !== clubId));
      toast.success(`Successfully joined ${club.name}!`);
    }
  };

  const handleLeaveClub = (clubId) => {
    const club = myClubs.find(c => c.id === clubId);
    if (club) {
      setMyClubs(myClubs.filter(c => c.id !== clubId));
      setAvailableClubs([...availableClubs, club]);
      toast.success(`Left ${club.name} successfully`);
    }
  };

  const handleRegisterEvent = (eventId) => {
    const event = upcomingEvents.find(e => e.id === eventId);
    if (event) {
      const newEvent = { ...event, status: 'registered' };
      setMyEvents([...myEvents, newEvent]);
      setUpcomingEvents(upcomingEvents.filter(e => e.id !== eventId));
      toast.success(`Successfully registered for ${event.title}!`);
    }
  };

  const handleUnregisterEvent = (eventId) => {
    const event = myEvents.find(e => e.id === eventId);
    if (event) {
      const newEvent = { ...event, status: 'available' };
      setMyEvents(myEvents.filter(e => e.id !== eventId));
      setUpcomingEvents([...upcomingEvents, newEvent]);
      toast.success(`Unregistered from ${event.title}`);
    }
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const getCategoryIcon = (category) => {
    const icons = {
      technology: Building2,
      arts: Camera,
      sports: Activity,
      academic: Star,
      music: Award
    };
    return icons[category] || Building2;
  };

  const getCategoryColor = (category) => {
    const colors = {
      technology: 'blue',
      arts: 'purple',
      sports: 'green',
      academic: 'orange',
      music: 'pink'
    };
    return colors[category] || 'gray';
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'clubs', label: 'My Clubs', icon: Building2 },
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white text-center mt-4">Loading member features...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Member Portal</h1>
              <p className="text-gray-300">Welcome back, {user?.firstName}! Manage your clubs and activities.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">{myClubs.length} Clubs</p>
                <p className="text-gray-400 text-sm">Active memberships</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{myEvents.length} Events</p>
                <p className="text-gray-400 text-sm">Registered</p>
              </div>
            </div>
          </div>
        </motion.div>

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

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">My Clubs</p>
                    <p className="text-3xl font-bold text-white">{myClubs.length}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Upcoming Events</p>
                    <p className="text-3xl font-bold text-white">{myEvents.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Achievements</p>
                    <p className="text-3xl font-bold text-white">{myAchievements.length}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Notifications</p>
                    <p className="text-3xl font-bold text-white">{notifications.filter(n => !n.isRead).length}</p>
                  </div>
                  <Bell className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Joined Photography Club', time: '2 days ago', icon: Building2, color: 'green' },
                  { action: 'Registered for Coding Workshop', time: '3 days ago', icon: Calendar, color: 'blue' },
                  { action: 'Earned "Active Member" badge', time: '1 week ago', icon: Trophy, color: 'yellow' },
                  { action: 'Attended Photo Walk event', time: '1 week ago', icon: Activity, color: 'purple' }
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                      <div className={`w-10 h-10 bg-${activity.color}-500/20 rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${activity.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'clubs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">My Clubs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myClubs.map((club) => {
                const Icon = getCategoryIcon(club.category);
                return (
                  <div key={club.id} className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-${getCategoryColor(club.category)}-500/20 rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${getCategoryColor(club.category)}-400`} />
                      </div>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        {club.role}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2">{club.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{club.memberCount} members</p>
                    
                    <div className="space-y-2 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Next: {club.nextMeeting}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {club.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                        View Details
                      </button>
                      <button
                        onClick={() => handleLeaveClub(club.id)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                      >
                        Leave
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'discover' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Discover Clubs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableClubs.map((club) => {
                const Icon = getCategoryIcon(club.category);
                return (
                  <div key={club.id} className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-${getCategoryColor(club.category)}-500/20 rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${getCategoryColor(club.category)}-400`} />
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm">{club.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2">{club.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{club.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {club.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {club.memberCount} members
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {club.meetingTime}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleJoinClub(club.id)}
                      className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      Join Club
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Events</h2>
            
            {/* My Events */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">My Registered Events</h3>
              <div className="space-y-4">
                {myEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{event.title}</h4>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        Registered
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{event.club}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {event.attendees}/{event.maxAttendees} attendees
                      </span>
                      <button
                        onClick={() => handleUnregisterEvent(event.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs transition-colors"
                      >
                        Unregister
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Events */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Available Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{event.title}</h4>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                        Available
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{event.club}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {event.attendees}/{event.maxAttendees} attendees
                      </span>
                      <button
                        onClick={() => handleRegisterEvent(event.id)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs transition-colors"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myAchievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div key={achievement.id} className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 text-center">
                    <div className={`w-16 h-16 bg-${achievement.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 text-${achievement.color}-400`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <span>{achievement.points} points</span>
                      <span>•</span>
                      <span>{new Date(achievement.earnedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 cursor-pointer transition-all duration-200 ${
                    !notification.isRead ? 'bg-white/15 border-blue-500/30' : ''
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${!notification.isRead ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-medium">{notification.title}</h3>
                        <span className="text-gray-400 text-sm">{notification.createdAt}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 text-sm">{notification.club}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          notification.type === 'event' ? 'bg-blue-500/20 text-blue-400' :
                          notification.type === 'reminder' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {notification.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MemberFeatures;
