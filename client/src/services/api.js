import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
  verify: () => api.get('/auth/verify'),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  changePassword: (currentPassword, newPassword) => 
    api.put('/users/change-password', { currentPassword, newPassword }),
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  updateStatus: (id, status) => api.patch(`/users/${id}/status`, { status }),
};

// Clubs API
export const clubsAPI = {
  getAll: (params) => api.get('/clubs', { params }),
  getById: (id) => api.get(`/clubs/${id}`),
  create: (clubData) => api.post('/clubs', clubData),
  update: (id, clubData) => api.put(`/clubs/${id}`, clubData),
  delete: (id) => api.delete(`/clubs/${id}`),
  updateStatus: (id, status) => api.patch(`/clubs/${id}/status`, { status }),
  getMembers: (id) => api.get(`/clubs/${id}/members`),
  addMember: (clubId, userId, role) => 
    api.post(`/clubs/${clubId}/members`, { userId, role }),
  removeMember: (clubId, userId) => 
    api.delete(`/clubs/${clubId}/members/${userId}`),
  updateMemberRole: (clubId, userId, role) => 
    api.patch(`/clubs/${clubId}/members/${userId}`, { role }),
};

// Events API
export const eventsAPI = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (eventData) => api.post('/events', eventData),
  update: (id, eventData) => api.put(`/events/${id}`, eventData),
  delete: (id) => api.delete(`/events/${id}`),
  updateStatus: (id, status) => api.patch(`/events/${id}/status`, { status }),
  getAttendance: (id) => api.get(`/events/${id}/attendance`),
  register: (eventId) => api.post(`/events/${eventId}/register`),
  unregister: (eventId) => api.delete(`/events/${eventId}/register`),
  markAttendance: (eventId, userId, status) => 
    api.post(`/events/${eventId}/attendance`, { userId, status }),
};

// Memberships API
export const membershipsAPI = {
  getAll: (params) => api.get('/memberships', { params }),
  getById: (id) => api.get(`/memberships/${id}`),
  create: (membershipData) => api.post('/memberships', membershipData),
  update: (id, membershipData) => api.put(`/memberships/${id}`, membershipData),
  delete: (id) => api.delete(`/memberships/${id}`),
  getByUser: (userId) => api.get(`/memberships/user/${userId}`),
  getByClub: (clubId) => api.get(`/memberships/club/${clubId}`),
};

// Announcements API
export const announcementsAPI = {
  getAll: (params) => api.get('/announcements', { params }),
  getById: (id) => api.get(`/announcements/${id}`),
  create: (announcementData) => api.post('/announcements', announcementData),
  update: (id, announcementData) => api.put(`/announcements/${id}`, announcementData),
  delete: (id) => api.delete(`/announcements/${id}`),
  getByClub: (clubId) => api.get(`/announcements/club/${clubId}`),
  markAsRead: (id) => api.patch(`/announcements/${id}/read`),
};

// Achievements API
export const achievementsAPI = {
  getAll: (params) => api.get('/achievements', { params }),
  getById: (id) => api.get(`/achievements/${id}`),
  create: (achievementData) => api.post('/achievements', achievementData),
  update: (id, achievementData) => api.put(`/achievements/${id}`, achievementData),
  delete: (id) => api.delete(`/achievements/${id}`),
  getByUser: (userId) => api.get(`/achievements/user/${userId}`),
  award: (userId, achievementId) => 
    api.post(`/achievements/${achievementId}/award`, { userId }),
  revoke: (userId, achievementId) => 
    api.delete(`/achievements/${achievementId}/award/${userId}`),
};

// Notifications API
export const notificationsAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  getById: (id) => api.get(`/notifications/${id}`),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
  delete: (id) => api.delete(`/notifications/${id}`),
  getUnreadCount: () => api.get('/notifications/unread-count'),
};

// Dashboard API
export const dashboardAPI = {
  getAdminStats: () => api.get('/dashboard/admin/stats'),
  getLeaderStats: (clubId) => api.get(`/dashboard/leader/${clubId}/stats`),
  getMemberStats: () => api.get('/dashboard/member/stats'),
  getRecentActivity: (params) => api.get('/dashboard/activity', { params }),
  getEngagementMetrics: (params) => api.get('/dashboard/engagement', { params }),
};

// File Upload API
export const uploadAPI = {
  uploadImage: (file, type = 'avatar') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadDocument: (file, type = 'document') => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', type);
    return api.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;
