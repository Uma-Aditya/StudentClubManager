import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowLeft, Home, User } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 text-center"
        >
          {/* Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Shield className="w-12 h-12 text-red-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Access Denied
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 mb-8 text-lg"
          >
            You don't have permission to access this page. Please contact an administrator if you believe this is an error.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <motion.button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </motion.button>

            <motion.button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </motion.button>

            <motion.button
              onClick={() => navigate('/login')}
              className="w-full flex items-center justify-center px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <User className="w-4 h-4 mr-2" />
              Sign In
            </motion.button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-4 bg-gray-800/30 rounded-xl border border-gray-600/50"
          >
            <div className="flex items-center justify-center text-gray-400 mb-2">
              <Lock className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Security Notice</span>
            </div>
            <p className="text-xs text-gray-500">
              This page is protected and requires proper authentication and authorization. 
              If you need access, please contact your system administrator.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Unauthorized;
