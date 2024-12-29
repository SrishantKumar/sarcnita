import React from 'react';
import { motion } from 'framer-motion';

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
                { href: "/blog", text: "Blog" },
                { href: "/team", text: "Team" }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white text-sm inline-block"
                    whileHover={{ color: "#ffffff" }}
                  >
                    {link.text}
                  </motion.a>
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
              {[
                "Email: sarc@example.com",
                "Phone: +91 XXX XXX XXXX",
                "Location: Your Institution Name"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 10, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item}
                </motion.li>
              ))}
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
                {
                  name: "LinkedIn",
                  path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                },
                {
                  name: "Instagram",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                },
                {
                  name: "Twitter",
                  path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="text-gray-400 hover:text-white transform"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
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
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
