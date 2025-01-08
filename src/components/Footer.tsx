import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const socialIconVariants = {
    hover: { 
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.footer 
      className="bg-gray-900 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-lg font-semibold"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              About SARC
            </motion.h3>
            <motion.p 
              className="text-gray-400 text-sm"
              variants={itemVariants}
            >
              Student Alumni Relations Cell bridges the gap between students and alumni,
              fostering meaningful connections and opportunities.
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-lg font-semibold"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-2">
              {[
                { href: "/", text: "Home" },
                { href: "/alumni", text: "Alumni" },
                { href: "/nitagram", text: "NITAGRAM" },
                { href: "/team", text: "Team" }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white text-sm inline-block"
                  >
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-lg font-semibold"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Contact Us
            </motion.h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <motion.li 
                className="flex items-center gap-2"
                whileHover={{ x: 10, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail size={16} />
                <span>sarc@nita.ac.in</span>
              </motion.li>
              <motion.li 
                className="flex items-center gap-2"
                whileHover={{ x: 10, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone size={16} />
                <span>+91 8827569820</span>
              </motion.li>
              <motion.li 
                className="flex items-center gap-2"
                whileHover={{ x: 10, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin size={16} />
                <span>NIT Agartala</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-lg font-semibold"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Follow Us
            </motion.h3>
            <motion.div 
              className="flex space-x-4"
              variants={itemVariants}
            >
              {[
                { icon: Linkedin, name: "LinkedIn", href: "https://www.linkedin.com/company/student-alumni-relation-cell-sarc/" },
                { icon: Instagram, name: "Instagram", href: "https://www.instagram.com/sarc_nita/" },
                
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transform"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Copyright */}
        <motion.div 
          className="mt-12 border-t border-gray-800 pt-8"
          variants={itemVariants}
        >
          <motion.p 
            className="text-center text-sm text-gray-400"
            whileHover={{ scale: 1.05 }}
          >
            {new Date().getFullYear()} Student Alumni Relations Cell. All rights reserved.
          </motion.p>
          <motion.p 
            className="text-center text-sm text-gray-400 mt-2"
            whileHover={{ scale: 1.05 }}
          >
            Design & Build By <a href="http://sochworks.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white">SochWorks Studios</a>
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
