import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'like' | 'comment';
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ isOpen, onClose, action }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container - for centering */}
          <div className="min-h-screen px-4 text-center">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform"
            >
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Content */}
                <div className="px-6 py-8">
                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <img
                      src="/logo.png"
                      alt="SARC Logo"
                      className="h-16 w-auto"
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    Join the SARC NITA Community
                  </h2>

                  <p className="text-gray-600 text-center mb-8">
                    {action === 'like'
                      ? 'Log in to like posts and show your appreciation!'
                      : 'Log in to join the conversation and connect with alumni!'}
                  </p>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link
                      to="/auth"
                      className="block w-full bg-blue-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-800 transition-colors text-center"
                    >
                      Log In
                    </Link>
                    <button
                      onClick={onClose}
                      className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginPromptModal;
