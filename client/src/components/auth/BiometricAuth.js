import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Fingerprint, Eye, Smartphone, Shield, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const BiometricAuth = ({ onSuccess, onCancel, onFallback }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState('');
  const [biometricType, setBiometricType] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const { authenticateBiometric, enrollBiometric } = useAuth();

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      if (window.PublicKeyCredential) {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (available) {
          setIsSupported(true);
          // Check if biometrics are already enrolled
          const hasCredentials = await checkExistingCredentials();
          if (!hasCredentials) {
            setIsEnrolling(true);
          }
        }
      }
    } catch (error) {
      console.log('Biometric authentication not supported');
    }
  };

  const checkExistingCredentials = async () => {
    try {
      // Check for existing biometric credentials
      const credentials = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          rpId: window.location.hostname,
          userVerification: 'required'
        }
      });
      return !!credentials;
    } catch {
      return false;
    }
  };

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    setError('');

    try {
      await authenticateBiometric();
      onSuccess();
    } catch (error) {
      setError('Biometric authentication failed. Please try again.');
      console.error('Biometric auth error:', error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleEnrollBiometric = async () => {
    setIsEnrolling(true);
    setError('');

    try {
      await enrollBiometric();
      setIsEnrolling(false);
      setError('');
    } catch (error) {
      setError('Failed to enroll biometric. Please try again.');
      console.error('Enrollment error:', error);
    }
  };

  const handleFallback = () => {
    onFallback();
  };

  if (!isSupported) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 w-full max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <AlertCircle className="w-8 h-8 text-red-400" />
          </motion.div>

          <h2 className="text-2xl font-bold text-white mb-2">Biometric Not Supported</h2>
          <p className="text-gray-300 mb-6">
            Your device doesn't support biometric authentication. Please use an alternative method.
          </p>

          <motion.button
            onClick={handleFallback}
            className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Use Alternative Method
          </motion.button>
        </motion.div>
      </div>
    );
  }

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
            <Fingerprint className="w-8 h-8 text-primary-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Biometric Authentication</h2>
          <p className="text-gray-300">
            {isEnrolling 
              ? 'Set up biometric authentication for quick access'
              : 'Use your biometric to sign in securely'
            }
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {isEnrolling ? (
            /* Enrollment Flow */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fingerprint className="w-12 h-12 text-primary-400 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Set Up Biometric</h3>
                <p className="text-gray-300 text-sm">
                  Follow your device's prompts to register your fingerprint or face
                </p>
              </div>

              <motion.button
                onClick={handleEnrollBiometric}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Fingerprint className="w-4 h-4 mr-2" />
                Start Enrollment
              </motion.button>
            </motion.div>
          ) : (
            /* Authentication Flow */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Fingerprint className="w-12 h-12 text-primary-400" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">Touch Your Sensor</h3>
                <p className="text-gray-300 text-sm">
                  Place your finger on the sensor or look at your camera
                </p>
              </div>

              <motion.button
                onClick={handleBiometricAuth}
                disabled={isAuthenticating}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 hover:shadow-lg"
                whileHover={{ scale: !isAuthenticating ? 1.02 : 1 }}
                whileTap={{ scale: !isAuthenticating ? 0.98 : 1 }}
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Authenticate
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center text-red-400 text-sm bg-red-500/10 rounded-lg p-3"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

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
                onClick={handleFallback}
                className="flex items-center justify-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Password
              </motion.button>
              
              <motion.button
                onClick={handleFallback}
                className="flex items-center justify-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                2FA Code
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
            Make sure your biometric data is properly registered on your device
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BiometricAuth;
