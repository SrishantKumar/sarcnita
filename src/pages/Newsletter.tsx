import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import NewsletterForm from '../components/NewsletterForm';

const newsletters = [
  {
    id: 1,
    title: "March 2024 Newsletter",
    description: "Featuring alumni success stories and upcoming events",
    link: "#"
  },
  {
    id: 2,
    title: "February 2024 Newsletter",
    description: "Campus updates and alumni achievements",
    link: "#"
  },
  {
    id: 3,
    title: "January 2024 Newsletter",
    description: "New year special: Looking back at 2023",
    link: "#"
  }
];

const Newsletter: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Stay Connected</h1>
          <p className="text-xl text-gray-600">
            Subscribe to our monthly newsletter and stay updated with the latest alumni news, events, and opportunities.
          </p>
        </motion.div>

        <motion.div 
          className="mb-16"
          variants={itemVariants}
        >
          <NewsletterForm />
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold mb-8 text-gray-900">Previous Newsletters</h2>
          <div className="space-y-4">
            {newsletters.map((newsletter) => (
              <motion.div 
                key={newsletter.id} 
                className="flex items-center p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-300 bg-white"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                variants={itemVariants}
              >
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FileText className="h-8 w-8 text-blue-900" />
                  </motion.div>
                </div>
                <div className="ml-6 flex-grow">
                  <h3 className="font-semibold text-lg text-gray-900">{newsletter.title}</h3>
                  <p className="text-gray-600 mt-1">{newsletter.description}</p>
                </div>
                <motion.a
                  href={newsletter.link}
                  className="ml-4 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Read</span>
                  <motion.span 
                    initial={{ x: 0 }} 
                    whileHover={{ x: 3 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Newsletter;