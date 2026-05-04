import React from 'react';
import { motion } from 'framer-motion';
import { Search, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Describe Your Food',
    description:
      'Enter your meal details or search our comprehensive database. Get instant nutritional analysis based on your input.',
  },
  {
    number: 2,
    icon: Cpu,
    title: 'AI Analyzes Nutrition',
    description:
      'Advanced algorithms break down macros, micros, and health metrics. Get detailed nutritional insights in seconds.',
  },
  {
    number: 3,
    icon: CheckCircle2,
    title: 'Get Recommendations',
    description:
      'Receive personalized suggestions aligned with your health goals, allergies, and preferences.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to smarter nutrition decisions
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-300 to-transparent z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200">
                  {/* Step Number Circle */}
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6 mx-auto"
                    whileInView={{ scale: [0.5, 1.1, 1] }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  {/* Step Number Badge */}
                  <div className="flex justify-center mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                      Step {step.number}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-center text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow to next step */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:flex absolute -right-4 top-24 z-20"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: (index + 0.5) * 0.2,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-green-500 flex items-center justify-center shadow-md">
                      <ArrowRight className="w-4 h-4 text-green-500" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform your nutrition habits?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center space-x-2"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
