import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const benefits = [
  'Personalized meal recommendations',
  'AI-powered food analysis',
  'Health goal tracking',
  'Access to 500+ recipes',
  'Allergy & condition filtering',
  'Weekly progress reports',
];

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Ready to Transform Your <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Nutrition</span>?
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              Join thousands of students and professionals already using NutriWise to make smarter food choices and achieve their health goals.
            </p>

            {/* Benefits List */}
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
              }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <span>Start Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            className="relative h-96 hidden md:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated Gradient Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-200 via-emerald-100 to-cyan-100 rounded-3xl"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
            />

            {/* Floating Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute w-48 h-48 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full filter blur-3xl opacity-30"
                animate={{
                  x: [0, 50, -50, 0],
                  y: [0, 50, 0, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="relative z-10 text-center text-white"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <div className="text-6xl font-bold mb-4">92%</div>
                <p className="text-xl font-semibold">Users See Results</p>
                <p className="text-sm opacity-90">In the First Month</p>
              </motion.div>
            </div>

            {/* Floating Icons */}
            {[
              { emoji: '🥗', delay: 0 },
              { emoji: '📊', delay: 1 },
              { emoji: '❤️', delay: 2 },
              { emoji: '⚡', delay: 3 },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="absolute text-3xl"
                animate={{
                  x: [0, Math.cos((index / 4) * Math.PI * 2) * 80],
                  y: [0, Math.sin((index / 4) * Math.PI * 2) * 80],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: item.delay,
                }}
              >
                {item.emoji}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
