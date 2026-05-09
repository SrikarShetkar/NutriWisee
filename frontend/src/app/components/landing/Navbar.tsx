import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { ChefHat, Menu, X, Sparkles } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for text reveal
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 shadow-md'
            : 'bg-white/90'
        } backdrop-blur-md border-b border-gray-100`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with Enhanced Animation */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Floating Chef Hat */}
              <motion.div
                className="relative w-10 h-10 flex items-center justify-center"
                animate={{ y: isHovered ? -4 : 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
              >
                {/* Glow effect */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg blur-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Chef Hat Icon */}
                <motion.div
                  className="relative w-10 h-10 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChefHat className="w-5 h-5 text-white" />
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-white/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </motion.div>

              {/* Text Logo with Character Animation */}
              <div className="flex items-center space-x-1 overflow-hidden">
                {'NutriWise'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Optional shine effect */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-green-400 ml-1"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Features Link */}
              <motion.a
                href="#features"
                className="relative text-gray-600 hover:text-green-600 transition-colors font-medium group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Features
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                />
              </motion.a>

              {/* How It Works Link */}
              <motion.a
                href="#how-it-works"
                className="relative text-gray-600 hover:text-green-600 transition-colors font-medium group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                How It Works
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                />
              </motion.a>

              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                {/* Login Link */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-green-600 transition-colors font-medium"
                  >
                    Login
                  </Link>
                </motion.div>

                {/* Sign Up Button */}
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(34, 197, 94, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/signup"
                    className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 md:hidden z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-3">
              {/* Features */}
              <motion.a
                href="#features"
                className="block text-gray-600 hover:text-green-600 font-medium py-2 px-3 rounded-lg hover:bg-green-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                Features
              </motion.a>

              {/* How It Works */}
              <motion.a
                href="#how-it-works"
                className="block text-gray-600 hover:text-green-600 font-medium py-2 px-3 rounded-lg hover:bg-green-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                How It Works
              </motion.a>

              {/* Divider */}
              <div className="my-2 h-px bg-gray-200" />

              {/* Login */}
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/login"
                  className="block text-gray-600 hover:text-green-600 font-medium py-2 px-3 rounded-lg hover:bg-green-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </motion.div>

              {/* Sign Up */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/signup"
                  className="block px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-center font-medium shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
