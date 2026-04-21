import { useState } from 'react';
import { Search, Calculator, Apple, Flame, Droplet, Zap, Leaf } from 'lucide-react';

interface NutritionData {
  food: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  sugar: number;
  fiber: number;
}

export function FoodAnalyzerPage() {
  const [foodInput, setFoodInput] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('g');
  const [result, setResult] = useState<NutritionData | null>(null);
  const [history, setHistory] = useState<NutritionData[]>([]);

  // Comprehensive food database (per 100g/100ml)
  const foodDatabase: Record<string, any> = {
    // Proteins
    'egg': { calories: 155, protein: 13, carbs: 1.1, fats: 11, sugar: 1.1, fiber: 0, unit: 'piece', perUnit: 50 },
    'chicken': { calories: 165, protein: 31, carbs: 0, fats: 3.6, sugar: 0, fiber: 0 },
    'dal': { calories: 116, protein: 9, carbs: 20, fats: 0.4, sugar: 2, fiber: 8 },
    'paneer': { calories: 265, protein: 18, carbs: 1.2, fats: 20, sugar: 1.2, fiber: 0 },
    'chickpeas': { calories: 164, protein: 8.9, carbs: 27, fats: 2.6, sugar: 5, fiber: 7.6 },
    'peanuts': { calories: 567, protein: 26, carbs: 16, fats: 49, sugar: 4, fiber: 8.5 },
    'milk': { calories: 42, protein: 3.4, carbs: 5, fats: 1, sugar: 5, fiber: 0 },
    'curd': { calories: 60, protein: 3.5, carbs: 4.7, fats: 3.3, sugar: 4.7, fiber: 0 },
    'soya chunks': { calories: 345, protein: 52, carbs: 33, fats: 0.5, sugar: 18, fiber: 13 },

    // Grains & Carbs
    'rice': { calories: 130, protein: 2.7, carbs: 28, fats: 0.3, sugar: 0.1, fiber: 0.4 },
    'roti': { calories: 297, protein: 11, carbs: 51, fats: 4, sugar: 2, fiber: 7, unit: 'piece', perUnit: 40 },
    'bread': { calories: 265, protein: 9, carbs: 49, fats: 3.2, sugar: 5, fiber: 2.7, unit: 'slice', perUnit: 30 },
    'oats': { calories: 389, protein: 17, carbs: 66, fats: 7, sugar: 1, fiber: 11 },
    'poha': { calories: 110, protein: 2, carbs: 23, fats: 0.2, sugar: 0.5, fiber: 2 },
    'upma': { calories: 85, protein: 2, carbs: 16, fats: 1.5, sugar: 1, fiber: 2 },

    // Vegetables
    'potato': { calories: 77, protein: 2, carbs: 17, fats: 0.1, sugar: 0.8, fiber: 2.2 },
    'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, sugar: 0.4, fiber: 2.2 },
    'tomato': { calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, sugar: 2.6, fiber: 1.2 },
    'carrot': { calories: 41, protein: 0.9, carbs: 10, fats: 0.2, sugar: 4.7, fiber: 2.8 },
    'brinjal': { calories: 25, protein: 1, carbs: 6, fats: 0.2, sugar: 3.5, fiber: 3 },
    'cauliflower': { calories: 25, protein: 1.9, carbs: 5, fats: 0.3, sugar: 1.9, fiber: 2 },

    // Fruits
    'banana': { calories: 89, protein: 1.1, carbs: 23, fats: 0.3, sugar: 12, fiber: 2.6, unit: 'piece', perUnit: 120 },
    'apple': { calories: 52, protein: 0.3, carbs: 14, fats: 0.2, sugar: 10, fiber: 2.4, unit: 'piece', perUnit: 180 },
    'mango': { calories: 60, protein: 0.8, carbs: 15, fats: 0.4, sugar: 14, fiber: 1.6 },
    'orange': { calories: 47, protein: 0.9, carbs: 12, fats: 0.1, sugar: 9, fiber: 2.4 },
    'watermelon': { calories: 30, protein: 0.6, carbs: 8, fats: 0.2, sugar: 6, fiber: 0.4 },

    // Junk Food
    'burger': { calories: 295, protein: 17, carbs: 24, fats: 14, sugar: 6, fiber: 1, unit: 'piece', perUnit: 220 },
    'pizza': { calories: 266, protein: 11, carbs: 33, fats: 10, sugar: 3.6, fiber: 2.5, unit: 'slice', perUnit: 107 },
    'fries': { calories: 312, protein: 3.4, carbs: 41, fats: 15, sugar: 0.2, fiber: 3.8 },
    'samosa': { calories: 262, protein: 4, carbs: 25, fats: 17, sugar: 1, fiber: 2, unit: 'piece', perUnit: 60 },
    'pakora': { calories: 280, protein: 5, carbs: 30, fats: 16, sugar: 2, fiber: 3 },
    'chips': { calories: 536, protein: 6.6, carbs: 53, fats: 34, sugar: 0.4, fiber: 4.2 },
    'maggi': { calories: 205, protein: 4.6, carbs: 27, fats: 8.8, sugar: 1.2, fiber: 1.8, unit: 'packet', perUnit: 70 },
  };

  const analyzFood = () => {
    const foodName = foodInput.toLowerCase().trim();
    const foodData = foodDatabase[foodName];

    if (!foodData) {
      alert('Food not found in database. Try: egg, rice, dal, banana, etc.');
      return;
    }

    let actualQuantity = Number(quantity);
    let multiplier = 1;

    // Handle different units
    if (foodData.unit && unit === foodData.unit) {
      // Using piece/slice/packet
      multiplier = (foodData.perUnit / 100) * actualQuantity;
    } else if (unit === 'g') {
      multiplier = actualQuantity / 100;
    } else if (unit === 'kg') {
      multiplier = (actualQuantity * 1000) / 100;
    } else if (unit === 'ml') {
      multiplier = actualQuantity / 100;
    } else if (unit === 'cup') {
      multiplier = (actualQuantity * 240) / 100; // 1 cup ≈ 240ml/g
    } else if (unit === 'plate') {
      multiplier = (actualQuantity * 200) / 100; // 1 plate ≈ 200g
    }

    const nutritionResult: NutritionData = {
      food: foodInput,
      quantity: actualQuantity,
      unit: unit,
      calories: Math.round(foodData.calories * multiplier),
      protein: Math.round(foodData.protein * multiplier * 10) / 10,
      carbs: Math.round(foodData.carbs * multiplier * 10) / 10,
      fats: Math.round(foodData.fats * multiplier * 10) / 10,
      sugar: Math.round(foodData.sugar * multiplier * 10) / 10,
      fiber: Math.round(foodData.fiber * multiplier * 10) / 10,
    };

    setResult(nutritionResult);
    setHistory([nutritionResult, ...history].slice(0, 5));
  };

  const quickFoods = [
    '2 eggs',
    '1 plate rice',
    '1 roti',
    '1 banana',
    '100g dal',
    '1 cup milk',
  ];

  const parseQuickFood = (quick: string) => {
    const parts = quick.split(' ');
    const qty = parts[0];
    const food = parts.slice(1).join(' ');
    const unitMatch = quick.match(/(plate|cup|piece|g|kg)/);

    setFoodInput(food);
    setQuantity(qty);
    setUnit(unitMatch ? unitMatch[0] : 'piece');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Food Nutrition Analyzer</h1>
          <p className="text-gray-600">
            Enter any food item and quantity to get detailed nutritional information
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Item
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={foodInput}
                  onChange={(e) => setFoodInput(e.target.value)}
                  placeholder="e.g., egg, rice, banana"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g., 2, 100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="g">Grams (g)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="piece">Piece</option>
                <option value="plate">Plate</option>
                <option value="cup">Cup</option>
                <option value="ml">Milliliters (ml)</option>
                <option value="slice">Slice</option>
              </select>
            </div>
          </div>

          <button
            onClick={analyzFood}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>Analyze Nutrition</span>
          </button>

          {/* Quick Options */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3">Quick analyze:</p>
            <div className="flex flex-wrap gap-2">
              {quickFoods.map((quick) => (
                <button
                  key={quick}
                  onClick={() => parseQuickFood(quick)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition-all text-sm"
                >
                  {quick}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold capitalize">{result.food}</h2>
                <p className="text-green-100">
                  {result.quantity} {result.unit}
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold">{result.calories}</div>
                <div className="text-green-100">Calories</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Apple className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <div className="text-2xl font-bold">{result.protein}g</div>
                <div className="text-sm text-green-100">Protein</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Flame className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <div className="text-2xl font-bold">{result.carbs}g</div>
                <div className="text-sm text-green-100">Carbs</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Droplet className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <div className="text-2xl font-bold">{result.fats}g</div>
                <div className="text-sm text-green-100">Fats</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <div className="text-2xl font-bold">{result.sugar}g</div>
                <div className="text-sm text-green-100">Sugar</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Leaf className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <div className="text-2xl font-bold">{result.fiber}g</div>
                <div className="text-sm text-green-100">Fiber</div>
              </div>
            </div>
          </div>
        )}

        {/* Recent History */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Recent Analyses</h3>
            <div className="space-y-3">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-semibold capitalize">{item.food}</div>
                    <div className="text-sm text-gray-600">
                      {item.quantity} {item.unit}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {item.calories}
                    </div>
                    <div className="text-xs text-gray-500">calories</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    P: {item.protein}g | C: {item.carbs}g | F: {item.fats}g
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Foods */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold mb-4">Available Foods in Database</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Object.keys(foodDatabase).sort().map((food) => (
              <button
                key={food}
                onClick={() => {
                  setFoodInput(food);
                  setQuantity('100');
                  setUnit('g');
                }}
                className="px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all text-sm capitalize"
              >
                {food}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
