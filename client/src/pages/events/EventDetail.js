import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Edit, 
  Trash2, 
  Plus,
  CheckCircle,
  XCircle,
  User,
  Eye,
  Download,
  Share2,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { eventsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, isClubLeader } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchEventDetails();
    fetchAttendance();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getById(id);
      if (response.data.success) {
        setEvent(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch event details');
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await eventsAPI.getAttendance(id);
      if (response.data.success) {
        setAttendance(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        await eventsAPI.delete(id);
        toast.success('Event deleted successfully');
        navigate('/admin/events');
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await eventsAPI.updateStatus(id, newStatus);
      toast.success(`Event status updated to ${newStatus}`);
      fetchEventDetails();
    } catch (error) {
      toast.error('Failed to update event status');
    }
  };

  const handleAttendanceMark = async (userId, status) => {
    try {
      await eventsAPI.markAttendance(id, userId, status);
      toast.success(`Attendance marked as ${status}`);
      fetchAttendance();
    } catch (error) {
      toast.error('Failed to mark attendance');
    }
  };

  const canEdit = isAdmin() || (isClubLeader() && event?.clubId === user?.clubId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Event Not Found</h1>
          <p className="text-gray-300">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-300';
      case 'ongoing': return 'bg-green-500/20 text-green-300';
      case 'completed': return 'bg-gray-500/20 text-gray-300';
      case 'cancelled': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getAttendanceStatus = (userId) => {
    const record = attendance.find(a => a.userId === userId);
    return record ? record.status : 'not_registered';
  };

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
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
                  <div className="flex items-center gap-4 text-gray-300">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.registeredCount || 0} registered
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">{event.description}</p>
            </div>
            
            {canEdit && (
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/admin/events/${id}/edit`)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Date & Time</h3>
            </div>
            <p className="text-gray-300 text-lg">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-400">
              {event.startTime} - {event.endTime}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Location</h3>
            </div>
            <p className="text-gray-300">{event.location}</p>
            {event.room && <p className="text-gray-400">{event.room}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Capacity</h3>
            </div>
            <p className="text-gray-300 text-lg">
              {event.registeredCount || 0} / {event.maxCapacity || '∞'}
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${event.maxCapacity ? (event.registeredCount / event.maxCapacity) * 100 : 0}%` }}
              ></div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {['overview', 'attendance', 'details'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Event Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white ml-2 capitalize">{event.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Category:</span>
                        <span className="text-white ml-2">{event.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Organizer:</span>
                        <span className="text-white ml-2">{event.organizer}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Registration Deadline:</span>
                        <span className="text-white ml-2">
                          {event.registrationDeadline ? new Date(event.registrationDeadline).toLocaleDateString() : 'No deadline'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share Event
                      </button>
                      <button className="w-full flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                        Export Attendees
                      </button>
                      <button className="w-full flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                        <Bookmark className="w-4 h-4" />
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                </div>

                {event.requirements && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Requirements</h3>
                    <p className="text-gray-300">{event.requirements}</p>
                  </div>
                )}

                {event.agenda && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Event Agenda</h3>
                    <div className="space-y-2">
                      {event.agenda.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <span className="text-blue-400 font-medium">{item.time}</span>
                          <span className="text-white">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'attendance' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">Attendance Management</h3>
                  {canEdit && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange('ongoing')}
                        disabled={event.status !== 'upcoming'}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg transition-colors"
                      >
                        Start Event
                      </button>
                      <button
                        onClick={() => handleStatusChange('completed')}
                        disabled={event.status !== 'ongoing'}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors"
                      >
                        End Event
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-white font-medium p-3">Name</th>
                        <th className="text-white font-medium p-3">Email</th>
                        <th className="text-white font-medium p-3">Status</th>
                        {canEdit && <th className="text-white font-medium p-3">Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map((record) => (
                        <tr key={record.id} className="border-b border-white/10">
                          <td className="p-3 text-white">
                            {record.user.firstName} {record.user.lastName}
                          </td>
                          <td className="p-3 text-gray-300">{record.user.email}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              record.status === 'present' ? 'bg-green-500/20 text-green-300' :
                              record.status === 'absent' ? 'bg-red-500/20 text-red-300' :
                              record.status === 'late' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-gray-500/20 text-gray-300'
                            }`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                          {canEdit && (
                            <td className="p-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleAttendanceMark(record.userId, 'present')}
                                  className="p-1 text-green-400 hover:text-green-300 transition-colors"
                                  title="Mark Present"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleAttendanceMark(record.userId, 'absent')}
                                  className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                  title="Mark Absent"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleAttendanceMark(record.userId, 'late')}
                                  className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                                  title="Mark Late"
                                >
                                  <Clock className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Full Description</h3>
                  <p className="text-gray-300 leading-relaxed">{event.fullDescription || event.description}</p>
                </div>

                {event.images && event.images.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Event Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {event.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Event ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {event.attachments && event.attachments.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Attachments</h3>
                    <div className="space-y-2">
                      {event.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Download className="w-4 h-4 text-blue-400" />
                          </div>
                          <span className="text-white">{attachment.name}</span>
                          <button className="ml-auto px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
