import { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Snowflake, TrendingDown, Heart, Zap, Shield, User } from 'lucide-react';

export function SeasonalFoodsPage() {
  const [selectedSeason, setSelectedSeason] = useState('summer');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get username from localStorage
    const userData = localStorage.getItem('nutriwise-user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name || 'Friend');
    }
  }, []);

  const seasons = [
    { id: 'summer', name: 'Summer', icon: Sun, color: 'from-orange-500 to-yellow-500', months: 'Mar-Jun' },
    { id: 'monsoon', name: 'Monsoon', icon: CloudRain, color: 'from-blue-500 to-cyan-500', months: 'Jul-Sep' },
    { id: 'winter', name: 'Winter', icon: Snowflake, color: 'from-blue-600 to-purple-600', months: 'Oct-Feb' },
  ];

  const seasonalFoods = {
    summer: {
      description: 'Stay hydrated and cool with water-rich, refreshing foods',
      foods: [
        {
          name: 'Watermelon',
          emoji: '🍉',
          image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcm1lbG9uJTIwc2xpY2UlMjBmcmVzaCUyMGZydWl0fGVufDF8fHx8MTc3NTQ4MDY5OHww&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['92% water content', 'Keeps you hydrated', 'Rich in vitamins A & C', 'Low calorie'],
          cost: '₹20-30/kg',
          nutrition: { calories: 30, protein: 0.6, carbs: 8 },
          savingPercent: 40,
        },
        {
          name: 'Cucumber',
          emoji: '🥒',
          image: 'https://images.unsplash.com/photo-1739355991757-d3e95c68ac5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGN1Y3VtYmVyJTIwc2xpY2VkJTIwdmVnZXRhYmxlfGVufDF8fHx8MTc3NTQ4MDY5OHww&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['95% water', 'Cooling effect', 'Good for skin', 'Very low calorie'],
          cost: '₹15-25/kg',
          nutrition: { calories: 15, protein: 0.7, carbs: 3.6 },
          savingPercent: 35,
        },
        {
          name: 'Mango',
          emoji: '🥭',
          image: 'https://images.unsplash.com/photo-1772984613890-e3bfbca7f245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyaXBlJTIwbWFuZ28lMjB0cm9waWNhbCUyMGZydWl0fGVufDF8fHx8MTc3NTQ4MDY5OHww&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Rich in Vitamin A', 'Boosts immunity', 'Good for eyes', 'Natural energy'],
          cost: '₹40-80/kg',
          nutrition: { calories: 60, protein: 0.8, carbs: 15 },
          savingPercent: 30,
        },
        {
          name: 'Papaya',
          emoji: '🍈',
          image: 'https://images.unsplash.com/photo-1763502872003-f340e2474e88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXBlJTIwcGFwYXlhJTIwdHJvcGljYWwlMjBmcnVpdHxlbnwxfHx8fDE3NzU0Nzk1MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Aids digestion', 'Rich in Vitamin C', 'Helps with weight loss', 'Good for skin'],
          cost: '₹20-40/kg',
          nutrition: { calories: 43, protein: 0.5, carbs: 11 },
          savingPercent: 45,
        },
        {
          name: 'Buttermilk',
          emoji: '🥛',
          image: 'https://images.unsplash.com/photo-1630409346699-79481a79db52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXJtaWxrJTIwaW5kaWFuJTIwZHJpbmt8ZW58MXx8fHwxNzc1MjE3MTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Probiotic rich', 'Aids digestion', 'Cooling', 'Low cost'],
          cost: '₹10-15/250ml',
          nutrition: { calories: 40, protein: 3, carbs: 5 },
          savingPercent: 50,
        },
        {
          name: 'Tender Coconut',
          emoji: '🥥',
          image: 'https://images.unsplash.com/photo-1743947063655-30e3b4e07db7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5kZXIlMjBjb2NvbnV0JTIwd2F0ZXJ8ZW58MXx8fHwxNzc1MjE3MTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Natural electrolytes', 'Hydrating', 'Refreshing', 'Energy boost'],
          cost: '₹30-40/piece',
          nutrition: { calories: 45, protein: 1.7, carbs: 9 },
          savingPercent: 25,
        },
        {
          name: 'Mint (Pudina)',
          emoji: '🌿',
          image: 'https://images.unsplash.com/photo-1648036933917-762235e009c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW50JTIwbGVhdmVzJTIwZnJlc2h8ZW58MXx8fHwxNzc1MjE3MTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Cooling effect', 'Aids digestion', 'Refreshing flavor', 'Very cheap'],
          cost: '₹5-10/bunch',
          nutrition: { calories: 44, protein: 3.3, carbs: 8 },
          savingPercent: 60,
        },
        {
          name: 'Beetroot',
          emoji: '🥗',
          image: 'https://images.unsplash.com/photo-1649597357231-4e721665af6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJlZXRyb290JTIwdmVnZXRhYmxlJTIwcmVkfGVufDF8fHx8MTc3NTQ3OTUxOHww&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Increases stamina', 'Rich in iron', 'Lowers blood pressure', 'Purifies blood'],
          cost: '₹30-40/kg',
          nutrition: { calories: 43, protein: 1.6, carbs: 10 },
          savingPercent: 35,
        },
        {
          name: 'Lemon',
          emoji: '🍋',
          image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbiUyMGNpdHJ1cyUyMGZyZXNofGVufDF8fHx8MTc3NTMxMTc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Vitamin C rich', 'Aids digestion', 'Boosts immunity', 'Refreshing'],
          cost: '₹10-20/dozen',
          nutrition: { calories: 29, protein: 1.1, carbs: 9 },
          savingPercent: 40,
        },
      ],
    },
    monsoon: {
      description: 'Boost immunity and stay healthy with these monsoon superfoods',
      foods: [
        {
          name: 'Ginger',
          emoji: '🫚',
          image: 'https://images.unsplash.com/photo-1774125364904-de15e430e8f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5nZXIlMjByb290JTIwZnJlc2h8ZW58MXx8fHwxNzc1MjA1NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Boosts immunity', 'Anti-inflammatory', 'Aids digestion', 'Prevents cold'],
          cost: '₹80-120/kg',
          nutrition: { calories: 80, protein: 1.8, carbs: 18 },
          savingPercent: 35,
        },
        {
          name: 'Turmeric',
          emoji: '🟡',
          image: 'https://images.unsplash.com/photo-1768729340925-2749ecdc211c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJtZXJpYyUyMHJvb3QlMjBzcGljZXxlbnwxfHx8fDE3NzUyMTcxNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Anti-bacterial', 'Boosts immunity', 'Anti-inflammatory', 'Healing properties'],
          cost: '₹200-300/kg',
          nutrition: { calories: 312, protein: 9.7, carbs: 67 },
          savingPercent: 40,
        },
        {
          name: 'Corn (Bhutta)',
          emoji: '🌽',
          image: 'https://images.unsplash.com/photo-1565679867504-657ff4bfdd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwY29iJTIwZnJlc2h8ZW58MXx8fHwxNzc1MjE3MTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Rich in fiber', 'Good antioxidants', 'Energy boost', 'Filling'],
          cost: '₹10-20/piece',
          nutrition: { calories: 86, protein: 3.2, carbs: 19 },
          savingPercent: 45,
        },
        {
          name: 'Bitter Gourd',
          emoji: '🥒',
          image: 'https://images.unsplash.com/photo-1766714534617-b3cffc7f9085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXR0ZXIlMjBnb3VyZCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NzUxMTEyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Boosts immunity', 'Purifies blood', 'Good for diabetics', 'Antibacterial'],
          cost: '₹30-50/kg',
          nutrition: { calories: 17, protein: 1, carbs: 3.7 },
          savingPercent: 30,
        },
        {
          name: 'Pomegranate',
          emoji: '🍎',
          image: 'https://images.unsplash.com/photo-1709605534654-c0ef47902b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb21lZ3JhbmF0ZSUyMGZydWl0JTIwZnJlc2h8ZW58MXx8fHwxNzc1MjE3MTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Rich in antioxidants', 'Boosts immunity', 'Iron rich', 'Heart health'],
          cost: '₹80-120/kg',
          nutrition: { calories: 83, protein: 1.7, carbs: 19 },
          savingPercent: 25,
        },
        {
          name: 'Hot Soup',
          emoji: '🍲',
          image: 'https://images.unsplash.com/photo-1701109876066-7fc0c08da447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBzb3VwJTIwYm93bHxlbnwxfHx8fDE3NzUxOTYxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Warming', 'Easy to digest', 'Immunity boost', 'Hydrating'],
          cost: '₹20-40/bowl',
          nutrition: { calories: 60, protein: 3, carbs: 8 },
          savingPercent: 50,
        },
      ],
    },
    winter: {
      description: 'Stay warm and energized with nutrient-dense winter foods',
      foods: [
        {
          name: 'Groundnuts',
          emoji: '🥜',
          image: 'https://images.unsplash.com/photo-1766997246116-d008d5354465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFudXRzJTIwZ3JvdW5kbnV0cyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzc1MjE3MTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['High protein', 'Keeps warm', 'Energy rich', 'Very affordable'],
          cost: '₹100-150/kg',
          nutrition: { calories: 567, protein: 26, carbs: 16 },
          savingPercent: 45,
        },
        {
          name: 'Jaggery (Gur)',
          emoji: '🟫',
          image: 'https://images.unsplash.com/photo-1706524077192-fbff369d4e0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMHN1Z2FyJTIwbmF0dXJhbCUyMHN3ZWV0ZW5lcnxlbnwxfHx8fDE3NzU0ODA3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Iron rich', 'Keeps warm', 'Natural sweetener', 'Boosts immunity'],
          cost: '₹40-60/kg',
          nutrition: { calories: 383, protein: 0.4, carbs: 98 },
          savingPercent: 40,
        },
        {
          name: 'Carrots',
          emoji: '🥕',
          image: 'https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyb3QlMjB2ZWdldGFibGUlMjBmcmVzaHxlbnwxfHx8fDE3NzUyMTcxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Vitamin A rich', 'Good for eyes', 'Improves immunity', 'Cheap in winter'],
          cost: '₹20-30/kg',
          nutrition: { calories: 41, protein: 0.9, carbs: 10 },
          savingPercent: 50,
        },
        {
          name: 'Green Peas',
          emoji: '🫛',
          image: 'https://images.unsplash.com/photo-1619186682542-fbbcf67b55b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGdyZWVuJTIwcGVhcyUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzc1NDgwNjk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['High protein', 'Rich in vitamins', 'Fiber rich', 'Filling'],
          cost: '₹40-60/kg',
          nutrition: { calories: 81, protein: 5, carbs: 14 },
          savingPercent: 35,
        },
        {
          name: 'Oranges',
          emoji: '🍊',
          image: 'https://images.unsplash.com/photo-1615147438600-2ef96072abd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBmcnVpdCUyMGNpdHJ1c3xlbnwxfHx8fDE3NzUyMTcxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Vitamin C rich', 'Boosts immunity', 'Prevents cold', 'Hydrating'],
          cost: '₹40-80/kg',
          nutrition: { calories: 47, protein: 0.9, carbs: 12 },
          savingPercent: 30,
        },
        {
          name: 'Dates',
          emoji: '🫐',
          image: 'https://images.unsplash.com/photo-1774857247287-d68599847107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlcyUyMGZydWl0JTIwZHJpZWQlMjBoZWFsdGh5fGVufDF8fHx8MTc3NTQ4MDY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
          benefits: ['Energy boost', 'Iron rich', 'Keeps warm', 'Natural sweetness'],
          cost: '₹200-400/kg',
          nutrition: { calories: 282, protein: 2.5, carbs: 75 },
          savingPercent: 20,
        },
      ],
    },
  };

  const currentSeason = seasonalFoods[selectedSeason as keyof typeof seasonalFoods];
  const currentSeasonInfo = seasons.find((s) => s.id === selectedSeason)!;
  const Icon = currentSeasonInfo.icon;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Username */}
        <div className="mb-8">
          {userName && (
            <div className="mb-4 flex items-center space-x-2 text-lg">
              <span className="text-gray-600">Heyyy!!</span>
              <span className="font-bold text-green-600 text-xl">{userName}</span>
              <span className="text-gray-600">👋 Check out what's fresh this season</span>
            </div>
          )}
          <h1 className="text-4xl font-bold mb-2">Seasonal Food Suggestions</h1>
          <p className="text-gray-600">
            Save money and eat fresh with seasonal foods available at lower prices
          </p>
        </div>

        {/* Season Selector */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {seasons.map((season) => {
            const SeasonIcon = season.icon;
            return (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season.id)}
                className={`p-6 rounded-2xl transition-all border-2 ${
                  selectedSeason === season.id
                    ? `bg-gradient-to-br ${season.color} text-white border-transparent shadow-xl`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <SeasonIcon className={`w-12 h-12 mb-3 ${selectedSeason === season.id ? 'text-white' : 'text-gray-600'}`} />
                <h3 className="text-2xl font-bold mb-1">{season.name}</h3>
                <p className={`text-sm ${selectedSeason === season.id ? 'text-white/80' : 'text-gray-600'}`}>
                  {season.months}
                </p>
              </button>
            );
          })}
        </div>

        {/* Season Banner */}
        <div className={`bg-gradient-to-r ${currentSeasonInfo.color} rounded-2xl p-8 text-white mb-8 shadow-xl`}>
          <div className="flex items-start space-x-4">
            <Icon className="w-16 h-16 opacity-90" />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{currentSeasonInfo.name} Foods</h2>
              <p className="text-lg opacity-90">{currentSeason.description}</p>
              <div className="mt-4 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-5 h-5" />
                  <span>Save 20-60% on seasonal items</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Fresher & more nutritious</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Food Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSeason.foods.map((food) => (
            <div
              key={food.name}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
            >
              {/* Food Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{food.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/90">{food.cost}</span>
                    <div className={`bg-gradient-to-r ${currentSeasonInfo.color} px-3 py-1 rounded-full text-sm font-semibold text-white shadow-lg`}>
                      Save {food.savingPercent}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Nutrition Info */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-orange-50 rounded-lg p-2">
                    <div className="text-lg font-bold text-orange-600">{food.nutrition.calories}</div>
                    <div className="text-xs text-gray-600">Calories</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <div className="text-lg font-bold text-blue-600">{food.nutrition.protein}g</div>
                    <div className="text-xs text-gray-600">Protein</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2">
                    <div className="text-lg font-bold text-green-600">{food.nutrition.carbs}g</div>
                    <div className="text-xs text-gray-600">Carbs</div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-green-600" />
                    Benefits
                  </h4>
                  <ul className="space-y-1">
                    {food.benefits.map((benefit, i) => (
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

        {/* Cost Savings Calculator */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Monthly Savings with Seasonal Foods</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Zap className="w-10 h-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">₹400-600</div>
              <div className="text-green-100">Average Monthly Savings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <TrendingDown className="w-10 h-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">30-50%</div>
              <div className="text-green-100">Cost Reduction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Heart className="w-10 h-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-green-100">Fresher & Healthier</div>
            </div>
          </div>
          <p className="text-center mt-6 text-green-100">
            By choosing seasonal foods, you get better nutrition at lower prices while supporting local farmers
          </p>
        </div>

        {/* Shopping Tips */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-4">💡 Shopping Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Visit local vegetable markets for best seasonal prices</li>
              <li>• Buy in bulk when prices are lowest</li>
              <li>• Ask vendors about what's in season this week</li>
              <li>• Stock up on items that can be stored (groundnuts, jaggery)</li>
              <li>• Seasonal = fresher, tastier, and cheaper!</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-4">🎯 Why Seasonal?</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Lower prices due to abundant supply</li>
              <li>• Better taste and nutrition</li>
              <li>• Environmentally friendly (less transport)</li>
              <li>• Supports local farmers</li>
              <li>• Naturally suited to weather conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}