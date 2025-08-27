import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Users,
  Star,
  MapPin,
  Clock,
  Calendar,
  MessageSquare,
  Share2,
  Heart,
  BookOpen,
  Camera,
  Music,
  Gamepad2,
  Activity,
  TrendingUp,
  Edit,
  Settings,
  Plus,
  User,
  Crown,
  Award
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const ClubDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [club, setClub] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [isLeader, setIsLeader] = useState(false);

  // Mock data
  const mockClub = {
    id: '1',
    name: 'Computer Science Club',
    description: 'A vibrant community for computer science enthusiasts. We explore programming, algorithms, and cutting-edge technology through workshops, hackathons, and collaborative projects. Our mission is to foster innovation, learning, and collaboration among students passionate about technology.',
    category: 'technology',
    memberCount: 45,
    leader: 'John Smith',
    leaderEmail: 'john.smith@university.edu',
    logo: null,
    rating: 4.8,
    reviewCount: 23,
    meetingTime: 'Every Tuesday, 6:00 PM',
    location: 'Room 301, Engineering Building',
    tags: ['programming', 'AI', 'web development', 'hackathons', 'workshops'],
    featured: true,
    createdAt: '2024-01-15',
    website: 'https://csclub.university.edu',
    socialMedia: {
      instagram: '@csclub_uni',
      twitter: '@csclub_uni',
      linkedin: 'csclub-university'
    },
    members: [
      { id: '1', name: 'John Smith', role: 'leader', avatar: null, joinedAt: '2024-01-15' },
      { id: '2', name: 'Sarah Johnson', role: 'vice_leader', avatar: null, joinedAt: '2024-01-20' },
      { id: '3', name: 'Mike Davis', role: 'member', avatar: null, joinedAt: '2024-02-01' },
      { id: '4', name: 'Emma Wilson', role: 'member', avatar: null, joinedAt: '2024-02-05' },
      { id: '5', name: 'Alex Brown', role: 'member', avatar: null, joinedAt: '2024-02-10' }
    ],
    events: [
      {
        id: '1',
        title: 'Coding Workshop: React Basics',
        description: 'Learn the fundamentals of React.js with hands-on exercises',
        date: '2024-02-15',
        time: '6:00 PM',
        location: 'Room 301, Engineering Building',
        attendees: 25,
        maxAttendees: 30,
        isRegistered: true
      },
      {
        id: '2',
        title: 'Hackathon: AI Innovation',
        description: '24-hour hackathon focused on AI and machine learning projects',
        date: '2024-02-25',
        time: '9:00 AM',
        location: 'Computer Lab, Engineering Building',
        attendees: 18,
        maxAttendees: 25,
        isRegistered: false
      },
      {
        id: '3',
        title: 'Guest Speaker: Tech Industry Trends',
        description: 'Join us for an insightful talk by industry expert Dr. Jane Doe',
        date: '2024-03-05',
        time: '7:00 PM',
        location: 'Auditorium, Engineering Building',
        attendees: 35,
        maxAttendees: 50,
        isRegistered: false
      }
    ],
    announcements: [
      {
        id: '1',
        title: 'New Workshop Series Starting Next Week',
        content: 'We\'re excited to announce our new workshop series on web development fundamentals. Starting next Tuesday, we\'ll cover HTML, CSS, and JavaScript basics.',
        author: 'John Smith',
        createdAt: '2024-02-10',
        isRead: false
      },
      {
        id: '2',
        title: 'Hackathon Registration Now Open',
        content: 'Registration for our upcoming AI Innovation Hackathon is now open! Limited spots available, so sign up early.',
        author: 'Sarah Johnson',
        createdAt: '2024-02-08',
        isRead: true
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setClub(mockClub);
      setIsJoined(mockClub.members.some(member => member.id === user?.id));
      setIsLeader(mockClub.leader === `${user?.firstName} ${user?.lastName}`);
      setLoading(false);
    }, 1000);
  }, [id, user]);

  const handleJoinClub = () => {
    setIsJoined(true);
    setClub(prev => ({
      ...prev,
      memberCount: prev.memberCount + 1,
      members: [...prev.members, {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        role: 'member',
        avatar: null,
        joinedAt: new Date().toISOString().split('T')[0]
      }]
    }));
    toast.success('Successfully joined the club!');
  };

  const handleLeaveClub = () => {
    if (window.confirm('Are you sure you want to leave this club?')) {
      setIsJoined(false);
      setClub(prev => ({
        ...prev,
        memberCount: prev.memberCount - 1,
        members: prev.members.filter(member => member.id !== user.id)
      }));
      toast.success('Left the club successfully');
    }
  };

  const handleRegisterEvent = (eventId) => {
    setClub(prev => ({
      ...prev,
      events: prev.events.map(event => 
        event.id === eventId 
          ? { ...event, isRegistered: true, attendees: event.attendees + 1 }
          : event
      )
    }));
    toast.success('Successfully registered for the event!');
  };

  const getCategoryIcon = (category) => {
    const icons = {
      technology: BookOpen,
      arts: Camera,
      sports: Activity,
      academic: TrendingUp,
      music: Music,
      gaming: Gamepad2
    };
    return icons[category] || BookOpen;
  };

  const getCategoryColor = (category) => {
    const colors = {
      technology: 'blue',
      arts: 'purple',
      sports: 'green',
      academic: 'orange',
      music: 'pink',
      gaming: 'red'
    };
    return colors[category] || 'gray';
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'leader': return Crown;
      case 'vice_leader': return Award;
      default: return User;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'leader': return 'yellow';
      case 'vice_leader': return 'blue';
      default: return 'gray';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'announcements', label: 'Announcements', icon: MessageSquare }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white text-center mt-4">Loading club details...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Club Not Found</h2>
          <p className="text-gray-300 mb-6">The club you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/clubs"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Back to Clubs
          </Link>
        </div>
      </div>
    );
  }

  const Icon = getCategoryIcon(club.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/clubs"
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className={`w-10 h-10 bg-${getCategoryColor(club.category)}-500/20 rounded-xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 text-${getCategoryColor(club.category)}-400`} />
              </div>
              <h1 className="text-2xl font-bold text-white">{club.name}</h1>
            </div>
            
            <div className="flex items-center gap-3">
              {isLeader && (
                <Link
                  to={`/clubs/${club.id}/edit`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit Club
                </Link>
              )}
              <button className="p-2 text-gray-300 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Club Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-16 h-16 bg-${getCategoryColor(club.category)}-500/20 rounded-2xl flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 text-${getCategoryColor(club.category)}-400`} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">{club.name}</h2>
                  <div className="flex items-center gap-4 text-gray-300">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {club.memberCount} members
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {club.rating} ({club.reviewCount} reviews)
                    </span>
                    {club.featured && (
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-6 leading-relaxed">{club.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {club.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{club.meetingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{club.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Leader: {club.leader}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Founded: {new Date(club.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="lg:w-80">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                
                {isJoined ? (
                  <div className="space-y-3">
                    <button
                      onClick={handleLeaveClub}
                      className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      Leave Club
                    </button>
                    <Link
                      to={`/clubs/${club.id}/chat`}
                      className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
                    >
                      Open Chat
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleJoinClub}
                    className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Join Club
                  </button>
                )}

                <div className="mt-6 pt-6 border-t border-white/20">
                  <h4 className="text-white font-medium mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>Leader: {club.leader}</p>
                    <p>Email: {club.leaderEmail}</p>
                    {club.website && (
                      <a 
                        href={club.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-8">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
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
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Upcoming Events */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
                <Link
                  to={`/clubs/${club.id}/events`}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {club.events.slice(0, 3).map((event) => (
                  <div key={event.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{event.title}</h4>
                      {event.isRegistered && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          Registered
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{event.description}</p>
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
            </div>

            {/* Recent Announcements */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Announcements</h3>
              
              <div className="space-y-4">
                {club.announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{announcement.title}</h4>
                      {!announcement.isRead && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{announcement.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>By {announcement.author}</span>
                      <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">All Events</h3>
              {isLeader && (
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  Create Event
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {club.events.map((event) => (
                <div key={event.id} className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-medium">{event.title}</h4>
                    {event.isRegistered && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        Registered
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                  <div className="space-y-2 text-xs text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      {event.attendees}/{event.maxAttendees} attendees
                    </div>
                  </div>
                  {!event.isRegistered && (
                    <button
                      onClick={() => handleRegisterEvent(event.id)}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Register for Event
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'members' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">Club Members</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {club.members.map((member) => {
                const RoleIcon = getRoleIcon(member.role);
                return (
                  <div key={member.id} className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{member.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <RoleIcon className={`w-4 h-4 text-${getRoleColor(member.role)}-400`} />
                          <span className="text-gray-300 text-sm capitalize">
                            {member.role.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-400">
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'announcements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Announcements</h3>
              {isLeader && (
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  New Announcement
                </button>
              )}
            </div>

            <div className="space-y-4">
              {club.announcements.map((announcement) => (
                <div key={announcement.id} className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-medium text-lg">{announcement.title}</h4>
                    {!announcement.isRead && (
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{announcement.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>By {announcement.author}</span>
                    <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
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

export default ClubDetail;
