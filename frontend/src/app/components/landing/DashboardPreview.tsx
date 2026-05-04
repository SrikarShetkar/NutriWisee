import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Zap, Apple } from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
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
            Your Personal Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Beautiful, intuitive interface designed for daily nutrition tracking
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Outer Container */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-1 shadow-2xl">
            {/* Inner White Container */}
            <div className="bg-white rounded-3xl overflow-hidden">
              {/* Browser Bar */}
              <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              {/* Dashboard Content */}
              <div className="p-8 sm:p-12">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome Back, Sarah
                  </h3>
                  <p className="text-gray-600">Today's nutrition summary</p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  {[
                    {
                      icon: Apple,
                      label: 'Calories',
                      value: '1,850 / 2,000',
                      color: 'from-red-500 to-pink-500',
                    },
                    {
                      icon: Zap,
                      label: 'Protein',
                      value: '78g / 100g',
                      color: 'from-blue-500 to-cyan-500',
                    },
                    {
                      icon: BarChart3,
                      label: 'Carbs',
                      value: '245g / 300g',
                      color: 'from-orange-500 to-amber-500',
                    },
                    {
                      icon: TrendingUp,
                      label: 'Health Score',
                      value: '92/100',
                      color: 'from-green-500 to-emerald-600',
                    },
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                        }}
                        viewport={{ once: true }}
                        className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium opacity-90">
                            {stat.label}
                          </span>
                          <Icon className="w-5 h-5 opacity-75" />
                        </div>
                        <p className="text-lg font-bold">{stat.value}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Meal Log */}
                <motion.div
                  className="bg-gray-50 rounded-xl p-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                  }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-900 mb-4">Today's Meals</h4>
                  <div className="space-y-3">
                    {[
                      {
                        meal: 'Breakfast',
                        items: 'Oats + Banana + Almond Milk',
                        cals: '280 cal',
                      },
                      {
                        meal: 'Lunch',
                        items: 'Grilled Chicken + Brown Rice + Broccoli',
                        cals: '620 cal',
                      },
                      {
                        meal: 'Snack',
                        items: 'Greek Yogurt + Berries',
                        cals: '150 cal',
                      },
                      {
                        meal: 'Dinner',
                        items: 'Salmon + Sweet Potato + Vegetables',
                        cals: '580 cal',
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + index * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.meal}
                          </p>
                          <p className="text-sm text-gray-500">{item.items}</p>
                        </div>
                        <p className="font-semibold text-green-600">
                          {item.cals}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Floating Decorative Elements */}
          <motion.div
            className="absolute -top-6 -right-6 w-24 h-24 bg-green-100 rounded-full filter blur-2xl opacity-50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-100 rounded-full filter blur-2xl opacity-50"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
};
