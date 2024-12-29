import React from 'react';
import { motion } from 'framer-motion';

interface StaggerProps {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
}

const Stagger: React.FC<StaggerProps> = ({ children, delay = 0, staggerDelay = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default Stagger;