import React from 'react';
import { motion } from 'framer-motion';
import { cardHover, imageHover } from './animations/variants';
import { Mail, Linkedin, Github, Building2, User } from 'lucide-react';

interface AlumniCardProps {
  name: string;
  batch: string;
  company: string;
  position: string;
  image: string;
  email: string;
  linkedin?: string;
  github?: string;
}

const AlumniCard: React.FC<AlumniCardProps> = ({
  name,
  batch,
  company,
  position,
  image,
  email,
  linkedin,
  github,
}) => {
  const socialLinks = [
    { icon: Mail, href: `mailto:${email}`, label: 'Email' },
    { icon: Building2, href: '#', label: company },
    linkedin && { icon: Linkedin, href: linkedin, label: 'LinkedIn' },
    github && { icon: Github, href: github, label: 'Github' },
  ].filter(Boolean);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://i.pravatar.cc/300?u=' + name;
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      variants={cardHover}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div 
        className="relative h-48 xs:h-56 sm:h-64 overflow-hidden bg-gray-100"
        variants={imageHover}
      >
        {image ? (
          <motion.img
            src={image}
            alt={name}
            onError={handleImageError}
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </motion.div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#1a355c] mb-1">{name}</h3>
        <p className="text-gray-600 mb-2">{position}</p>
        <p className="text-sm text-gray-500 mb-4">Batch of {batch}</p>
        
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((link, index) => 
            link && (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-[#1a355c] hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AlumniCard;