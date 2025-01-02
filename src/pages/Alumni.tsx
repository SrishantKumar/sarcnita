import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AlumniCard from '../components/AlumniCard';

const alumniList = [
  {
    name: "Priya Mehta",
    batch: "2015",
    company: "TechStart Solutions",
    position: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    email: "priya.mehta@techstart.com",
    linkedin: "https://linkedin.com/in/priyamehta",
    github: "https://github.com/priyamehta"
  },
  {
    name: "Amit Kumar",
    batch: "2010",
    company: "MIT Research Lab",
    position: "Senior Research Scientist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    email: "amit.kumar@mit.edu",
    linkedin: "https://linkedin.com/in/amitkumar",
    github: "https://github.com/amitkumar"
  },
  {
    name: "Srishant Kumar",
    batch: "2018",
    company: "Google",
    position: "Senior Software Engineer",
    image: "https://i.imgur.com/CC0IGFA.jpeg?auto=format&fit=crop&q=80&w=800",
    email: "srishant.kumar@google.com",
    linkedin: "https://linkedin.com/in/iamsrishant",
    github: "https://github.com/srishant"
  }
];

const Alumni: React.FC = () => {
  const [companyFilter, setCompanyFilter] = useState('');

  const filteredAlumni = companyFilter
    ? alumniList.filter(alumni => alumni.company.toLowerCase().includes(companyFilter.toLowerCase()))
    : alumniList;

  const companies = [...new Set(alumniList.map(alumni => alumni.company))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900">Alumni</h1>
          <p className="mt-4 text-xl text-gray-600">Connect with our distinguished alumni</p>
        </motion.div>

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            key={companyFilter}
          >
            {filteredAlumni.map((alumni, index) => (
              <AlumniCard
                key={index}
                name={alumni.name}
                batch={alumni.batch}
                company={alumni.company}
                position={alumni.position}
                image={alumni.image}
                email={alumni.email}
                linkedin={alumni.linkedin}
                github={alumni.github}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Alumni;