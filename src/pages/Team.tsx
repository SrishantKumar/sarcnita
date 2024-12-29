import React from 'react';
import { motion } from 'framer-motion';
import TeamCard from '../components/TeamCard';

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Faculty Advisor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    email: "sarah.johnson@example.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    name: "Srishant Kumar",
    role: "Student Coordinator",
    image: "https://i.imgur.com/CC0IGFA.jpeg?auto=format&fit=crop&q=80&w=800",
    email: "srishant@example.com",
    linkedin: "https://linkedin.com/in/iamsrishant",
    github: "https://github.com/iamsrishant"
  }
];

const Team: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-gray-900">Our Team</h1>
          <p className="mt-4 text-xl text-gray-600">Meet the dedicated individuals driving SARC forward</p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              email={member.email}
              linkedin={member.linkedin}
              github={member.github}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Team;