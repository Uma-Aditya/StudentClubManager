import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  MapPin, 
  Calendar,
  GraduationCap,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowLeft,
  School,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const StudentSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange'
  });

  const password = watch('password');

  const interests = [
    'Programming', 'AI & Machine Learning', 'Web Development', 'Mobile Development',
    'Data Science', 'Cybersecurity', 'Game Development', 'UI/UX Design',
    'Cloud Computing', 'Blockchain', 'Robotics', 'IoT',
    'Digital Marketing', 'Graphic Design', 'Video Editing', 'Music Production',
    'Photography', 'Writing', 'Public Speaking', 'Leadership',
    'Sports', 'Fitness', 'Cooking', 'Travel', 'Art', 'Literature'
  ];

  const departments = [
    'Computer Science', 'Information Technology', 'Software Engineering',
    'Data Science', 'Cybersecurity', 'Computer Engineering',
    'Business Administration', 'Marketing', 'Finance',
    'Engineering', 'Mathematics', 'Physics',
    'Biology', 'Chemistry', 'Psychology',
    'English', 'History', 'Political Science',
    'Economics', 'Sociology', 'Philosophy'
  ];

  const academicYears = [
    { value: 1, label: '1st Year' },
    { value: 2, label: '2nd Year' },
    { value: 3, label: '3rd Year' },
    { value: 4, label: '4th Year' },
    { value: 5, label: '5th Year (Graduate)' }
  ];

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      
      // Add selected interests to form data
      const formData = {
        ...data,
        interests: selectedInterests,
        role: 'member'
      };
      
      console.log('📝 Student signup data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Account created successfully! Welcome to the community! 🎉');
      
      // Here you would typically redirect to login or dashboard
      // For now, just show success message
      
    } catch (error) {
      console.error('❌ Signup error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: User },
    { number: 2, title: 'Academic Details', icon: GraduationCap },
    { number: 3, title: 'Personal Info', icon: Heart }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto relative"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"
        />
      </div>

      <motion.div 
        className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 relative overflow-hidden"
        whileHover={{ 
          scale: 1.01,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
        
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 relative"
            whileHover={{ 
              scale: 1.1,
              rotate: 5
            }}
            transition={{ duration: 0.3 }}
          >
            <GraduationCap className="w-12 h-12 text-white" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-0 hover:opacity-100 transition-opacity"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <motion.h1 
            className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Join Our Community
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 text-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Start your journey with us and connect with amazing students
          </motion.p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <motion.div
                  key={step.number}
                  className="flex items-center"
                  initial={{ opacity: 0, x: index * 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center relative ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : isCompleted 
                          ? 'bg-green-500 text-white'
                          : 'bg-white/10 text-gray-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </motion.div>
                  
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`}>
                      Step {step.number}
                    </p>
                    <p className={`text-lg font-semibold ${
                      isActive ? 'text-white' : 'text-gray-300'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <motion.div
                      className={`w-16 h-0.5 mx-4 ${
                        isCompleted ? 'bg-green-500' : 'bg-white/20'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isCompleted ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {/* Step 1: Basic Information */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-blue-400" />
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-white font-medium mb-3">First Name *</label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'First name is required' })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-white font-medium mb-3">Last Name *</label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Last name is required' })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-medium mb-3">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-white font-medium mb-3">Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters'
                          }
                        })}
                        className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-white font-medium mb-3">Confirm Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: value => value === password || 'Passwords do not match'
                        })}
                        className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 2: Academic Details */}
          <AnimatePresence mode="wait">
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-purple-400" />
                  Academic Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Department */}
                  <div>
                    <label className="block text-white font-medium mb-3">Department *</label>
                    <select
                      {...register('department', { required: 'Please select your department' })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="" className="bg-gray-800 text-white">Select your department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept} className="bg-gray-800 text-white">
                          {dept}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.department.message}
                      </p>
                    )}
                  </div>

                  {/* Academic Year */}
                  <div>
                    <label className="block text-white font-medium mb-3">Academic Year *</label>
                    <select
                      {...register('academicYear', { required: 'Please select your academic year' })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="" className="bg-gray-800 text-white">Select your year</option>
                      {academicYears.map(year => (
                        <option key={year.value} value={year.value} className="bg-gray-800 text-white">
                          {year.label}
                        </option>
                      ))}
                    </select>
                    {errors.academicYear && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.academicYear.message}
                      </p>
                    )}
                  </div>

                  {/* Student ID */}
                  <div>
                    <label className="block text-white font-medium mb-3">Student ID *</label>
                    <input
                      type="text"
                      {...register('studentId', { required: 'Student ID is required' })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your student ID"
                    />
                    {errors.studentId && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.studentId.message}
                      </p>
                    )}
                  </div>

                  {/* University */}
                  <div>
                    <label className="block text-white font-medium mb-3">University *</label>
                    <input
                      type="text"
                      {...register('university', { required: 'University name is required' })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your university name"
                    />
                    {errors.university && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.university.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Personal Information */}
          <AnimatePresence mode="wait">
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-pink-400" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-white font-medium mb-3">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-white font-medium mb-3">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        {...register('dateOfBirth')}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-white font-medium mb-3">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        {...register('location')}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  {/* Website/Portfolio */}
                  <div>
                    <label className="block text-white font-medium mb-3">Website/Portfolio</label>
                    <input
                      type="url"
                      {...register('website')}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-medium mb-3">Bio</label>
                    <textarea
                      {...register('bio')}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                    />
                  </div>

                  {/* Interests */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-medium mb-3">Interests & Skills</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {interests.map((interest) => (
                        <motion.button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestToggle(interest)}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                            selectedInterests.includes(interest)
                              ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                              : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {interest}
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Selected: {selectedInterests.length} interests
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div 
            className="flex justify-between items-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {/* Back Button */}
            {currentStep > 1 && (
              <motion.button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </motion.button>
            )}

            {/* Next/Submit Button */}
            {currentStep < 3 ? (
              <motion.button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ml-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next Step
                <BookOpen className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ml-auto relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Create Account
                  </>
                )}
                
                {/* Sparkle effect */}
                {!isLoading && (
                  <motion.div
                    className="absolute right-2 opacity-0 group-hover:opacity-100"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </motion.div>
                )}
              </motion.button>
            )}
          </motion.div>
        </motion.form>

        {/* Compact Demo Credentials */}
        <motion.div 
          className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.div 
            className="text-center mb-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <h3 className="text-lg font-bold text-white mb-1 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Demo Credentials
            </h3>
            <p className="text-gray-300 text-xs">
              Test the project without creating an account
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Admin Demo */}
            <motion.div 
              className="p-3 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-purple-300 font-semibold text-xs">Admin</span>
              </div>
              <div className="text-xs space-y-1">
                <div className="text-gray-300">admin@university.edu</div>
                <div className="text-gray-300">admin123</div>
              </div>
            </motion.div>
            
            {/* Student Demo */}
            <motion.div 
              className="p-3 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-300 font-semibold text-xs">Student</span>
              </div>
              <div className="text-xs space-y-1">
                <div className="text-gray-300">student@university.edu</div>
                <div className="text-gray-300">student123</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <p className="text-gray-400 text-xs">
              💡 Select "Administrator" tab for admin, "Student" tab for student
            </p>
          </motion.div>
        </motion.div>

        {/* Back to Login */}
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          <p className="text-gray-300 text-lg">
            Already have an account?{' '}
            <Link 
              to="/login"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </motion.div>

        {/* Floating particles */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-blue-400 rounded-full"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default StudentSignupForm;
