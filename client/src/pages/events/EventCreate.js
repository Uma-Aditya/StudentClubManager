import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Save, 
  X, 
  Plus, 
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  Image,
  FileText,
  Loader
} from 'lucide-react';
import { eventsAPI, clubsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const EventCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [newAgendaItem, setNewAgendaItem] = useState({ time: '', activity: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await clubsAPI.getAll({ status: 'active' });
      if (response.data.success) {
        setClubs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const addAgendaItem = () => {
    if (newAgendaItem.time && newAgendaItem.activity) {
      setAgenda([...agenda, { ...newAgendaItem }]);
      setNewAgendaItem({ time: '', activity: '' });
    }
  };

  const removeAgendaItem = (index) => {
    setAgenda(agenda.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages([...selectedImages, ...imageUrls]);
  };

  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const eventData = {
        ...data,
        agenda: agenda,
        images: selectedImages,
        attachments: attachments.map(a => a.name)
      };

      const response = await eventsAPI.create(eventData);
      if (response.data.success) {
        toast.success('Event created successfully!');
        navigate('/admin/events');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Create New Event</h1>
            <button
              onClick={() => navigate('/admin/events')}
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
                <label className="block text-white font-medium mb-2">Event Title *</label>
                <input
                  type="text"
                  {...register('title', { required: 'Event title is required' })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event title"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Event Type</label>
                <select
                  {...register('type')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="meeting">Meeting</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="conference">Conference</option>
                  <option value="social">Social Event</option>
                  <option value="competition">Competition</option>
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
                placeholder="Describe your event..."
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Event Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    {...register('date', { required: 'Event date is required' })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {errors.date && (
                  <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Start Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="time"
                    {...register('startTime', { required: 'Start time is required' })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {errors.startTime && (
                  <p className="text-red-400 text-sm mt-1">{errors.startTime.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">End Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="time"
                    {...register('endTime', { required: 'End time is required' })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {errors.endTime && (
                  <p className="text-red-400 text-sm mt-1">{errors.endTime.message}</p>
                )}
              </div>
            </div>

            {/* Location and Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    {...register('location', { required: 'Location is required' })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Student Center"
                  />
                </div>
                {errors.location && (
                  <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Room/Area</label>
                <input
                  type="text"
                  {...register('room')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Room 101"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Maximum Capacity</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    {...register('maxCapacity')}
                    min="1"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="No limit if empty"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Registration Deadline</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="datetime-local"
                    {...register('registrationDeadline')}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Club Selection */}
            <div>
              <label className="block text-white font-medium mb-2">Organizing Club</label>
              <select
                {...register('clubId')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select club</option>
                {clubs.map((club) => (
                  <option key={club.id} value={club.id}>{club.name}</option>
                ))}
              </select>
            </div>

            {/* Event Agenda */}
            <div>
              <label className="block text-white font-medium mb-2">Event Agenda</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="time"
                  value={newAgendaItem.time}
                  onChange={(e) => setNewAgendaItem({ ...newAgendaItem, time: e.target.value })}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={newAgendaItem.activity}
                  onChange={(e) => setNewAgendaItem({ ...newAgendaItem, activity: e.target.value })}
                  placeholder="Activity description"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addAgendaItem}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              
              {agenda.length > 0 && (
                <div className="space-y-2">
                  {agenda.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <span className="text-blue-400 font-medium">{item.time}</span>
                      <span className="text-white flex-1">{item.activity}</span>
                      <button
                        type="button"
                        onClick={() => removeAgendaItem(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-white font-medium mb-2">Requirements</label>
              <textarea
                {...register('requirements')}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any special requirements for attendees..."
              />
            </div>

            {/* Images and Attachments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Event Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <Image className="w-5 h-5" />
                  Upload Images
                </label>
                
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Attachments</label>
                <input
                  type="file"
                  multiple
                  onChange={handleAttachmentUpload}
                  className="hidden"
                  id="attachment-upload"
                />
                <label
                  htmlFor="attachment-upload"
                  className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Upload Files
                </label>
                
                {attachments.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-white text-sm flex-1">{attachment.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t border-white/20">
              <button
                type="button"
                onClick={() => navigate('/admin/events')}
                className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EventCreate;
