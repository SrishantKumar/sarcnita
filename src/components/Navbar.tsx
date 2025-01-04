import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { scrollY } = useScroll();

  const headerHeight = useTransform(scrollY, [0, 100], ["5rem", "4rem"]);
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["none", "0 2px 4px rgba(0,0,0,0.1)"]
  );

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Team', href: '/team' },
    { name: 'Alumni', href: '/alumni' },
    { name: 'NITAGRAM', href: '/nitagram' },
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItemVariants = {
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const logoVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.nav
      style={{
        height: headerHeight,
        boxShadow: headerShadow,
        backgroundColor: "white"
      }}
      className="fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <motion.div
            initial="initial"
            whileHover="hover"
            className="flex items-center"
          >
            <Link to="/" className="flex-shrink-0">
              <motion.img
                variants={logoVariants}
                className="h-12 w-auto"
                src="/logo.png"
                alt="SARC"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <div className="flex space-x-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const isHovered = hoveredItem === item.name;

                return (
                  <motion.div
                    key={item.name}
                    variants={navItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onHoverStart={() => setHoveredItem(item.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="relative"
                  >
                    <Link
                      to={item.href}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden flex items-center ${
                        isActive ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#1a355c] to-[#234672] rounded-xl z-0"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: isActive || isHovered ? 1 : 0,
                          opacity: isActive ? 1 : isHovered ? 0.8 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="relative z-10">{item.name}</span>
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isHovered ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className={`ml-1 w-4 h-4 ${isActive || isHovered ? 'text-white' : 'text-gray-400'}`} />
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {user ? (
              <div className="flex items-center pl-6 space-x-4 border-l border-gray-200">
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={navItemVariants}
                >
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      {profile?.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt="Profile"
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500 ring-offset-2"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center ring-2 ring-blue-500 ring-offset-2">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>
                    <span>{profile?.username || user.email}</span>
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    rotate: 90,
                    color: "#EF4444"
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSignOut}
                  className="p-2 text-gray-700 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </motion.button>
              </div>
            ) : (
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/auth"
                  className="flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1a355c] to-[#234672] rounded-xl hover:shadow-lg hover:shadow-[#1a355c]/30 transition-all duration-300"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                  </motion.div>
                  Sign In
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.div
            className="flex items-center md:hidden"
            whileTap={{ scale: 0.9 }}
          >
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-gradient-to-r from-[#1a355c] to-[#234672] text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.4 },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.4 },
                opacity: { duration: 0.3 }
              }
            }}
            className="md:hidden overflow-hidden bg-white"
          >
            <div className="px-4 pt-2 pb-3 space-y-2">
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: { delay: index * 0.1 }
                    }}
                    exit={{ x: -20, opacity: 0 }}
                  >
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#1a355c] to-[#234672] text-white'
                          : 'text-gray-700 hover:bg-blue-50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}

              {user ? (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: { delay: navigation.length * 0.1 }
                  }}
                  className="pt-4 border-t border-gray-200"
                >
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                      {profile?.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt="Profile"
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500 ring-offset-2"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center ring-2 ring-blue-500 ring-offset-2">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </motion.div>
                    <span>{profile?.username || user.email}</span>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="mt-2 w-full flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-[#1a355c] to-[#234672] rounded-xl shadow-lg shadow-[#1a355c]/30"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: { delay: navigation.length * 0.1 }
                  }}
                  className="pt-4 border-t border-gray-200"
                >
                  <Link
                    to="/auth"
                    className="flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-[#1a355c] to-[#234672] rounded-xl shadow-lg shadow-[#1a355c]/30"
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <User className="h-5 w-5 mr-2" />
                    </motion.div>
                    Sign In
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;