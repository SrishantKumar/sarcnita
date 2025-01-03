import React, { useEffect } from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/nitagram');
    }
  }, [user, navigate]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - SARC Info */}
        <motion.div 
          className="hidden md:block space-y-8 p-8"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <img 
              src="/logo.png" 
              alt="SARC Logo" 
              className="h-24 mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold text-blue-900 mb-4 whitespace-nowrap">
              Student Alumni Relations Cell
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Bridging the gap between NIT Agartala's past and future through mentorship, 
              knowledge sharing, and networking.
            </p>
          </div>
        </motion.div>

        {/* Right side - Auth Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white p-8 rounded-2xl shadow-xl backdrop-blur-sm bg-white/80">
            <div className="md:hidden text-center mb-8">
              <img 
                src="/logo.png" 
                alt="SARC Logo" 
                className="h-16 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900">Welcome to SARC</h2>
              <p className="mt-2 text-gray-600">Sign in to connect with the NITA community</p>
            </div>
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#1e3a8a',
                      brandAccent: '#2563eb',
                      inputBackground: 'white',
                      inputText: '#1f2937',
                      inputBorder: '#e5e7eb',
                    },
                    borderWidths: {
                      buttonBorderWidth: '0px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '0.75rem',
                      buttonBorderRadius: '0.75rem',
                      inputBorderRadius: '0.75rem',
                    },
                  },
                },
                className: {
                  container: 'w-full',
                  button: 'w-full px-4 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-shadow duration-200',
                  input: 'w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                  label: 'text-sm font-medium text-gray-700',
                  loader: 'text-blue-900',
                },
              }}
              providers={[]}
              redirectTo={`${window.location.origin}/nitagram`}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Auth;
