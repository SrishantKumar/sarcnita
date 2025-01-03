import React from 'react';
import { motion } from 'framer-motion';
import { cardHover, imageHover } from './animations/variants';
import { Mail, Linkedin, Github } from 'lucide-react';

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  email: string;
  linkedin?: string;
  github?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  image,
  email,
  linkedin,
  github,
}) => {
  const socialLinks = [
    { icon: Mail, href: `mailto:${email}`, label: 'Email' },
    linkedin && { icon: Linkedin, href: linkedin, label: 'LinkedIn' },
    github && { icon: Github, href: github, label: 'Github' },
  ].filter(Boolean);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      variants={cardHover}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div 
        className="relative h-48 xs:h-56 sm:h-64 overflow-hidden"
        variants={imageHover}
      >
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      </motion.div>

      <div className="p-4 xs:p-5 sm:p-6">
        <h3 className="text-lg xs:text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-sm xs:text-base text-gray-600 mt-1">{role}</p>
        <div className="mt-3 xs:mt-4 flex gap-3 xs:gap-4">
          {socialLinks.map((link: any, index: number) => (
            link && (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                <link.icon className="h-5 w-5 stroke-2" />
                <span className="sr-only">{link.label}</span>
              </a>
            )
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;