import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Building2, 
  Users, 
  Star, 
  MapPin, 
  Clock,
  Heart,
  BookOpen,
  Camera,
  Music,
  Gamepad2,
  Activity,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const ClubDiscovery = () => {
  const { user } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock data
  const mockClubs = [
    {
      id: '1',
      name: 'Computer Science Club',
      description: 'A vibrant community for computer science enthusiasts. We explore programming, algorithms, and cutting-edge technology through workshops, hackathons, and collaborative projects.',
      category: 'technology',
      memberCount: 45,
      leader: 'John Smith',
      logo: null,
      isJoined: false,
      rating: 4.8,
      reviewCount: 23,
      meetingTime: 'Every Tuesday, 6:00 PM',
      location: 'Room 301, Engineering Building',
      tags: ['programming', 'AI', 'web development', 'hackathons'],
      featured: true
    },
    {
      id: '2',
      name: 'Photography Club',
      description: 'Capture moments, create memories. Join us to learn photography techniques, share your work, and participate in photo walks and exhibitions.',
      category: 'arts',
      memberCount: 32,
      leader: 'Sarah Johnson',
      logo: null,
      isJoined: false,
      rating: 4.6,
      reviewCount: 18,
      meetingTime: 'Every Thursday, 7:00 PM',
      location: 'Art Studio, Fine Arts Building',
      tags: ['photography', 'art', 'exhibitions', 'photo walks'],
      featured: false
    },
    {
      id: '3',
      name: 'Debate Club',
      description: 'Develop critical thinking and public speaking skills. Participate in debates, competitions, and discussions on current events and important topics.',
      category: 'academic',
      memberCount: 28,
      leader: 'Mike Davis',
      logo: null,
      isJoined: false,
      rating: 4.7,
      reviewCount: 15,
      meetingTime: 'Every Monday, 5:30 PM',
      location: 'Conference Room A, Library',
      tags: ['debate', 'public speaking', 'critical thinking', 'competitions'],
      featured: true
    },
    {
      id: '4',
      name: 'Basketball Club',
      description: 'Stay fit and have fun playing basketball. Regular practice sessions, friendly matches, and participation in university tournaments.',
      category: 'sports',
      memberCount: 15,
      leader: 'Alex Wilson',
      logo: null,
      isJoined: false,
      rating: 4.5,
      reviewCount: 12,
      meetingTime: 'Every Saturday, 2:00 PM',
      location: 'University Gymnasium',
      tags: ['basketball', 'sports', 'fitness', 'tournaments'],
      featured: false
    },
    {
      id: '5',
      name: 'Music Ensemble',
      description: 'Create beautiful music together. Open to all skill levels, we perform at university events and organize concerts throughout the year.',
      category: 'music',
      memberCount: 22,
      leader: 'Emma Brown',
      logo: null,
      isJoined: false,
      rating: 4.9,
      reviewCount: 20,
      meetingTime: 'Every Wednesday, 6:30 PM',
      location: 'Music Hall, Performing Arts Center',
      tags: ['music', 'ensemble', 'concerts', 'performance'],
      featured: true
    },
    {
      id: '6',
      name: 'Gaming Club',
      description: 'Connect with fellow gamers, participate in tournaments, and explore the world of esports. From casual gaming to competitive play.',
      category: 'gaming',
      memberCount: 38,
      leader: 'David Chen',
      logo: null,
      isJoined: false,
      rating: 4.4,
      reviewCount: 25,
      meetingTime: 'Every Friday, 7:00 PM',
      location: 'Gaming Lab, Student Center',
      tags: ['gaming', 'esports', 'tournaments', 'casual gaming'],
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: Building2, color: 'gray' },
    { id: 'technology', label: 'Technology', icon: BookOpen, color: 'blue' },
    { id: 'arts', label: 'Arts', icon: Camera, color: 'purple' },
    { id: 'sports', label: 'Sports', icon: Activity, color: 'green' },
    { id: 'academic', label: 'Academic', icon: TrendingUp, color: 'orange' },
    { id: 'music', label: 'Music', icon: Music, color: 'pink' },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2, color: 'red' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setClubs(mockClubs);
      setFilteredClubs(mockClubs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter and sort clubs
    let filtered = clubs.filter(club => {
      const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           club.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort clubs
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.memberCount - a.memberCount);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredClubs(filtered);
  }, [clubs, searchTerm, selectedCategory, sortBy]);

  const handleJoinClub = (clubId) => {
    setClubs(clubs.map(club => 
      club.id === clubId ? { ...club, isJoined: true } : club
    ));
    toast.success('Successfully joined the club!');
  };

  const handleLeaveClub = (clubId) => {
    setClubs(clubs.map(club => 
      club.id === clubId ? { ...club, isJoined: false } : club
    ));
    toast.success('Left the club successfully');
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
          <p className="text-white text-center mt-4">Discovering amazing clubs...</p>
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
              <Link
                to="/dashboard"
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Discover Clubs</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clubs, tags, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:text-white'
                }`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="w-full h-full bg-current rounded-sm"></div>
                  <div className="w-full h-full bg-current rounded-sm"></div>
                  <div className="w-full h-full bg-current rounded-sm"></div>
                  <div className="w-full h-full bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:text-white'
                }`}
              >
                <div className="w-4 h-4 space-y-0.5">
                  <div className="w-full h-0.5 bg-current rounded-sm"></div>
                  <div className="w-full h-0.5 bg-current rounded-sm"></div>
                  <div className="w-full h-0.5 bg-current rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-300">
            Found {filteredClubs.length} club{filteredClubs.length !== 1 ? 's' : ''}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Clubs Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club, index) => {
              const Icon = getCategoryIcon(club.category);
              return (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-200"
                >
                  {club.featured && (
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-xs font-medium">Featured</span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 bg-${getCategoryColor(club.category)}-500/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 text-${getCategoryColor(club.category)}-400`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{club.name}</h3>
                      <p className="text-gray-300 text-sm line-clamp-2">{club.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {club.memberCount} members
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {club.rating} ({club.reviewCount})
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {club.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/10 text-white text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {club.tags.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">
                        +{club.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <Clock className="w-3 h-3" />
                    {club.meetingTime}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/clubs/${club.id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm text-center transition-colors"
                    >
                      View Details
                    </Link>
                    {club.isJoined ? (
                      <button
                        onClick={() => handleLeaveClub(club.id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                      >
                        Leave
                      </button>
                    ) : (
                      <button
                        onClick={() => handleJoinClub(club.id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                      >
                        Join
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClubs.map((club, index) => {
              const Icon = getCategoryIcon(club.category);
              return (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-200"
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-${getCategoryColor(club.category)}-500/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-8 h-8 text-${getCategoryColor(club.category)}-400`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{club.name}</h3>
                          <p className="text-gray-300">{club.description}</p>
                        </div>
                        {club.featured && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 text-sm font-medium">Featured</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {club.memberCount} members
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          {club.rating} ({club.reviewCount} reviews)
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {club.meetingTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {club.location}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {club.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/10 text-white text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          to={`/clubs/${club.id}`}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          View Details
                        </Link>
                        {club.isJoined ? (
                          <button
                            onClick={() => handleLeaveClub(club.id)}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          >
                            Leave Club
                          </button>
                        ) : (
                          <button
                            onClick={() => handleJoinClub(club.id)}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          >
                            Join Club
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredClubs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No clubs found</h3>
            <p className="text-gray-300 mb-4">
              {searchTerm 
                ? `No clubs match your search for "${searchTerm}"`
                : 'Try adjusting your filters or search terms'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ClubDiscovery;
