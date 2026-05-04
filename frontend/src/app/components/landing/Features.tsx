import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Heart, Leaf, TrendingUp, Zap } from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'Food Analyzer',
    description: 'Instantly analyze nutritional content of any food with AI-powered precision.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: RotateCcw,
    title: 'Food Swaps',
    description: 'Get intelligent recommendations for healthier food alternatives.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Heart,
    title: 'Health Guide',
    description: 'Personalized health insights based on your medical conditions.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Leaf,
    title: 'Recipe Finder',
    description: 'Discover recipes tailored to your preferences and nutritional goals.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor your nutrition journey with detailed analytics and insights.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Zap,
    title: 'Smart Recommendations',
    description: 'Get AI-powered suggestions optimized for your lifestyle and goals.',
    color: 'from-yellow-500 to-orange-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive nutrition tools designed to help you make smarter food choices
            and achieve your health goals.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                }}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-green-200 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 inline-flex w-8 h-8 rounded-full bg-gray-100 items-center justify-center group-hover:bg-green-100 group-hover:translate-x-2 transition-all duration-300">
                    <svg
                      className="w-4 h-4 text-gray-600 group-hover:text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
