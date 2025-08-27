import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Lock, CheckCircle, AlertCircle, RefreshCw, Smartphone } from 'lucide-react';

const TwoFactorAuth = ({ onSuccess, onCancel, method = 'totp' }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const { verify2FA, resend2FA } = useAuth();

  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode([...newCode, ...Array(6 - newCode.length).fill('')]);
      setError('');
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async () => {
    const codeString = code.join('');
    if (codeString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      await verify2FA(codeString);
      onSuccess();
    } catch (error) {
      setError('Invalid verification code. Please try again.');
      // Clear the code on error
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      await resend2FA();
      setTimeLeft(30);
      setCanResend(false);
      setError('');
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Shield className="w-8 h-8 text-primary-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h2>
          <p className="text-gray-300">
            {method === 'totp' 
              ? 'Enter the 6-digit code from your authenticator app'
              : 'Enter the 6-digit code sent to your phone'
            }
          </p>
        </div>

        {/* Code Input */}
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300 text-center">
              Verification Code
            </label>
            
            <div className="flex justify-center space-x-2">
              {code.map((digit, index) => (
                <motion.input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-bold bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="•"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={!isCodeComplete || isVerifying}
            className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 hover:shadow-lg"
            whileHover={{ scale: isCodeComplete && !isVerifying ? 1.02 : 1 }}
            whileTap={{ scale: isCodeComplete && !isVerifying ? 0.98 : 1 }}
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Verify Code
              </>
            )}
          </motion.button>

          {/* Resend Code */}
          <div className="text-center">
            {!canResend ? (
              <p className="text-gray-400 text-sm">
                Resend code in {timeLeft} seconds
              </p>
            ) : (
              <motion.button
                onClick={handleResend}
                className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Resend Code
              </motion.button>
            )}
          </div>

          {/* Alternative Methods */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">Or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={() => {/* Handle SMS method */}}
                className="flex items-center justify-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                SMS
              </motion.button>
              
              <motion.button
                onClick={() => {/* Handle backup codes */}}
                className="flex items-center justify-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Shield className="w-4 h-4 mr-2" />
                Backup Code
              </motion.button>
            </div>
          </div>

          {/* Cancel Button */}
          <motion.button
            onClick={onCancel}
            className="w-full px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Contact support for assistance
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TwoFactorAuth;
