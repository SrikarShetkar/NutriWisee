import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { ArrowRight, Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-20 pb-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 -left-32 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-32 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
        animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-56 h-56 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
        animate={{ y: [0, 50, 0], x: [0, -100, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-block px-4 py-2 bg-green-100/50 backdrop-blur-sm rounded-full border border-green-200/50">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  AI-Powered Nutrition Platform
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block text-gray-900">Eat Smart.</span>
            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Live Better.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            AI-powered personalized nutrition for modern lifestyles. Analyze your food, 
            discover recipes, and achieve your health goals with intelligent recommendations.
          </motion.p>

          {/* Food Images Showcase */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <div className="flex justify-center space-x-4 overflow-x-auto pb-4">
              <div className="flex space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3NhfGVufDB8fHx8MTc3NzM1MDI5N3ww&ixlib=rb-4.1.0&q=80&w=300"
                    alt="Dosa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-2">
                    <span className="text-white text-sm font-medium">Dosa</span>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1626776877544-39d9b5a7b144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJZGxpfGVufDB8fHx8MTc3NzM1MDM0NXww&ixlib=rb-4.1.0&q=80&w=300"
                    alt="Idli"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-2">
                    <span className="text-white text-sm font-medium">Idli</span>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1639024471283-03518883512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1iYXJ8ZW58MHx8fHwxNzc3MzUwMzc5fDA&ixlib=rb-4.1.0&q=80&w=300"
                    alt="Sambar"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-2">
                    <span className="text-white text-sm font-medium">Sambar</span>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1639024471283-03518883512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXNhbXxlbnwwfHx8fDE3NzczNTA0MTJ8MA&ixlib=rb-4.1.0&q=80&w=300"
                    alt="Rasam"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-2">
                    <span className="text-white text-sm font-medium">Rasam</span>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c95930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1dHRhcGFtfGVufDB8fHx8MTc3NzM1MDQ0MHww&ixlib=rb-4.1.0&q=80&w=300"
                    alt="Uttapam"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-2">
                    <span className="text-white text-sm font-medium">Uttapam</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <span>Login</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white border-2 border-green-500 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all"
              >
                <span>Sign Up</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: '50K+', label: 'Active Users' },
              { number: '500+', label: 'Recipes' },
              { number: '4.8★', label: 'Rating' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-gray-400 rounded-full mt-2"
            animate={{ opacity: [1, 0, 1], y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};
