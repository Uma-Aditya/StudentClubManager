import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Floating animation for background elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Shake animation for errors
  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      
      console.log('🔐 Form data submitted:', data);
      console.log('🎯 Active tab:', activeTab);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call login with the correct role
      const result = await login(data.email, data.password, activeTab);
      
      if (result.success) {
        toast.success('Login successful!');
      }
    } catch (error) {
      console.error('❌ Form submission error:', error);
      setShake(true);
      toast.error(error.message || 'Login failed');
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  // Debug function to test input interaction
  const handleInputChange = (e) => {
    console.log('📝 Input changed:', e.target.name, e.target.value);
  };

  const tabs = [
    { id: 'student', label: 'Student', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 'administrator', label: 'Administrator', icon: Shield, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-md mx-auto relative"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ ...floatingAnimation, delay: 1 }}
          className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ ...floatingAnimation, delay: 2 }}
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"
        />
      </div>

      <motion.div 
        className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 relative overflow-hidden"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
        
        {/* Header with enhanced animations */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div 
            className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 relative"
            whileHover={{ 
              scale: 1.1,
              rotate: 5
            }}
            transition={{ duration: 0.3 }}
          >
            <Shield className="w-10 h-10 text-white" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-0 hover:opacity-100 transition-opacity"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Welcome Back
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Sign in to your account
          </motion.p>
        </motion.div>

        {/* Enhanced Role Tabs */}
        <motion.div 
          className="flex bg-white/10 rounded-2xl p-1.5 mb-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <motion.div 
                  className="relative z-10 flex items-center gap-3"
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span className="font-semibold">{tab.label}</span>
                </motion.div>
                
                {isActive && (
                  <motion.div
                    className="absolute top-0 right-2 w-2 h-2 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Enhanced Login Form */}
        <motion.form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <label className="block text-white font-medium mb-3 text-lg">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              <input
                type="email"
                name="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15 hover:border-white/30 focus:bg-white/20 focus:border-blue-400 relative z-10"
                placeholder="Enter your email"
                autoComplete="email"
              />
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={false}
              />
            </div>
            
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <label className="block text-white font-medium mb-3 text-lg">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                onChange={handleInputChange}
                className="w-full pl-12 pr-16 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15 hover:border-white/30 focus:bg-white/20 focus:border-blue-400 relative z-10"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 p-1 rounded-lg hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </motion.button>
              
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={false}
              />
            </div>
            
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Remember Me & Forgot Password */}
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <label className="flex items-center gap-3 cursor-pointer group">
              <motion.div
                className="w-5 h-5 border-2 border-white/30 rounded-md flex items-center justify-center transition-all duration-300 group-hover:border-blue-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="w-3 h-3 bg-blue-500 rounded-sm"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
              <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">Remember me</span>
            </label>
            
            <motion.button
              type="button"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-300 hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Forgot password?
            </motion.button>
          </motion.div>

          {/* Enhanced Sign In Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 text-white rounded-2xl font-semibold text-lg relative overflow-hidden group"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Button content */}
              <motion.div className="relative z-10 flex items-center gap-3">
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <CheckCircle className="w-6 h-6" />
                )}
                <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
              </motion.div>
              
              {/* Sparkle effect */}
              {!isLoading && (
                <motion.div
                  className="absolute right-4 opacity-0 group-hover:opacity-100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </motion.div>
              )}
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Compact Demo Credentials */}
        <motion.div 
          className="mt-6 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Admin Demo */}
            <motion.div 
              className="p-2 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-1">
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
              className="p-2 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-1">
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
            transition={{ delay: 2.6, duration: 0.6 }}
          >
            <p className="text-gray-400 text-xs">
              💡 Select "Administrator" tab for admin, "Student" tab for student
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced Sign Up Link */}
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
        >
          <p className="text-gray-300 text-lg">
            Don't have an account?{' '}
            <Link to="/signup">
              <motion.button 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold hover:underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign up
              </motion.button>
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
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>

      {/* Error shake animation */}
      <AnimatePresence>
        {shake && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={shakeAnimation}
            onAnimationComplete={() => setShake(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoginForm;
