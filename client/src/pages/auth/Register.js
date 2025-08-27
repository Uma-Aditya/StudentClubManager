import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, User, Mail, Lock, Phone, GraduationCap, Building, Calendar, Users, Target, Award } from 'lucide-react';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('member');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger
  } = useForm({
    mode: 'onChange'
  });

  const password = watch('password');

  const steps = [
    { id: 1, title: 'Account Details', icon: User },
    { id: 2, title: 'Personal Information', icon: User },
    { id: 3, title: 'Academic Details', icon: GraduationCap },
    { id: 4, title: 'Interests & Goals', icon: Target },
    { id: 5, title: 'Review & Submit', icon: CheckCircle }
  ];

  const interests = [
    'Technology', 'Arts & Culture', 'Sports', 'Science', 'Business',
    'Environment', 'Social Justice', 'Education', 'Health', 'Music',
    'Literature', 'Photography', 'Gaming', 'Travel', 'Cooking'
  ];

  const roles = [
    { value: 'member', label: 'Club Member', icon: Users, description: 'Join and participate in clubs' },
    { value: 'club_leader', label: 'Club Leader', icon: Award, description: 'Create and manage clubs' },
    { value: 'club_vice_leader', label: 'Vice Leader', icon: Award, description: 'Assist in club management' },
    { value: 'guest', label: 'Guest', icon: User, description: 'Browse clubs without joining' }
  ];

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 1: return ['email', 'password', 'confirmPassword'];
      case 2: return ['firstName', 'lastName', 'phone'];
      case 3: return ['department', 'academicYear'];
      case 4: return ['interests'];
      default: return [];
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = {
        ...data,
        role: selectedRole,
        interests: selectedInterests,
        bio: data.bio || ''
      };
      
      await registerUser(formData);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
              <p className="text-gray-300">Start your journey with student clubs</p>
            </div>

            {/* Role Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Choose Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <motion.button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedRole === role.value
                          ? 'border-primary-400 bg-primary-400/20 shadow-lg shadow-primary-400/25'
                          : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2 text-primary-400" />
                      <div className="text-sm font-medium text-white">{role.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{role.description}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-400 text-sm mt-1"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email.message}
                </motion.div>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                      message: 'Password must contain uppercase, lowercase, number and special character'
                    }
                  })}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-400 text-sm mt-1"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password.message}
                </motion.div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
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
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-400 text-sm mt-1"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword.message}
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
              <p className="text-gray-300">Tell us about yourself</p>
            </div>

            {/* First Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters'
                    }
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your first name"
                />
              </div>
              {errors.firstName && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-400 text-sm mt-1"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.firstName.message}
                </motion.div>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters'
                    }
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your last name"
                />
              </div>
              {errors.lastName && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-400 text-sm mt-1"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.lastName.message}
                </motion.div>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  {...register('phone', {
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number (optional)"
                />
              </div>
              {errors.phone && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-400 text-sm mt-1"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone.message}
                </motion.div>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Bio
              </label>
              <textarea
                {...register('bio')}
                rows={3}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Tell us about yourself (optional)"
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Academic Information</h2>
              <p className="text-gray-300">Your educational background</p>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Department
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  {...register('department', {
                    required: 'Department is required'
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="">Select your department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Arts">Arts</option>
                  <option value="Science">Science</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Law">Law</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.department && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-400 text-sm mt-1"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.department.message}
                </motion.div>
              )}
            </div>

            {/* Academic Year */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Academic Year
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  {...register('academicYear', {
                    required: 'Academic year is required'
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="">Select your academic year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5">5th Year</option>
                  <option value="6">6th Year</option>
                  <option value="7">7th Year</option>
                  <option value="8">8th Year</option>
                  <option value="9">9th Year</option>
                  <option value="10">10th Year</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.academicYear && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-400 text-sm mt-1"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.academicYear.message}
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Interests & Goals</h2>
              <p className="text-gray-300">What interests you most?</p>
            </div>

            {/* Interests Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Select Your Interests
              </label>
              <div className="grid grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <motion.button
                    key={interest}
                    type="button"
                    onClick={() => {
                      setSelectedInterests(prev =>
                        prev.includes(interest)
                          ? prev.filter(i => i !== interest)
                          : [...prev, interest]
                      );
                    }}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedInterests.includes(interest)
                        ? 'border-primary-400 bg-primary-400/20 shadow-lg shadow-primary-400/25'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={`text-sm font-medium ${
                      selectedInterests.includes(interest) ? 'text-primary-400' : 'text-gray-300'
                    }`}>
                      {interest}
                    </span>
                  </motion.button>
                ))}
              </div>
              {selectedInterests.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-amber-400 text-sm text-center"
                >
                  Please select at least one interest
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Review & Submit</h2>
              <p className="text-gray-300">Please review your information before submitting</p>
            </div>

            {/* Review Summary */}
            <div className="bg-gray-800/30 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Registration Summary</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Role:</span>
                  <span className="text-white ml-2 capitalize">{selectedRole.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white ml-2">{watch('email')}</span>
                </div>
                <div>
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white ml-2">{watch('firstName')} {watch('lastName')}</span>
                </div>
                <div>
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-white ml-2">{watch('phone') || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Department:</span>
                  <span className="text-white ml-2">{watch('department')}</span>
                </div>
                <div>
                  <span className="text-gray-400">Academic Year:</span>
                  <span className="text-white ml-2">{watch('academicYear')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-600">
                <span className="text-gray-400 text-sm">Interests:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedInterests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-primary-400/20 text-primary-400 text-xs rounded-full border border-primary-400/30"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                {...register('terms', {
                  required: 'You must accept the terms and conditions'
                })}
                className="mt-1 w-4 h-4 text-primary-400 bg-gray-800 border-gray-600 rounded focus:ring-primary-400 focus:ring-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-300">
                I agree to the{' '}
                <a href="#" className="text-primary-400 hover:text-primary-300 underline">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-400 hover:text-primary-300 underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.terms.message}
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  step.id <= currentStep
                    ? 'border-primary-400 bg-primary-400 text-white'
                    : 'border-gray-600 bg-gray-800 text-gray-400'
                }`}>
                  {step.id < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                    step.id < currentStep ? 'bg-primary-400' : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-400">
              Step {currentStep} of {steps.length}
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </motion.button>
              )}

              {currentStep < steps.length ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  disabled={!isValid}
                  className="flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 hover:shadow-lg ml-auto"
                  whileHover={{ scale: isValid ? 1.05 : 1 }}
                  whileTap={{ scale: isValid ? 0.95 : 1 }}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 hover:shadow-lg ml-auto"
                  whileHover={{ scale: !isSubmitting && isValid ? 1.05 : 1 }}
                  whileTap={{ scale: !isSubmitting && isValid ? 0.95 : 1 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-gray-400">Already have an account? </span>
            <a
              href="/login"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
