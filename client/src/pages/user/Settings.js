import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Settings as SettingsIcon, 
  Lock, 
  Bell, 
  Shield, 
  User, 
  Save, 
  X,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Download,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, changePassword, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const newPassword = watch('newPassword');

  const onPasswordChange = async (data) => {
    try {
      setLoading(true);
      const result = await changePassword(data.currentPassword, data.newPassword);
      if (result.success) {
        reset();
        toast.success('Password changed successfully!');
      }
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm === user.email) {
      // Implement account deletion logic
      toast.success('Account deletion requested. Please contact support.');
    } else {
      toast.error('Email confirmation does not match');
    }
  };

  const exportData = () => {
    const userData = {
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        department: user.department,
        academicYear: user.academicYear,
        bio: user.bio,
        interests: user.interests
      },
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `user-data-${user.firstName}-${user.lastName}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'data', label: 'Data & Export', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <SettingsIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Settings</h1>
              <p className="text-gray-300 text-lg">Manage your account preferences and security</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
          >
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
          >
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Display Name</label>
                    <input
                      type="text"
                      defaultValue={`${user.firstName} ${user.lastName}`}
                      disabled
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white opacity-50 cursor-not-allowed"
                    />
                    <p className="text-gray-400 text-sm mt-1">Contact support to change your name</p>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      disabled
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white opacity-50 cursor-not-allowed"
                    />
                    <p className="text-gray-400 text-sm mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Account Type</label>
                    <input
                      type="text"
                      defaultValue={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      disabled
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white opacity-50 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Member Since</label>
                    <input
                      type="text"
                      defaultValue={new Date(user.createdAt).toLocaleDateString()}
                      disabled
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white opacity-50 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/20">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Security Settings</h2>
                
                <form onSubmit={handleSubmit(onPasswordChange)} className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Current Password *</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        {...register('currentPassword', { required: 'Current password is required' })}
                        className="w-full pr-12 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-red-400 text-sm mt-1">{errors.currentPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">New Password *</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        {...register('newPassword', { 
                          required: 'New password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters'
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                            message: 'Password must contain uppercase, lowercase, number and special character'
                          }
                        })}
                        className="w-full pr-12 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-red-400 text-sm mt-1">{errors.newPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Confirm New Password *</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword', { 
                          required: 'Please confirm your password',
                          validate: value => value === newPassword || 'Passwords do not match'
                        })}
                        className="w-full pr-12 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="pt-6 border-t border-white/20">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-blue-300 font-medium mb-1">Password Requirements</h4>
                      <ul className="text-blue-200 text-sm space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Contains uppercase and lowercase letters</li>
                        <li>• Contains at least one number</li>
                        <li>• Contains at least one special character</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Event reminders and updates</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Club announcements</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Achievement notifications</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Security alerts</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Event reminders</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Club updates</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Achievement badges</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-4">Frequency</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="radio" name="frequency" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 focus:ring-blue-500" />
                        <span className="text-white">Immediate</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="radio" name="frequency" className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 focus:ring-blue-500" />
                        <span className="text-white">Daily digest</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="radio" name="frequency" className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 focus:ring-blue-500" />
                        <span className="text-white">Weekly summary</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/20">
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Save className="w-5 h-5" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-4">Profile Visibility</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Show profile to other members</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Show email address</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Show phone number</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Show academic information</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-4">Activity Sharing</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Show club memberships</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Show event attendance</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Show achievements</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Show online status</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-4">Data Collection</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Allow analytics and usage data</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Allow personalized recommendations</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                        <span className="text-white">Allow third-party integrations</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/20">
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Save className="w-5 h-5" />
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            )}

            {/* Data & Export */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Data & Export</h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-4">Export Your Data</h3>
                    <p className="text-gray-300 mb-4">
                      Download a copy of your personal data including profile information, 
                      club memberships, event history, and achievements.
                    </p>
                    <button
                      onClick={exportData}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export Data
                    </button>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-4">Account Deletion</h3>
                    <p className="text-gray-300 mb-4">
                      Permanently delete your account and all associated data. 
                      This action cannot be undone.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={deleteConfirm}
                        onChange={(e) => setDeleteConfirm(e.target.value)}
                        placeholder={`Type "${user.email}" to confirm`}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleDeleteAccount}
                        disabled={deleteConfirm !== user.email}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-yellow-300 font-medium mb-1">Important Notice</h4>
                        <p className="text-yellow-200 text-sm">
                          Account deletion will permanently remove all your data including club memberships, 
                          event history, achievements, and personal information. Please ensure you have 
                          exported any important data before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
