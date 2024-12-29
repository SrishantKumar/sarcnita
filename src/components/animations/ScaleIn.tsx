import React from 'react';
import { motion } from 'framer-motion';

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
}

const ScaleIn: React.FC<ScaleInProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;