import { useState } from 'react';
import { DollarSign, Flame, Apple, TrendingDown, AlertCircle, Check, X, Search, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ComparisonPage() {
  const [selectedComparison, setSelectedComparison] = useState(0);
  const [customFoodInput, setCustomFoodInput] = useState('');
  const [showCustomComparison, setShowCustomComparison] = useState(false);

  const comparisons = [
    {
      id: 0,
      title: 'Lunch Comparison',
      junkFood: {
        name: 'Burger + Fries + Coke',
        emoji: '🍔',
        cost: 180,
        calories: 850,
        protein: 15,
        carbs: 95,
        fats: 45,
        sodium: 1200,
        pros: ['Quick to order', 'Tastes good'],
        cons: ['High in unhealthy fats', 'Low protein', 'High sodium', 'Low nutrition'],
      },
      healthyFood: {
        name: 'Rice + Dal + Vegetable Curry',
        emoji: '🍛',
        cost: 60,
        calories: 450,
        protein: 18,
        carbs: 70,
        fats: 10,
        sodium: 400,
        pros: ['Balanced nutrition', 'High protein', 'Budget-friendly', 'Rich in fiber'],
        cons: ['Takes time to cook', 'Requires preparation'],
      },
    },
    {
      id: 1,
      title: 'Breakfast Comparison',
      junkFood: {
        name: 'Donuts + Coffee',
        emoji: '🍩',
        cost: 120,
        calories: 500,
        protein: 5,
        carbs: 65,
        fats: 25,
        sodium: 350,
        pros: ['Sweet taste', 'Convenient'],
        cons: ['High sugar', 'Low protein', 'Not filling', 'Energy crash later'],
      },
      healthyFood: {
        name: 'Vegetable Upma + Banana',
        emoji: '🥘',
        cost: 25,
        calories: 280,
        protein: 8,
        carbs: 50,
        fats: 8,
        sodium: 200,
        pros: ['Nutritious', 'Very affordable', 'Keeps you full', 'Good fiber'],
        cons: ['Needs cooking', 'Less exciting flavor'],
      },
    },
    {
      id: 2,
      title: 'Snack Comparison',
      junkFood: {
        name: 'Chips + Cold Drink',
        emoji: '🍟',
        cost: 80,
        calories: 400,
        protein: 2,
        carbs: 55,
        fats: 20,
        sodium: 800,
        pros: ['Crunchy', 'Satisfying'],
        cons: ['No nutrition', 'High sodium', 'Empty calories', 'Expensive for value'],
      },
      healthyFood: {
        name: 'Peanuts + Banana',
        emoji: '🥜',
        cost: 20,
        calories: 250,
        protein: 10,
        carbs: 30,
        fats: 12,
        sodium: 100,
        pros: ['High protein', 'Very cheap', 'Natural nutrients', 'Keeps hunger at bay'],
        cons: ['Less exciting', 'Plain taste'],
      },
    },
    {
      id: 3,
      title: 'Dinner Comparison',
      junkFood: {
        name: 'Pizza (2 slices)',
        emoji: '🍕',
        cost: 150,
        calories: 600,
        protein: 20,
        carbs: 70,
        fats: 25,
        sodium: 1100,
        pros: ['Delicious', 'Easy to order'],
        cons: ['Expensive', 'High sodium', 'Processed cheese', 'Not very filling'],
      },
      healthyFood: {
        name: 'Roti + Egg Curry + Salad',
        emoji: '🍳',
        cost: 40,
        calories: 420,
        protein: 22,
        carbs: 45,
        fats: 15,
        sodium: 350,
        pros: ['Complete meal', 'High protein', 'Budget-friendly', 'Balanced nutrition'],
        cons: ['Cooking required', 'Takes 30 minutes'],
      },
    },
  ];

  // Custom food database for user input comparisons
  const customFoodDatabase: Record<string, any> = {
    'burger': { emoji: '🍔', cost: 120, calories: 550, protein: 17, carbs: 45, fats: 28, sodium: 950 },
    'pizza': { emoji: '🍕', cost: 150, calories: 266, protein: 11, carbs: 33, fats: 10, sodium: 640 },
    'maggi': { emoji: '🍜', cost: 30, calories: 205, protein: 4.6, carbs: 27, fats: 8.8, sodium: 1200 },
    'biryani': { emoji: '🍛', cost: 100, calories: 450, protein: 12, carbs: 65, fats: 15, sodium: 800 },
    'samosa': { emoji: '🥟', cost: 20, calories: 262, protein: 4, carbs: 25, fats: 17, sodium: 450 },
    'pakora': { emoji: '🍤', cost: 25, calories: 280, protein: 5, carbs: 30, fats: 16, sodium: 500 },
    'french fries': { emoji: '🍟', cost: 60, calories: 312, protein: 3.4, carbs: 41, fats: 15, sodium: 210 },
    'pasta': { emoji: '🍝', cost: 80, calories: 320, protein: 10, carbs: 55, fats: 8, sodium: 600 },
  };

  const healthyAlternatives: Record<string, any> = {
    'burger': { name: 'Roti + Egg Curry', emoji: '🍳', cost: 35, calories: 420, protein: 22, carbs: 45, fats: 15, sodium: 350 },
    'pizza': { name: 'Veggie Roti Wrap', emoji: '🌯', cost: 30, calories: 280, protein: 10, carbs: 42, fats: 8, sodium: 300 },
    'maggi': { name: 'Vegetable Upma', emoji: '🥘', cost: 20, calories: 180, protein: 6, carbs: 32, fats: 3, sodium: 250 },
    'biryani': { name: 'Dal Khichdi', emoji: '🍚', cost: 35, calories: 320, protein: 14, carbs: 50, fats: 6, sodium: 400 },
    'samosa': { name: 'Sprouts Chaat', emoji: '🌱', cost: 20, calories: 100, protein: 8, carbs: 15, fats: 1, sodium: 200 },
    'pakora': { name: 'Roasted Makhana', emoji: '🍿', cost: 25, calories: 100, protein: 4, carbs: 18, fats: 1, sodium: 100 },
    'french fries': { name: 'Boiled Chickpeas', emoji: '🥗', cost: 20, calories: 164, protein: 8.9, carbs: 27, fats: 2.6, sodium: 200 },
    'pasta': { name: 'Whole Wheat Pasta with Veggies', emoji: '🍝', cost: 40, calories: 250, protein: 10, carbs: 45, fats: 4, sodium: 300 },
  };

  const handleCustomComparison = () => {
    const foodKey = customFoodInput.toLowerCase().trim();
    if (customFoodDatabase[foodKey]) {
      setShowCustomComparison(true);
    } else {
      alert('Food not found! Try: burger, pizza, maggi, biryani, samosa, pakora, french fries, pasta');
    }
  };

  const current = showCustomComparison && customFoodInput
    ? {
        junkFood: {
          name: customFoodInput,
          ...customFoodDatabase[customFoodInput.toLowerCase()],
          pros: ['Convenient', 'Tasty'],
          cons: ['High sodium', 'Processed', 'Expensive', 'Low nutrition'],
        },
        healthyFood: {
          ...healthyAlternatives[customFoodInput.toLowerCase()],
          pros: ['Nutritious', 'Budget-friendly', 'Home-made', 'Healthier'],
          cons: ['Requires cooking', 'Takes time'],
        },
      }
    : comparisons[selectedComparison];

  const chartData = [
    {
      name: 'Cost',
      Junk: current.junkFood.cost,
      Healthy: current.healthyFood.cost,
    },
    {
      name: 'Calories',
      Junk: current.junkFood.calories,
      Healthy: current.healthyFood.calories,
    },
    {
      name: 'Protein',
      Junk: current.junkFood.protein,
      Healthy: current.healthyFood.protein,
    },
  ];

  const savings = current.junkFood.cost - current.healthyFood.cost;
  const monthlySavings = savings * 30;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Healthy vs Junk Food</h1>
          <p className="text-gray-600">
            See how healthy choices can save you money and improve your health
          </p>
        </div>

        {/* Custom Food Input */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Plus className="w-6 h-6 mr-2" />
            Compare Your Own Food
          </h2>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={customFoodInput}
                onChange={(e) => setCustomFoodInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCustomComparison()}
                placeholder="Enter food name (e.g., burger, pizza, maggi)"
                className="w-full pl-10 pr-4 py-3 border-0 rounded-lg text-gray-900 focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              onClick={handleCustomComparison}
              className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-all font-semibold"
            >
              Compare
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Burger', 'Pizza', 'Maggi', 'Biryani', 'Samosa', 'French Fries'].map((food) => (
              <button
                key={food}
                onClick={() => {
                  setCustomFoodInput(food);
                  setShowCustomComparison(false);
                }}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all text-sm"
              >
                {food}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Selector */}
        {!showCustomComparison && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Or Select a Pre-made Comparison</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {comparisons.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => {
                    setSelectedComparison(comp.id);
                    setShowCustomComparison(false);
                  }}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    selectedComparison === comp.id && !showCustomComparison
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="font-semibold">{comp.title}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Back button for custom comparison */}
        {showCustomComparison && (
          <div className="mb-6">
            <button
              onClick={() => setShowCustomComparison(false)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <span>←</span>
              <span>Back to pre-made comparisons</span>
            </button>
          </div>
        )}

        {/* Savings Alert */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white mb-8 shadow-lg">
          <div className="flex items-start space-x-4">
            <TrendingDown className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">Your Potential Savings</h3>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="text-3xl font-bold">₹{savings}</div>
                  <div className="text-green-100">Per Meal</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">₹{monthlySavings}</div>
                  <div className="text-green-100">Per Month</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">₹{yearlySavings.toLocaleString()}</div>
                  <div className="text-green-100">Per Year</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Junk Food Card */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-red-200 overflow-hidden">
            <div className="bg-gradient-to-br from-red-400 to-orange-500 p-6 text-white">
              <div className="text-xs uppercase tracking-wide font-semibold mb-2 opacity-90">
                Junk Food Option
              </div>
              <div className="text-6xl mb-3">{current.junkFood.emoji}</div>
              <h3 className="text-2xl font-bold">{current.junkFood.name}</h3>
            </div>

            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <DollarSign className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-gray-600">Cost</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">₹{current.junkFood.cost}</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Flame className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-gray-600">Calories</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">{current.junkFood.calories}</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Apple className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-gray-600">Protein</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">{current.junkFood.protein}g</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-gray-600">Sodium</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">{current.junkFood.sodium}mg</div>
                </div>
              </div>

              {/* Nutrition Details */}
              <div>
                <h4 className="font-semibold mb-2">Nutrition Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Carbohydrates</span>
                    <span className="font-semibold">{current.junkFood.carbs}g</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fats</span>
                    <span className="font-semibold">{current.junkFood.fats}g</span>
                  </div>
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2 text-green-700">Pros</h4>
                  <div className="space-y-1">
                    {current.junkFood.pros.map((pro, i) => (
                      <div key={i} className="flex items-start space-x-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-700">Cons</h4>
                  <div className="space-y-1">
                    {current.junkFood.cons.map((con, i) => (
                      <div key={i} className="flex items-start space-x-2 text-sm">
                        <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Healthy Food Card */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 overflow-hidden">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-6 text-white">
              <div className="text-xs uppercase tracking-wide font-semibold mb-2 opacity-90">
                Healthy Option
              </div>
              <div className="text-6xl mb-3">{current.healthyFood.emoji}</div>
              <h3 className="text-2xl font-bold">{current.healthyFood.name}</h3>
            </div>

            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Cost</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">₹{current.healthyFood.cost}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Flame className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Calories</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{current.healthyFood.calories}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Apple className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Protein</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{current.healthyFood.protein}g</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Sodium</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{current.healthyFood.sodium}mg</div>
                </div>
              </div>

              {/* Nutrition Details */}
              <div>
                <h4 className="font-semibold mb-2">Nutrition Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Carbohydrates</span>
                    <span className="font-semibold">{current.healthyFood.carbs}g</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fats</span>
                    <span className="font-semibold">{current.healthyFood.fats}g</span>
                  </div>
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2 text-green-700">Pros</h4>
                  <div className="space-y-1">
                    {current.healthyFood.pros.map((pro, i) => (
                      <div key={i} className="flex items-start space-x-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-700">Cons</h4>
                  <div className="space-y-1">
                    {current.healthyFood.cons.map((con, i) => (
                      <div key={i} className="flex items-start space-x-2 text-sm">
                        <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Visual Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar key="bar-junk" dataKey="Junk" fill="#ef4444" radius={[8, 8, 0, 0]} />
              <Bar key="bar-healthy" dataKey="Healthy" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-3">Make the Smart Choice!</h2>
          <p className="text-xl text-green-100 mb-6">
            Choosing healthy options can save you ₹{yearlySavings.toLocaleString()} per year while improving your health
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard"
              className="px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-all font-semibold"
            >
              View Your Meal Plan
            </a>
            <a
              href="/recipes"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-green-600 transition-all font-semibold"
            >
              Find Healthy Recipes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}