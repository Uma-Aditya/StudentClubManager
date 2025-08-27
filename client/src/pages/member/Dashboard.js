import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building2, 
  Calendar, 
  TrendingUp, 
  Search, 
  Heart,
  Star,
  Activity,
  Bell,
  User,
  LogOut,
  Plus,
  MapPin,
  Clock,
  Users2,
  Award,
  BookOpen,
  Camera,
  Music,
  Gamepad2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const MemberDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [clubs, setClubs] = useState([]);
  const [myClubs, setMyClubs] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockClubs = [
    {
      id: '1',
      name: 'Computer Science Club',
      description: 'A club for computer science enthusiasts',
      category: 'technology',
      memberCount: 45,
      leader: 'John Smith',
      logo: null,
      isJoined: true,
      rating: 4.8,
      meetingTime: 'Every Tuesday, 6:00 PM',
      location: 'Room 301, Engineering Building'
    },
    {
      id: '2',
      name: 'Photography Club',
      description: 'Capture moments, create memories',
      category: 'arts',
      memberCount: 32,
      leader: 'Sarah Johnson',
      logo: null,
      isJoined: false,
      rating: 4.6,
      meetingTime: 'Every Thursday, 7:00 PM',
      location: 'Art Studio, Fine Arts Building'
    },
    {
      id: '3',
      name: 'Debate Club',
      description: 'Develop critical thinking and public speaking skills',
      category: 'academic',
      memberCount: 28,
      leader: 'Mike Davis',
      logo: null,
      isJoined: false,
      rating: 4.7,
      meetingTime: 'Every Monday, 5:30 PM',
      location: 'Conference Room A, Library'
    },
    {
      id: '4',
      name: 'Basketball Club',
      description: 'Stay fit and have fun playing basketball',
      category: 'sports',
      memberCount: 15,
      leader: 'Alex Wilson',
      logo: null,
      isJoined: true,
      rating: 4.5,
      meetingTime: 'Every Saturday, 2:00 PM',
      location: 'University Gymnasium'
    }
  ];

  const mockEvents = [
    {
      id: '1',
      title: 'Coding Workshop',
      club: 'Computer Science Club',
      date: '2024-02-15',
      time: '6:00 PM',
      location: 'Room 301, Engineering Building',
      attendees: 25,
      maxAttendees: 30,
      isRegistered: true
    },
    {
      id: '2',
      title: 'Photo Walk',
      club: 'Photography Club',
      date: '2024-02-18',
      time: '3:00 PM',
      location: 'Central Park',
      attendees: 18,
      maxAttendees: 25,
      isRegistered: false
    },
    {
      id: '3',
      title: 'Debate Tournament',
      club: 'Debate Club',
      date: '2024-02-20',
      time: '5:30 PM',
      location: 'Conference Room A, Library',
      attendees: 12,
      maxAttendees: 20,
      isRegistered: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setClubs(mockClubs);
      setMyClubs(mockClubs.filter(club => club.isJoined));
      setUpcomingEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    {
      title: 'My Clubs',
      value: myClubs.length,
      icon: Building2,
      color: 'blue'
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents.filter(event => event.isRegistered).length,
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Total Activities',
      value: 12,
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'Achievement Points',
      value: 850,
      icon: Award,
      color: 'yellow'
    }
  ];

  const categories = [
    { id: 'technology', label: 'Technology', icon: BookOpen, color: 'blue' },
    { id: 'arts', label: 'Arts', icon: Camera, color: 'purple' },
    { id: 'sports', label: 'Sports', icon: Activity, color: 'green' },
    { id: 'academic', label: 'Academic', icon: Star, color: 'orange' },
    { id: 'music', label: 'Music', icon: Music, color: 'pink' },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2, color: 'red' }
  ];

  const handleJoinClub = (clubId) => {
    setClubs(clubs.map(club => 
      club.id === clubId ? { ...club, isJoined: true } : club
    ));
    setMyClubs([...myClubs, clubs.find(club => club.id === clubId)]);
    toast.success('Successfully joined the club!');
  };

  const handleLeaveClub = (clubId) => {
    setClubs(clubs.map(club => 
      club.id === clubId ? { ...club, isJoined: false } : club
    ));
    setMyClubs(myClubs.filter(club => club.id !== clubId));
    toast.success('Left the club successfully');
  };

  const handleRegisterEvent = (eventId) => {
    setUpcomingEvents(upcomingEvents.map(event => 
      event.id === eventId ? { ...event, isRegistered: true } : event
    ));
    toast.success('Successfully registered for the event!');
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : Building2;
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'gray';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white text-center mt-4">Loading Member Dashboard...</p>
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
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Member Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-300 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome back, {user?.firstName}! 👋
              </h2>
              <p className="text-gray-300">
                Discover amazing clubs, join exciting events, and connect with fellow students.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/member"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
              >
                <Activity className="w-5 h-5" />
                Member Features
              </Link>
              <Link
                to="/clubs"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                Discover Clubs
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Clubs */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">My Clubs</h3>
                <Link
                  to="/clubs"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  View All →
                </Link>
              </div>

              {myClubs.length > 0 ? (
                <div className="space-y-4">
                  {myClubs.map((club) => {
                    const Icon = getCategoryIcon(club.category);
                    return (
                      <div key={club.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                        <div className={`w-12 h-12 bg-${getCategoryColor(club.category)}-500/20 rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${getCategoryColor(club.category)}-400`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{club.name}</h4>
                          <p className="text-gray-300 text-sm">{club.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Users2 className="w-3 h-3" />
                              {club.memberCount} members
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {club.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/clubs/${club.id}`}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleLeaveClub(club.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                          >
                            Leave
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg mb-2">You haven't joined any clubs yet</p>
                  <p className="text-gray-400 mb-4">Discover and join clubs that match your interests</p>
                  <Link
                    to="/clubs"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
                  >
                    <Plus className="w-5 h-5" />
                    Discover Clubs
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Upcoming Events */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Upcoming Events</h3>
              
              <div className="space-y-4">
                {upcomingEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium text-sm">{event.title}</h4>
                      {event.isRegistered && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          Registered
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-xs mb-2">{event.club}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Clock className="w-3 h-3" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {event.attendees}/{event.maxAttendees} attendees
                      </span>
                      {!event.isRegistered && (
                        <button
                          onClick={() => handleRegisterEvent(event.id)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs transition-colors"
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {upcomingEvents.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-sm">No upcoming events</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Recommended Clubs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Recommended for You</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.filter(club => !club.isJoined).slice(0, 3).map((club) => {
                const Icon = getCategoryIcon(club.category);
                return (
                  <div key={club.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-${getCategoryColor(club.category)}-500/20 rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${getCategoryColor(club.category)}-400`} />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{club.name}</h4>
                        <p className="text-gray-400 text-xs">{club.category}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{club.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-400">{club.memberCount} members</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs text-gray-400">{club.rating}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleJoinClub(club.id)}
                      className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm transition-all duration-200"
                    >
                      Join Club
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MemberDashboard;
