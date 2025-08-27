import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Star,
  Activity,
  Edit,
  Camera,
  Settings,
  ArrowLeft,
  Building2,
  Users,
  Clock,
  Trophy,
  BookOpen,
  Camera as CameraIcon,
  Music,
  Gamepad2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    academicYear: user?.academicYear || '',
    bio: user?.bio || '',
    interests: user?.interests || []
  });

  // Mock data for achievements and activities
  const achievements = [
    {
      id: '1',
      title: 'First Event',
      description: 'Attended your first club event',
      icon: Star,
      color: 'yellow',
      earnedAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Active Member',
      description: 'Joined 3 different clubs',
      icon: Users,
      color: 'blue',
      earnedAt: '2024-02-01'
    },
    {
      id: '3',
      title: 'Event Organizer',
      description: 'Helped organize a club event',
      icon: Trophy,
      color: 'green',
      earnedAt: '2024-02-10'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'joined',
      club: 'Computer Science Club',
      date: '2024-02-15',
      icon: Building2
    },
    {
      id: '2',
      type: 'attended',
      event: 'Coding Workshop',
      club: 'Computer Science Club',
      date: '2024-02-14',
      icon: Activity
    },
    {
      id: '3',
      type: 'joined',
      club: 'Photography Club',
      date: '2024-02-10',
      icon: Building2
    },
    {
      id: '4',
      type: 'registered',
      event: 'Photo Walk',
      club: 'Photography Club',
      date: '2024-02-08',
      icon: Calendar
    }
  ];

  const myClubs = [
    {
      id: '1',
      name: 'Computer Science Club',
      role: 'member',
      joinedAt: '2024-02-15',
      memberCount: 45,
      category: 'technology'
    },
    {
      id: '2',
      name: 'Photography Club',
      role: 'member',
      joinedAt: '2024-02-10',
      memberCount: 32,
      category: 'arts'
    }
  ];

  const interests = [
    { id: 'programming', label: 'Programming', icon: BookOpen, color: 'blue' },
    { id: 'photography', label: 'Photography', icon: CameraIcon, color: 'purple' },
    { id: 'music', label: 'Music', icon: Music, color: 'pink' },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2, color: 'red' }
  ];

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfile(profileData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      department: user?.department || '',
      academicYear: user?.academicYear || '',
      bio: user?.bio || '',
      interests: user?.interests || []
    });
    setIsEditing(false);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      technology: BookOpen,
      arts: CameraIcon,
      sports: Activity,
      academic: Star,
      music: Music,
      gaming: Gamepad2
    };
    return icons[category] || Building2;
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

  const getActivityIcon = (type) => {
    switch (type) {
      case 'joined': return Building2;
      case 'attended': return Activity;
      case 'registered': return Calendar;
      default: return Activity;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'joined': return 'green';
      case 'attended': return 'blue';
      case 'registered': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                to="/settings"
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
            >
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl font-bold text-white">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center">
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-300">{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}</p>
                
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mx-auto"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
                {user?.phone && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user?.department && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Building2 className="w-4 h-4" />
                    <span>{user.department}</span>
                  </div>
                )}
                {user?.academicYear && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>Year {user.academicYear}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>Member since {new Date(user?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {user?.bio && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <h3 className="text-white font-medium mb-2">Bio</h3>
                  <p className="text-gray-300 text-sm">{user.bio}</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Edit Profile Form */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">Edit Profile</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1234567890"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Department</label>
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Academic Year</label>
                    <input
                      type="number"
                      value={profileData.academicYear}
                      onChange={(e) => setProfileData({...profileData, academicYear: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      max="10"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-white font-medium mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {/* My Clubs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">My Clubs</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myClubs.map((club) => {
                  const Icon = getCategoryIcon(club.category);
                  return (
                    <div key={club.id} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 bg-${getCategoryColor(club.category)}-500/20 rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${getCategoryColor(club.category)}-400`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{club.name}</h4>
                          <p className="text-gray-400 text-sm capitalize">{club.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{club.memberCount} members</span>
                        <span>Joined {new Date(club.joinedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Achievements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="p-4 bg-white/5 rounded-lg text-center">
                      <div className={`w-12 h-12 bg-${achievement.color}-500/20 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <Icon className={`w-6 h-6 text-${achievement.color}-400`} />
                      </div>
                      <h4 className="text-white font-medium mb-1">{achievement.title}</h4>
                      <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(achievement.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                      <div className={`w-10 h-10 bg-${getActivityColor(activity.type)}-500/20 rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${getActivityColor(activity.type)}-400`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {activity.type === 'joined' && `Joined ${activity.club}`}
                          {activity.type === 'attended' && `Attended ${activity.event} at ${activity.club}`}
                          {activity.type === 'registered' && `Registered for ${activity.event} at ${activity.club}`}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
