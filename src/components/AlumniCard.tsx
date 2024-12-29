import React from 'react';
import { motion } from 'framer-motion';
import { cardHover, imageHover } from './animations/variants';
import { Mail, Linkedin, Twitter, Building2 } from 'lucide-react';

interface AlumniCardProps {
  name: string;
  batch: string;
  company: string;
  position: string;
  image: string;
  email: string;
  linkedin?: string;
  twitter?: string;
}

const AlumniCard: React.FC<AlumniCardProps> = ({
  name,
  batch,
  company,
  position,
  image,
  email,
  linkedin,
  twitter,
}) => {
  const socialLinks = [
    { icon: Mail, href: `mailto:${email}`, label: 'Email' },
    { icon: Building2, href: '#', label: company },
    linkedin && { icon: Linkedin, href: linkedin, label: 'LinkedIn' },
    twitter && { icon: Twitter, href: twitter, label: 'Twitter' },
  ].filter(Boolean);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      variants={cardHover}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div 
        className="relative h-64 overflow-hidden"
        variants={imageHover}
      >
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      </motion.div>

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-gray-600 text-sm mb-1">Batch of {batch}</p>
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-800 font-medium">{position}</p>
          <p className="text-gray-600">{company}</p>
        </motion.div>

        <motion.div 
          className="flex space-x-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {socialLinks.map((link, index) => (
            link && (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-900 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={link.label}
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            )
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AlumniCard;