import { useState } from 'react';
import { Search, ArrowRight, DollarSign, Flame, Apple, TrendingDown, Sparkles, Heart } from 'lucide-react';

interface SwapSuggestion {
  name: string;
  emoji: string;
  cost: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  benefits: string[];
  cookTime: string;
}

export function FoodSwapsPage() {
  const [junkFood, setJunkFood] = useState('');
  const [budget, setBudget] = useState('');
  const [swapResults, setSwapResults] = useState<{
    input: string;
    swaps: SwapSuggestion[];
  } | null>(null);

  // Database of junk food and their healthy swaps
  const swapDatabase: Record<string, SwapSuggestion[]> = {
    burger: [
      {
        name: 'Roti + Egg Curry',
        emoji: '🍳',
        cost: 35,
        calories: 420,
        protein: 22,
        carbs: 45,
        fats: 15,
        benefits: ['High protein', 'Balanced nutrition', '₹85 cheaper', 'Home-made healthy'],
        cookTime: '25 min',
      },
      {
        name: 'Vegetable Upma + Egg',
        emoji: '🥘',
        cost: 30,
        calories: 320,
        protein: 15,
        carbs: 42,
        fats: 10,
        benefits: ['Light & filling', 'Good fiber', '₹90 cheaper', 'Quick to make'],
        cookTime: '20 min',
      },
      {
        name: 'Paneer Sandwich (Home-made)',
        emoji: '🥪',
        cost: 40,
        calories: 380,
        protein: 18,
        carbs: 38,
        fats: 16,
        benefits: ['High protein', 'Calcium rich', '₹80 cheaper', 'Tasty alternative'],
        cookTime: '15 min',
      },
    ],
    pizza: [
      {
        name: 'Veggie Roti Wrap',
        emoji: '🌯',
        cost: 30,
        calories: 280,
        protein: 10,
        carbs: 42,
        fats: 8,
        benefits: ['Fresh vegetables', 'Low fat', '₹120 cheaper', 'Customizable'],
        cookTime: '15 min',
      },
      {
        name: 'Dal Khichdi with Vegetables',
        emoji: '🍚',
        cost: 35,
        calories: 320,
        protein: 14,
        carbs: 50,
        fats: 6,
        benefits: ['Complete meal', 'Easy to digest', '₹115 cheaper', 'Comfort food'],
        cookTime: '25 min',
      },
    ],
    fries: [
      {
        name: 'Roasted Peanuts',
        emoji: '🥜',
        cost: 15,
        calories: 170,
        protein: 7,
        carbs: 5,
        fats: 14,
        benefits: ['High protein', 'Healthy fats', '₹45 cheaper', 'Filling snack'],
        cookTime: '0 min',
      },
      {
        name: 'Boiled Chickpeas Chaat',
        emoji: '🥗',
        cost: 20,
        calories: 200,
        protein: 10,
        carbs: 30,
        fats: 3,
        benefits: ['High protein', 'High fiber', '₹40 cheaper', 'Tasty & tangy'],
        cookTime: '10 min',
      },
      {
        name: 'Air-fried Potato Wedges',
        emoji: '🥔',
        cost: 18,
        calories: 150,
        protein: 3,
        carbs: 30,
        fats: 2,
        benefits: ['Much less oil', 'Same satisfaction', '₹42 cheaper', 'Healthier version'],
        cookTime: '20 min',
      },
    ],
    'cold drink': [
      {
        name: 'Lemon Water',
        emoji: '🍋',
        cost: 5,
        calories: 10,
        protein: 0,
        carbs: 3,
        fats: 0,
        benefits: ['Vitamin C', 'Zero sugar', '₹35 cheaper', 'Refreshing'],
        cookTime: '2 min',
      },
      {
        name: 'Buttermilk',
        emoji: '🥛',
        cost: 12,
        calories: 40,
        protein: 3,
        carbs: 5,
        fats: 1,
        benefits: ['Probiotic', 'Good digestion', '₹28 cheaper', 'Cooling'],
        cookTime: '5 min',
      },
      {
        name: 'Fresh Fruit Juice',
        emoji: '🧃',
        cost: 20,
        calories: 110,
        protein: 1,
        carbs: 26,
        fats: 0,
        benefits: ['Real vitamins', 'Natural sugars', '₹20 cheaper', 'Fresh & healthy'],
        cookTime: '5 min',
      },
    ],
    chips: [
      {
        name: 'Roasted Makhana',
        emoji: '🍿',
        cost: 25,
        calories: 100,
        protein: 4,
        carbs: 18,
        fats: 1,
        benefits: ['Low calorie', 'High protein', '₹15 cheaper', 'Crunchy'],
        cookTime: '10 min',
      },
      {
        name: 'Mixed Nuts',
        emoji: '🌰',
        cost: 30,
        calories: 180,
        protein: 6,
        carbs: 8,
        fats: 15,
        benefits: ['Healthy fats', 'High protein', '₹10 cheaper', 'Brain food'],
        cookTime: '0 min',
      },
    ],
    maggi: [
      {
        name: 'Vegetable Upma',
        emoji: '🥘',
        cost: 20,
        calories: 180,
        protein: 6,
        carbs: 32,
        fats: 3,
        benefits: ['Real vegetables', 'Low sodium', '₹10 cheaper', 'Nutritious'],
        cookTime: '15 min',
      },
      {
        name: 'Vegetable Poha',
        emoji: '🍚',
        cost: 18,
        calories: 150,
        protein: 4,
        carbs: 28,
        fats: 2,
        benefits: ['Light meal', 'Easy digestion', '₹12 cheaper', 'Quick to make'],
        cookTime: '12 min',
      },
    ],
    samosa: [
      {
        name: 'Boiled Corn Chaat',
        emoji: '🌽',
        cost: 15,
        calories: 120,
        protein: 4,
        carbs: 22,
        fats: 2,
        benefits: ['Low fat', 'High fiber', '₹15 cheaper', 'Filling snack'],
        cookTime: '10 min',
      },
      {
        name: 'Sprouts Chaat',
        emoji: '🌱',
        cost: 20,
        calories: 100,
        protein: 8,
        carbs: 15,
        fats: 1,
        benefits: ['Very high protein', 'Rich in vitamins', '₹10 cheaper', 'Superfood'],
        cookTime: '5 min',
      },
    ],
    donut: [
      {
        name: 'Banana with Peanut Butter',
        emoji: '🍌',
        cost: 15,
        calories: 200,
        protein: 6,
        carbs: 30,
        fats: 8,
        benefits: ['Natural sugars', 'Good protein', '₹35 cheaper', 'Energy boost'],
        cookTime: '2 min',
      },
      {
        name: 'Dates with Nuts',
        emoji: '🫐',
        cost: 25,
        calories: 150,
        protein: 3,
        carbs: 35,
        fats: 2,
        benefits: ['Natural sweetness', 'Iron rich', '₹25 cheaper', 'Healthy energy'],
        cookTime: '0 min',
      },
    ],
  };

  const findSwaps = () => {
    const searchKey = junkFood.toLowerCase().trim();
    const swaps = swapDatabase[searchKey];

    if (!swaps) {
      alert('Food not found! Try: burger, pizza, fries, chips, samosa, maggi, cold drink, donut');
      return;
    }

    // Filter by budget if specified
    let filteredSwaps = swaps;
    if (budget) {
      filteredSwaps = swaps.filter((swap) => swap.cost <= Number(budget));
    }

    setSwapResults({
      input: junkFood,
      swaps: filteredSwaps,
    });
  };

  const popularJunkFoods = ['Burger', 'Pizza', 'Fries', 'Cold Drink', 'Chips', 'Maggi'];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Smart Food Swaps</h1>
          <p className="text-gray-600">
            Replace junk food with healthy alternatives that match your budget and nutrition needs
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Sparkles className="w-7 h-7 mr-2" />
            Find Your Healthy Swap
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-2 text-purple-100">
                Junk Food Item
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={junkFood}
                  onChange={(e) => setJunkFood(e.target.value)}
                  placeholder="e.g., burger, pizza"
                  className="w-full pl-10 pr-4 py-3 border-0 rounded-lg text-gray-900 focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-purple-100">
                Max Budget (Optional)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g., 50"
                className="w-full px-4 py-3 border-0 rounded-lg text-gray-900 focus:ring-2 focus:ring-white"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={findSwaps}
                className="w-full py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-all font-semibold flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Find Swaps</span>
              </button>
            </div>
          </div>

          {/* Quick Options */}
          <div className="mt-6 pt-6 border-t border-purple-400">
            <p className="text-sm text-purple-100 mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {popularJunkFoods.map((food) => (
                <button
                  key={food}
                  onClick={() => setJunkFood(food)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all"
                >
                  {food}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {swapResults && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                Healthy Alternatives for <span className="text-purple-600 capitalize">{swapResults.input}</span>
              </h2>
              <p className="text-gray-600">{swapResults.swaps.length} healthy swaps found</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {swapResults.swaps.map((swap, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-6 text-white">
                    <div className="text-5xl mb-3">{swap.emoji}</div>
                    <h3 className="text-xl font-bold">{swap.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-semibold">₹{swap.cost}</span>
                      <span className="text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        {swap.cookTime}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Nutrition Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-orange-50 rounded-lg p-2 text-center">
                        <Flame className="w-4 h-4 mx-auto text-orange-500 mb-1" />
                        <div className="text-sm font-bold">{swap.calories}</div>
                        <div className="text-xs text-gray-600">cal</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2 text-center">
                        <Apple className="w-4 h-4 mx-auto text-blue-500 mb-1" />
                        <div className="text-sm font-bold">{swap.protein}g</div>
                        <div className="text-xs text-gray-600">protein</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2 text-center">
                        <TrendingDown className="w-4 h-4 mx-auto text-green-500 mb-1" />
                        <div className="text-sm font-bold">{swap.fats}g</div>
                        <div className="text-xs text-gray-600">fats</div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Why This Swap?</h4>
                      <ul className="space-y-1">
                        {swap.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start space-x-2 text-sm">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Benefits Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Make Healthy Swaps?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2">Save Money</div>
              <div className="text-green-100 text-sm">₹500-1000/month savings</div>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2">Better Health</div>
              <div className="text-green-100 text-sm">Reduce lifestyle diseases</div>
            </div>
            <div className="text-center">
              <Flame className="w-12 h-12 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2">More Energy</div>
              <div className="text-green-100 text-sm">Feel active all day</div>
            </div>
            <div className="text-center">
              <Apple className="w-12 h-12 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2">Better Nutrition</div>
              <div className="text-green-100 text-sm">Real vitamins & minerals</div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-4">🎯 Swap Strategy</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Start with 1-2 swaps per week</li>
              <li>• Gradually reduce junk food intake</li>
              <li>• Find swaps you actually enjoy</li>
              <li>• Prepare healthy snacks in advance</li>
              <li>• Track your savings and health improvements</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-4">💡 Pro Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Cook healthy versions of junk food at home</li>
              <li>• Keep healthy snacks ready when cravings hit</li>
              <li>• Remember: junk food is designed to be addictive</li>
              <li>• Focus on how good you feel after healthy eating</li>
              <li>• Treat yourself occasionally, but make it rare</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
