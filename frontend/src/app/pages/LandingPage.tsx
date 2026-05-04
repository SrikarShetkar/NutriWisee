import { Link } from 'react-router';
import { ArrowRight, DollarSign, Target, ChefHat, BookOpen, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function LandingPage() {
  const features = [
    {
      icon: DollarSign,
      title: 'Budget-Friendly',
      description: 'Plan meals within your student budget without compromising nutrition',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Target,
      title: 'Nutrition Focused',
      description: 'Get balanced meals tailored to your nutritional requirements',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: ChefHat,
      title: 'Simple Recipes',
      description: 'Learn to cook with easy step-by-step recipes for students',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: BookOpen,
      title: 'Nutrition Education',
      description: 'Understand the importance of healthy eating with helpful tips',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const stats = [
    { label: 'Average Daily Savings', value: '₹45', icon: TrendingUp },
    { label: 'Healthy Recipes', value: '100+', icon: ChefHat },
    { label: 'Students Helped', value: '5K+', icon: Shield },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm mb-6">
                🎓 Built for Students
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Eat <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Healthy</span>,
                <br />
                Save <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Money</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Smart meal planning designed for college students. Get nutritious meals within your budget, with simple recipes you can actually cook.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all group"
                >
                  Login
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-green-500 text-green-600 rounded-xl hover:bg-green-50 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Beautiful Food Images Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1734989175071-fedc119fb52e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGdyZWVuJTIwdmVnZXRhYmxlcyUyMHNhbGFkJTIwYm93lMjB0b3BwaW5nc3xlbnwxfHx8fDE3NzU0MTkxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Fresh green vegetable salad bowl"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <div className="text-2xl font-bold">₹35</div>
                        <div className="text-sm">Green Power Bowl</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1562013841-09400a6bb126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBldGl6aW5nJTIwZ3JlZW4lMjBzbW9vdGhpZSUyMGJvd2wlMjB0b3BwaW5nc3xlbnwxfHx8fDE3NzU0MTkxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Green smoothie bowl with toppings"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <div className="text-lg font-bold">Energizing Breakfast</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1675092789086-4bd2b93ffc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJ1ZGRoYSUyMGJvd2wlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc3NTQxOTE1OXww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Colorful Buddha bowl with vegetables"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <div className="text-lg font-bold">Buddha Bowl</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-2xl text-white">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-2xl font-bold mb-1">₹100/day</div>
                    <div className="text-sm text-green-100">Complete nutrition within budget</div>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Breakfast</span>
                        <span className="font-semibold">₹20</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lunch</span>
                        <span className="font-semibold">₹40</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dinner</span>
                        <span className="font-semibold">₹30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Snacks</span>
                        <span className="font-semibold">₹10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-green-100">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose NutriWise?</h2>
            <p className="text-xl text-gray-600">Everything you need to eat healthy on a student budget</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delicious Dishes Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Delicious & Nutritious
              </span> Meals
            </h2>
            <p className="text-xl text-gray-600">
              Fresh, colorful, and budget-friendly dishes that make healthy eating exciting
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dish 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1604634077134-6f774f610f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGF2b2NhZG8lMjB0b2FzdCUyMGJyZWFrZmFzdCUyMGhlYWx0aHl8ZW58MXx8fHwxNzc1NDE5MTU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Avocado toast breakfast"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1">Avocado Toast</h3>
                <p className="text-sm text-green-200 mb-2">Rich in healthy fats & fiber</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹45</span>
                  <span className="bg-green-500 px-3 py-1 rounded-full text-xs">Breakfast</span>
                </div>
              </div>
            </motion.div>

            {/* Dish 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1695605302505-32372d93493f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjB2ZWdldGFyaWFuJTIwbWVhbCUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTQxOTE1OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Colorful vegetarian meal"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1">Veggie Platter</h3>
                <p className="text-sm text-green-200 mb-2">Packed with vitamins & minerals</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹55</span>
                  <span className="bg-orange-500 px-3 py-1 rounded-full text-xs">Lunch</span>
                </div>
              </div>
            </motion.div>

            {/* Dish 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1623428187425-873f16e10554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBxdWlub2ElMjBib3dsJTIwdmVnZXRhYmxlcyUyMHByb3RlaW58ZW58MXx8fHwxNzc1NDE5MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Quinoa bowl with vegetables"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1">Quinoa Power Bowl</h3>
                <p className="text-sm text-green-200 mb-2">High protein & complete amino acids</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹60</span>
                  <span className="bg-purple-500 px-3 py-1 rounded-full text-xs">Dinner</span>
                </div>
              </div>
            </motion.div>

            {/* Dish 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1758721217610-a5d729a319e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwZ3JlZW4lMjBsZWFmeSUyMHNhbGFkJTIwYXBwZXRpemluZ3xlbnwxfHx8fDE3NzU0MTkxNjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Leafy green salad"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1">Fresh Garden Salad</h3>
                <p className="text-sm text-green-200 mb-2">Low calorie & nutrient dense</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹30</span>
                  <span className="bg-emerald-500 px-3 py-1 rounded-full text-xs">Side Dish</span>
                </div>
              </div>
            </motion.div>

            {/* Dish 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1770351927282-41f6c54f1ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGdyZWVuJTIwYnJvY2NvbGklMjB2ZWdldGFibGVzJTIwY2xvc2V1cHxlbnwxfHx8fDE3NzU0MTkxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fresh broccoli vegetables"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1">Steamed Broccoli</h3>
                <p className="text-sm text-green-200 mb-2">Vitamin C & antioxidant rich</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹25</span>
                  <span className="bg-green-600 px-3 py-1 rounded-full text-xs">Snack</span>
                </div>
              </div>
            </motion.div>

            {/* Dish 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1761315413700-94180544376e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNwcmluZyUyMHJvbGxzJTIwdmVnZXRhYmxlcyUyMGhlYWx0aHl8ZW58MXx8fHwxNzc1NDE5MTYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fresh spring rolls"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1">Fresh Spring Rolls</h3>
                <p className="text-sm text-green-200 mb-2">Light, refreshing & colorful</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹40</span>
                  <span className="bg-blue-500 px-3 py-1 rounded-full text-xs">Appetizer</span>
                </div>
              </div>
            </motion.div>

            {/* Dish 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1734770931927-6410f9a64832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBpbmRpYW4lMjBkYWwlMjBjdXJyeSUyMHJpY2V8ZW58MXx8fHwxNzc1NDE5MTYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Indian dal curry with rice"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1">Dal & Rice Combo</h3>
                <p className="text-sm text-green-200 mb-2">Complete protein & iron rich</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹50</span>
                  <span className="bg-yellow-500 px-3 py-1 rounded-full text-xs">Lunch</span>
                </div>
              </div>
            </motion.div>

            {/* Dish 8 - Special Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white flex flex-col justify-center items-center p-8"
            >
              <div className="text-6xl mb-4">🥗</div>
              <h3 className="text-2xl font-bold mb-2 text-center">500+ More Recipes</h3>
              <p className="text-green-100 text-center mb-4">
                Discover endless healthy meal options
              </p>
              <Link
                to="/recipes"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all"
              >
                Explore All
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Set Your Budget',
                description: 'Tell us your daily or monthly food budget',
                emoji: '💰',
              },
              {
                step: '02',
                title: 'Get Your Plan',
                description: 'Receive personalized meal plans within your budget',
                emoji: '📋',
              },
              {
                step: '03',
                title: 'Start Cooking',
                description: 'Follow simple recipes and eat healthy',
                emoji: '👨‍🍳',
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-6xl mb-4">{step.emoji}</div>
                  <div className="text-green-500 font-bold text-sm mb-2">STEP {step.step}</div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-300"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 text-white shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Healthy Journey?</h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of students who are eating healthier and saving money
            </p>
            <Link
              to="/profile"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-all text-lg font-semibold"
            >
              Create Your Profile
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}