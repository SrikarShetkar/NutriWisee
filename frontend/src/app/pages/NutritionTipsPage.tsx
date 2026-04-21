import { useState } from 'react';
import {
  Apple,
  Droplet,
  Flame,
  Leaf,
  ShoppingCart,
  Clock,
  DollarSign,
  ChefHat,
  Heart,
  Brain,
  Zap,
  Shield,
} from 'lucide-react';

export function NutritionTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tips', icon: Leaf },
    { id: 'nutrition', name: 'Nutrition Basics', icon: Apple },
    { id: 'budget', name: 'Budget Tips', icon: DollarSign },
    { id: 'cooking', name: 'Cooking Hacks', icon: ChefHat },
    { id: 'health', name: 'Health Benefits', icon: Heart },
  ];

  const tips = [
    {
      id: 1,
      category: 'nutrition',
      title: 'Importance of Protein',
      icon: Apple,
      color: 'from-red-500 to-orange-500',
      content:
        'Protein is essential for muscle growth, repair, and maintaining a healthy immune system. Students need about 0.8-1g per kg of body weight daily.',
      keyPoints: [
        'Helps build and repair tissues',
        'Keeps you feeling full longer',
        'Supports immune function',
        'Essential for muscle maintenance',
      ],
      affordableSources: ['Eggs', 'Dal (Lentils)', 'Chickpeas', 'Peanuts', 'Milk', 'Soya chunks'],
    },
    {
      id: 2,
      category: 'nutrition',
      title: 'Balanced Diet Basics',
      icon: Leaf,
      color: 'from-green-500 to-emerald-500',
      content:
        'A balanced diet includes carbohydrates, proteins, fats, vitamins, and minerals in the right proportions for optimal health and energy.',
      keyPoints: [
        '50-60% of calories from carbs',
        '15-20% from proteins',
        '20-30% from healthy fats',
        'Include fruits and vegetables daily',
      ],
      affordableSources: ['Rice', 'Wheat', 'Seasonal vegetables', 'Dal', 'Eggs', 'Cooking oil'],
    },
    {
      id: 3,
      category: 'budget',
      title: 'Budget Grocery Planning',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-500',
      content:
        'Smart grocery shopping can reduce food expenses by 30-40%. Plan your purchases and buy in bulk when possible.',
      keyPoints: [
        'Make a weekly meal plan first',
        'Buy seasonal vegetables (cheaper)',
        'Purchase staples in bulk',
        'Avoid impulse buying',
      ],
      affordableSources: ['Local markets', 'Wholesale stores', 'Weekly bazaars', 'Monthly grocery'],
    },
    {
      id: 4,
      category: 'nutrition',
      title: 'Stay Hydrated',
      icon: Droplet,
      color: 'from-cyan-500 to-blue-500',
      content:
        'Water is essential for all body functions. Aim for 8-10 glasses daily. Dehydration can affect concentration and energy levels.',
      keyPoints: [
        'Drink water regularly throughout the day',
        'Carry a water bottle to classes',
        'Drink more during exercise',
        'Water is free and the healthiest drink',
      ],
      affordableSources: ['Tap water (filtered)', 'Boiled water', 'Infused water with lemon'],
    },
    {
      id: 5,
      category: 'cooking',
      title: 'Quick Meal Prep Hacks',
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
      content:
        'Prepare ingredients in advance to save time during busy weekdays. Meal prep can save you hours each week.',
      keyPoints: [
        'Cook rice/dal in bulk, refrigerate',
        'Chop vegetables for the week',
        'Boil eggs in advance',
        'Pre-portion snacks',
      ],
      affordableSources: ['Storage containers', 'Refrigerator use', 'Pressure cooker'],
    },
    {
      id: 6,
      category: 'cooking',
      title: 'One-Pot Meals for Students',
      icon: ChefHat,
      color: 'from-orange-500 to-amber-500',
      content:
        'One-pot meals are quick, easy, and require minimal cleanup. Perfect for hostel students with limited cooking equipment.',
      keyPoints: [
        'Khichdi: Rice + Dal + Vegetables',
        'Pulao: Rice + Vegetables',
        'Upma: Semolina + Vegetables',
        'All can be made in one pot',
      ],
      affordableSources: ['Pressure cooker', 'Hot plate', 'Electric cooker'],
    },
    {
      id: 7,
      category: 'health',
      title: 'Benefits of Home Cooking',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      content:
        'Home-cooked meals are healthier, cheaper, and give you control over ingredients. You can save 50-70% compared to eating out.',
      keyPoints: [
        'Know exactly what you\'re eating',
        'Control portion sizes',
        'Reduce sodium and unhealthy fats',
        'Save significant money',
      ],
      affordableSources: ['Basic kitchen setup', 'Simple recipes', 'Fresh ingredients'],
    },
    {
      id: 8,
      category: 'budget',
      title: 'Cheap Protein Sources',
      icon: DollarSign,
      color: 'from-green-500 to-teal-500',
      content:
        'Protein doesn\'t have to be expensive. These budget-friendly options provide excellent nutrition without breaking the bank.',
      keyPoints: [
        'Eggs: ₹5-6 per egg, 6g protein',
        'Dal: ₹120-150/kg, high protein',
        'Peanuts: ₹100-120/kg',
        'Soya chunks: Very cheap, 50g protein/100g',
      ],
      affordableSources: ['Local markets', 'Wholesale stores', 'Monthly purchase'],
    },
    {
      id: 9,
      category: 'health',
      title: 'Avoid Junk Food Addiction',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      content:
        'Junk food is designed to be addictive with high sugar, salt, and fat. Breaking the habit can improve health and save money.',
      keyPoints: [
        'Start by reducing, not eliminating',
        'Replace with healthier alternatives',
        'Track your junk food spending',
        'Focus on how you feel after eating healthy',
      ],
      affordableSources: ['Healthy snacks', 'Home-made alternatives', 'Fruit instead of chips'],
    },
    {
      id: 10,
      category: 'nutrition',
      title: 'Importance of Breakfast',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      content:
        'Never skip breakfast! It kickstarts your metabolism and improves concentration. A good breakfast costs ₹15-30 but boosts your entire day.',
      keyPoints: [
        'Improves focus and memory',
        'Provides energy for morning classes',
        'Prevents overeating later',
        'Boosts metabolism',
      ],
      affordableSources: ['Banana + milk', 'Upma', 'Poha', 'Bread + egg', 'Oats'],
    },
    {
      id: 11,
      category: 'budget',
      title: 'Seasonal Eating Saves Money',
      icon: Leaf,
      color: 'from-green-500 to-lime-500',
      content:
        'Seasonal fruits and vegetables are 30-50% cheaper and more nutritious. They\'re fresh, flavorful, and budget-friendly.',
      keyPoints: [
        'Summer: Mango, Watermelon, Cucumber',
        'Monsoon: Leafy greens, Corn',
        'Winter: Carrots, Peas, Oranges',
        'Always cheaper than off-season produce',
      ],
      affordableSources: ['Local vegetable markets', 'Direct from farmers', 'Weekly bazaars'],
    },
    {
      id: 12,
      category: 'health',
      title: 'Brain Food for Students',
      icon: Brain,
      color: 'from-indigo-500 to-purple-500',
      content:
        'Certain foods boost brain function, memory, and concentration. Essential during exams and study sessions.',
      keyPoints: [
        'Eggs: Choline for memory',
        'Walnuts: Omega-3 for brain health',
        'Bananas: Quick energy',
        'Dark chocolate: Focus (in moderation)',
      ],
      affordableSources: ['Eggs', 'Peanuts (alternative to walnuts)', 'Bananas', 'Almonds'],
    },
  ];

  const filteredTips =
    selectedCategory === 'all'
      ? tips
      : tips.filter((tip) => tip.category === selectedCategory);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Nutrition Tips & Education</h1>
          <p className="text-gray-600">
            Learn about healthy eating, budget planning, and cooking basics
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className={`bg-gradient-to-br ${tip.color} p-6 text-white`}>
                  <Icon className="w-10 h-10 mb-3 opacity-90" />
                  <h3 className="text-2xl font-bold">{tip.title}</h3>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-gray-700">{tip.content}</p>

                  <div>
                    <h4 className="font-semibold mb-2">Key Points:</h4>
                    <ul className="space-y-2">
                      {tip.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start space-x-2 text-sm">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-semibold mb-2 text-sm">Affordable Options:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tip.affordableSources.map((source, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Reference Card */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Quick Reference Guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Daily Budget Meals</h3>
              <ul className="space-y-2 text-green-50">
                <li>• ₹20-30: Upma, Poha</li>
                <li>• ₹40-50: Dal Rice combo</li>
                <li>• ₹30-40: Egg-based meals</li>
                <li>• ₹10-20: Healthy snacks</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Kitchen Essentials</h3>
              <ul className="space-y-2 text-green-50">
                <li>• Pressure cooker</li>
                <li>• Basic spices</li>
                <li>• Oil and ghee</li>
                <li>• Salt, turmeric</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Shopping Tips</h3>
              <ul className="space-y-2 text-green-50">
                <li>• Buy in bulk monthly</li>
                <li>• Choose seasonal items</li>
                <li>• Compare prices</li>
                <li>• Plan before shopping</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-4">📚 Did You Know?</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                • Students who eat healthy breakfast score 20% better in exams
              </p>
              <p>
                • Home cooking can save you ₹15,000-20,000 per year
              </p>
              <p>
                • Drinking water before meals can help with portion control
              </p>
              <p>
                • Dal provides more protein per rupee than most other foods
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-4">🎯 Student Success Tips</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                • Meal prep on Sundays saves time during the week
              </p>
              <p>
                • Keep healthy snacks ready to avoid junk food temptation
              </p>
              <p>
                • Share cooking with roommates to reduce costs
              </p>
              <p>
                • Track your food spending for better budget management
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
