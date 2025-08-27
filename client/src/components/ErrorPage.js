import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ErrorPage = ({ 
  title = "Access Denied", 
  message = "You don't have permission to access this page.", 
  code = "403",
  showHomeButton = true 
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Logout the user before redirecting to login
          logout().then(() => {
            navigate('/login');
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, logout]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
          </motion.div>

                     {/* Error Code */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="text-center mb-4"
           >
             <h1 className="text-6xl font-bold text-red-400 mb-2">{code}</h1>
             <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
             <p className="text-gray-300 text-sm leading-relaxed">{message}</p>
             
                           {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20"
              >
                <p className="text-yellow-300 text-sm">
                  Logging out and redirecting to login page in <span className="font-bold text-yellow-400">{countdown}</span> seconds...
                </p>
              </motion.div>
           </motion.div>

                     {/* Action Buttons */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="space-y-3 mt-8"
           >
             <button
               onClick={() => {
                 logout().then(() => {
                   navigate('/login');
                 });
               }}
               className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium"
             >
               <Shield className="w-5 h-5" />
               Logout & Go to Login
             </button>
             
             {showHomeButton && (
               <Link
                 to="/"
                 className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium"
               >
                 <Home className="w-5 h-5" />
                 Go to Home
               </Link>
             )}
             
             <button
               onClick={() => window.history.back()}
               className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 font-medium border border-white/20"
             >
               <ArrowLeft className="w-5 h-5" />
               Go Back
             </button>
           </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20"
          >
            <div className="flex items-center gap-2 text-blue-300 text-sm">
              <Shield className="w-4 h-4" />
              <span>This page is protected for security reasons.</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
