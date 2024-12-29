import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp } from './animations/variants';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#1E40AF",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const statusVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.form 
        onSubmit={handleSubmit}
        variants={formVariants}
        className="space-y-4"
      >
        <motion.h2 
          className="text-2xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Subscribe to Our Newsletter
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Stay updated with the latest alumni news and events.
        </motion.p>

        <motion.div className="relative">
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            variants={inputVariants}
            whileFocus="focus"
          />
        </motion.div>

        <motion.button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Subscribe
        </motion.button>

        <AnimatePresence mode="wait">
          {status !== 'idle' && (
            <motion.div
              key={status}
              variants={statusVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`text-center p-2 rounded ${
                status === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {status === 'success' 
                ? '✓ Successfully subscribed!' 
                : '× Something went wrong. Please try again.'}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.div>
  );
};

export default NewsletterForm;