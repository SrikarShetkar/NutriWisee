import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router';

// Logo pulse animation
const logoPulse = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  },
};

// Title reveal animation
const titleVariants = {
  hidden: { opacity: 0, scale: 0.5, y: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
    },
  },
};

// Tagline animation
const taglineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.8,
      ease: 'easeOut',
    },
  },
};

// Background gradient animation
const backgroundVariants = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
    transition: {
      duration: 8,
      repeat: Infinity,
    },
  },
};

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Redirect to landing page after animation completes
    const timer = setTimeout(() => {
      setIsComplete(true);
      // Small delay before transitioning
      setTimeout(() => {
        navigate('/landing');
      }, 500);
    }, 3500); // Total animation time

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden"
      variants={backgroundVariants}
      animate="animate"
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 -left-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 right-0 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Chef Hat Logo with Animation */}
        <motion.div
          animate="animate"
          variants={logoPulse}
          className="mb-8"
        >
          <div className="relative w-24 h-24 mx-auto">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl transform opacity-75 blur-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <ChefHat className="w-12 h-12 text-white" />
            </div>
          </div>
        </motion.div>

        {/* NutriWise Title with Font Styling */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            NutriWise
          </h1>
        </motion.div>

        {/* Tagline with Animation */}
        <motion.div
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="text-2xl sm:text-3xl font-bold text-gray-700">
            <span className="inline-block mr-3">🌱</span>
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Smart Nutrition, Smarter You
            </span>
            <span className="inline-block ml-3">✨</span>
          </div>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex justify-center space-x-2"
        >
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          <div className="w-2.5 h-2.5 bg-teal-500 rounded-full" />
        </motion.div>
      </div>

      {/* Skip option after animation starts */}
      {isComplete && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 hover:text-gray-700 text-sm"
          onClick={() => navigate('/landing')}
        >
          Redirecting...
        </motion.button>
      )}
    </motion.div>
  );
};
