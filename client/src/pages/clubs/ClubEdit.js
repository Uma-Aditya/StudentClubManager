import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Save, 
  X, 
  Plus, 
  Trash2,
  Upload,
  Users,
  MapPin,
  Clock,
  Calendar,
  Tag,
  Loader
} from 'lucide-react';
import { clubsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ClubEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [club, setClub] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm();

  useEffect(() => {
    fetchClubDetails();
  }, [id]);

  const fetchClubDetails = async () => {
    try {
      setLoading(true);
      const response = await clubsAPI.getById(id);
      if (response.data.success) {
        const clubData = response.data.data;
        setClub(clubData);
        setCategories(clubData.categories || []);
        
        // Pre-populate form
        reset({
          name: clubData.name,
          category: clubData.category,
          description: clubData.description,
          location: clubData.location,
          meetingTime: clubData.meetingTime,
          foundedDate: clubData.foundedDate ? clubData.foundedDate.split('T')[0] : '',
          maxMembers: clubData.maxMembers,
          additionalInfo: clubData.additionalInfo
        });
      }
    } catch (error) {
      toast.error('Failed to fetch club details');
      console.error('Error fetching club:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const removeCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const onSubmit = async (data) => {
    try {
      setSaving(true);
      const clubData = {
        ...data,
        categories: categories
      };

      const response = await clubsAPI.update(id, clubData);
      if (response.data.success) {
        toast.success('Club updated successfully!');
        navigate(`/admin/clubs/${id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update club');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 text-center">
          <Loader className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white">Loading club details...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Club Not Found</h1>
          <p className="text-gray-300">The club you're trying to edit doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Edit Club: {club.name}</h1>
            <button
              onClick={() => navigate(`/admin/clubs/${id}`)}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Club Name *</label>
                <input
                  type="text"
                  {...register('name', { required: 'Club name is required' })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter club name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Category</label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option value="academic">Academic</option>
                  <option value="cultural">Cultural</option>
                  <option value="sports">Sports</option>
                  <option value="technology">Technology</option>
                  <option value="arts">Arts</option>
                  <option value="social">Social</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Description *</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your club's purpose and activities"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Location and Meeting Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Meeting Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    {...register('location')}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Room 101, Student Center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Meeting Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    {...register('meetingTime')}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Every Monday at 3 PM"
                  />
                </div>
              </div>
            </div>

            {/* Founded Date and Max Members */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Founded Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    {...register('foundedDate')}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Maximum Members</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    {...register('maxMembers')}
                    min="1"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="No limit if empty"
                  />
                </div>
              </div>
            </div>

            {/* Custom Categories */}
            <div>
              <label className="block text-white font-medium mb-2">Custom Categories</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add custom category"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                    >
                      <Tag className="w-3 h-3" />
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(index)}
                        className="text-blue-200 hover:text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-white font-medium mb-2">Additional Information</label>
              <textarea
                {...register('additionalInfo')}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional details about the club..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t border-white/20">
              <button
                type="button"
                onClick={() => navigate(`/admin/clubs/${id}`)}
                className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors"
              >
                {saving ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ClubEdit;
