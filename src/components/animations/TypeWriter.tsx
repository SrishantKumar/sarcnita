import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypeWriterProps {
  text: string;
  className?: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const startTyping = useCallback(() => {
    setDisplayedText('');
    setIsTypingComplete(false);
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [text]);

  useEffect(() => {
    const cleanup = startTyping();
    return cleanup;
  }, [startTyping]);

  const handleHover = () => {
    if (!isHovered) {
      setIsHovered(true);
      startTyping();
    }
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <motion.div 
      className={`relative inline-flex items-center ${className}`}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
    >
      <span>{displayedText}</span>
      <AnimatePresence>
        {isTypingComplete && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.2, 0.8, 1]
            }}
            className="ml-[2px] font-light text-white"
            style={{ fontSize: "1.1em" }}
          >
            |
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TypeWriter;
