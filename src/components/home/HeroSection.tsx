import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import TypeWriter from '../animations/TypeWriter';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center bg-[url('/images/hero-bg.png')] bg-cover bg-center bg-no-repeat text-white py-8 xs:py-12 sm:py-16 md:py-20">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center px-3 xs:px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 xs:mb-5 sm:mb-6"
        >
          <img 
            src="/logo.png" 
            alt="SARC Logo" 
            className="h-16 xs:h-20 sm:h-24 md:h-32 lg:h-36 mx-auto object-contain"
          />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 whitespace-nowrap"
        >
          <TypeWriter text="Student Alumni Relations Cell" />
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base xs:text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed whitespace-pre-line"
        >
          {"Bridging the gap between NIT Agartala's past and future\nthrough mentorship, knowledge sharing, and networking."}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col xs:flex-row items-center justify-center gap-3 xs:gap-4"
        >
          <Link
            to="/alumni"
            className="w-full xs:w-auto inline-flex items-center justify-center px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 border border-transparent text-sm xs:text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 transition-colors duration-300"
          >
            Explore More
            <ArrowUpRight className="ml-2 h-4 w-4 xs:h-5 xs:w-5 stroke-2" />
          </Link>
          <Link
            to="/team"
            className="w-full xs:w-auto inline-flex items-center justify-center px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 border-2 border-white text-sm xs:text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-300"
          >
            Meet Our Team
            <Users className="ml-2 h-4 w-4 xs:h-5 xs:w-5 stroke-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;