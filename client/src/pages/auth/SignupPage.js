import React from 'react';
import { motion } from 'framer-motion';
import StudentSignupForm from '../../components/auth/StudentSignupForm';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        
        {/* Interactive Floating Shapes */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          animate={{ 
            y: [0, 15, 0],
            scale: [1, 0.9, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2 
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4 
          }}
        />
        
        {/* Additional floating particles */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-3 h-3 bg-yellow-400/30 rounded-full"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full"
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
        />
      </div>
      
      <StudentSignupForm />
    </div>
  );
};

export default SignupPage;
