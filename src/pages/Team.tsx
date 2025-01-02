import React from 'react';
import { motion } from 'framer-motion';
import TeamCard from '../components/TeamCard';

const teamMembers = [
  {
    name: "Varun Srivastava",
    role: "General Secretary",
    image: "https://i.imgur.com/a2UDovQ.jpeg?auto=format&fit=crop&q=80&w=800",
    email: "Varun@example.com",
    linkedin: "https://www.linkedin.com/in/varun-srivastava-nita/",
    github: "https://github.com"
  },
  {
    name: "Harish Saharan",
    role: "Assistant General Secretary",
    image: "https://i.imgur.com/a1dlYpE.jpeg?auto=format&fit=crop&q=80&w=800",
    email: "harish.saharan@example.com",
    linkedin: "https://www.linkedin.com/in/harish-saharan-354064257/",
    github: "https://github.com"
  },
  {
    name: "Kuldip Chakraborty",
    role: "Assistant General Secretary",
    image: "https://i.imgur.com/rnr0X6W.jpeg?auto=format&fit=crop&q=80&w=800",
    email: "kuldip.chakraborty@example.com",
    linkedin: "https://www.linkedin.com/in/kuldip-chakraborty-1a8b7a253/",
    github: "https://github.com"
  },
  {
    name: "Akmal Hossain",
    role: "Management Head",
    image: "https://i.imgur.com/h7InPwK.jpeg?auto=format&fit=crop&q=80&w=800",
    email: "akmal.hossain@example.com",
    linkedin: "https://www.linkedin.com/in/akmal-hossain-72a7b5277/",
    github: "https://github.com"
  },
  {
    name: "Anshu Pal",
    role: "Management Head",
    image: "https://i.imgur.com/4FHcDyf.jpeg?auto=format&fit=crop&q=80&w=800",
    email: "sarah.johnson@example.com",
    linkedin: "https://www.linkedin.com/in/anshu-pal-2576292a7/",
    github: "https://github.com"
  },
  
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