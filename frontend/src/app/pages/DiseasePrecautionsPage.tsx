import { useState } from 'react';
import { AlertCircle, Heart, CheckCircle, XCircle, Info, Shield, Droplet, Activity, Sparkles, Flower2, HeartPulse, Waves } from 'lucide-react';

export function DiseasePrecautionsPage() {
  const [selectedDisease, setSelectedDisease] = useState('diabetes');

  const diseasesInfo = {
    diabetes: {
      name: 'Diabetes',
      icon: Droplet,
      color: 'from-red-500 to-orange-500',
      description: 'Managing blood sugar levels through diet is crucial for diabetes control',
      foodsToAvoid: [
        {
          name: 'White Rice',
          reason: 'High glycemic index, spikes blood sugar rapidly',
          alternative: 'Brown rice or quinoa in small portions',
        },
        {
          name: 'Refined Sugar',
          reason: 'Direct blood sugar spike',
          alternative: 'Natural sweeteners like stevia, or fruits in moderation',
        },
        {
          name: 'White Bread',
          reason: 'High carbs, low fiber',
          alternative: 'Whole wheat bread or multigrain roti',
        },
        {
          name: 'Fruit Juices',
          reason: 'Concentrated sugars without fiber',
          alternative: 'Whole fruits in limited quantities',
        },
        {
          name: 'Fried Foods',
          reason: 'High in trans fats, affects insulin sensitivity',
          alternative: 'Grilled, baked, or steamed foods',
        },
      ],
      foodsToInclude: [
        {
          name: 'Leafy Vegetables',
          benefit: 'Low carb, high fiber, stabilizes blood sugar',
          examples: 'Spinach, methi, cabbage',
        },
        {
          name: 'Whole Grains',
          benefit: 'Slow release carbs, better sugar control',
          examples: 'Brown rice, oats, whole wheat',
        },
        {
          name: 'Protein Rich Foods',
          benefit: 'Maintains satiety, stabilizes blood sugar',
          examples: 'Dal, eggs, lean chicken, paneer',
        },
        {
          name: 'Fiber Rich Foods',
          benefit: 'Slows sugar absorption',
          examples: 'Vegetables, lentils, whole grains',
        },
      ],
      keyPrecautions: [
        'Eat small, frequent meals (5-6 times a day)',
        'Never skip meals, especially breakfast',
        'Monitor portion sizes carefully',
        'Include protein in every meal',
        'Avoid late-night eating',
        'Stay hydrated with water',
      ],
    },
    hypertension: {
      name: 'High Blood Pressure (Hypertension)',
      icon: Activity,
      color: 'from-purple-500 to-pink-500',
      description: 'Controlling sodium intake and maintaining heart health through diet',
      foodsToAvoid: [
        {
          name: 'Table Salt',
          reason: 'High sodium increases blood pressure',
          alternative: 'Herbs and spices for flavor',
        },
        {
          name: 'Pickles & Papads',
          reason: 'Extremely high sodium content',
          alternative: 'Fresh vegetable salads',
        },
        {
          name: 'Processed Foods',
          reason: 'Hidden sodium and preservatives',
          alternative: 'Fresh, home-cooked meals',
        },
        {
          name: 'Fried Snacks',
          reason: 'Trans fats harm heart health',
          alternative: 'Roasted snacks like makhana',
        },
        {
          name: 'Red Meat',
          reason: 'High saturated fat',
          alternative: 'Lean proteins like fish, dal',
        },
      ],
      foodsToInclude: [
        {
          name: 'Bananas',
          benefit: 'Rich in potassium, lowers blood pressure',
          examples: 'Fresh bananas, banana smoothie',
        },
        {
          name: 'Leafy Greens',
          benefit: 'Potassium and magnesium help lower BP',
          examples: 'Spinach, kale, amaranth',
        },
        {
          name: 'Oats',
          benefit: 'Soluble fiber supports heart health',
          examples: 'Oatmeal, overnight oats',
        },
        {
          name: 'Low-fat Dairy',
          benefit: 'Calcium and potassium for BP control',
          examples: 'Low-fat milk, curd',
        },
      ],
      keyPrecautions: [
        'Limit salt to less than 5g per day',
        'Avoid adding salt at the table',
        'Read labels for hidden sodium',
        'Use lemon, herbs for flavor instead of salt',
        'Reduce oil intake',
        'Avoid caffeinated drinks',
      ],
    },
    thyroid: {
      name: 'Thyroid Disorders',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      description: 'Supporting thyroid function through proper nutrition',
      foodsToAvoid: [
        {
          name: 'Excess Soy Products',
          reason: 'Can interfere with thyroid hormone absorption',
          alternative: 'Moderate amounts only',
        },
        {
          name: 'Cruciferous Vegetables (Raw)',
          reason: 'Goitrogens can affect thyroid (when raw)',
          alternative: 'Cook cabbage, cauliflower, broccoli well',
        },
        {
          name: 'Processed Foods',
          reason: 'High in sodium and preservatives',
          alternative: 'Fresh, whole foods',
        },
        {
          name: 'Excessive Gluten',
          reason: 'May trigger autoimmune response in some',
          alternative: 'Monitor your body\'s response',
        },
      ],
      foodsToInclude: [
        {
          name: 'Iodine Rich Foods',
          benefit: 'Essential for thyroid hormone production',
          examples: 'Iodized salt (in moderation), fish',
        },
        {
          name: 'Selenium Rich Foods',
          benefit: 'Supports thyroid function',
          examples: 'Eggs, mushrooms, sunflower seeds',
        },
        {
          name: 'Zinc Rich Foods',
          benefit: 'Helps thyroid hormone production',
          examples: 'Chickpeas, pumpkin seeds, cashews',
        },
        {
          name: 'Protein',
          benefit: 'Supports metabolism',
          examples: 'Eggs, dal, lean meats',
        },
      ],
      keyPrecautions: [
        'Take thyroid medication on empty stomach',
        'Wait 30-60 minutes before eating',
        'Consistent meal timing helps',
        'Cook goitrogenic vegetables',
        'Don\'t skip meals',
        'Stay hydrated',
      ],
    },
    pcos: {
      name: 'PCOS (Polycystic Ovary Syndrome)',
      icon: Flower2,
      color: 'from-pink-500 to-rose-500',
      description: 'Managing insulin resistance and hormonal balance through diet',
      foodsToAvoid: [
        {
          name: 'Refined Carbs',
          reason: 'Worsens insulin resistance',
          alternative: 'Complex carbs like oats, brown rice',
        },
        {
          name: 'Sugary Foods',
          reason: 'Spikes insulin levels',
          alternative: 'Fresh fruits in moderation',
        },
        {
          name: 'Fried Foods',
          reason: 'Increases inflammation',
          alternative: 'Baked or grilled options',
        },
        {
          name: 'Full-fat Dairy',
          reason: 'May worsen hormonal imbalance',
          alternative: 'Low-fat dairy options',
        },
      ],
      foodsToInclude: [
        {
          name: 'High Fiber Foods',
          benefit: 'Improves insulin sensitivity',
          examples: 'Vegetables, lentils, whole grains',
        },
        {
          name: 'Anti-inflammatory Foods',
          benefit: 'Reduces inflammation',
          examples: 'Turmeric, ginger, berries',
        },
        {
          name: 'Lean Protein',
          benefit: 'Supports weight management',
          examples: 'Eggs, dal, chicken breast',
        },
        {
          name: 'Healthy Fats',
          benefit: 'Supports hormone production',
          examples: 'Nuts, seeds, olive oil',
        },
      ],
      keyPrecautions: [
        'Eat regular, balanced meals',
        'Don\'t skip breakfast',
        'Include protein in every meal',
        'Limit simple carbohydrates',
        'Stay physically active',
        'Manage stress through diet',
      ],
    },
    'heart disease': {
      name: 'Heart Disease',
      icon: HeartPulse,
      color: 'from-red-500 to-pink-500',
      description: 'Protecting heart health through cardiovascular-friendly nutrition',
      foodsToAvoid: [
        {
          name: 'Trans Fats',
          reason: 'Increases bad cholesterol',
          alternative: 'Healthy fats like olive oil',
        },
        {
          name: 'Saturated Fats',
          reason: 'Raises cholesterol levels',
          alternative: 'Lean proteins, plant-based fats',
        },
        {
          name: 'High Sodium Foods',
          reason: 'Increases blood pressure',
          alternative: 'Fresh herbs for flavoring',
        },
        {
          name: 'Red Meat',
          reason: 'High in saturated fat',
          alternative: 'Fish, chicken, legumes',
        },
      ],
      foodsToInclude: [
        {
          name: 'Omega-3 Rich Foods',
          benefit: 'Reduces inflammation, protects heart',
          examples: 'Fish, walnuts, flax seeds',
        },
        {
          name: 'Whole Grains',
          benefit: 'Lowers cholesterol',
          examples: 'Oats, brown rice, quinoa',
        },
        {
          name: 'Fruits & Vegetables',
          benefit: 'Antioxidants protect heart',
          examples: 'Berries, leafy greens, citrus fruits',
        },
        {
          name: 'Nuts',
          benefit: 'Healthy fats support heart health',
          examples: 'Almonds, walnuts, pistachios',
        },
      ],
      keyPrecautions: [
        'Limit sodium to 5g per day',
        'Choose lean proteins',
        'Eat fish twice a week',
        'Include fiber-rich foods',
        'Limit alcohol consumption',
        'Maintain healthy weight',
      ],
    },
    'kidney disease': {
      name: 'Kidney Disease',
      icon: Waves,
      color: 'from-green-500 to-teal-500',
      description: 'Supporting kidney function through controlled protein and mineral intake',
      foodsToAvoid: [
        {
          name: 'High Sodium Foods',
          reason: 'Puts strain on kidneys',
          alternative: 'Low-sodium fresh foods',
        },
        {
          name: 'Excessive Protein',
          reason: 'Increases kidney workload',
          alternative: 'Moderate protein as per doctor\'s advice',
        },
        {
          name: 'High Potassium Foods',
          reason: 'Can accumulate in blood',
          alternative: 'Low potassium vegetables',
        },
        {
          name: 'Processed Foods',
          reason: 'High in phosphorus and sodium',
          alternative: 'Fresh, home-cooked meals',
        },
      ],
      foodsToInclude: [
        {
          name: 'Low Potassium Fruits',
          benefit: 'Safe for kidney function',
          examples: 'Apples, grapes, berries',
        },
        {
          name: 'Low Potassium Vegetables',
          benefit: 'Provides nutrition without strain',
          examples: 'Cabbage, cauliflower, onions',
        },
        {
          name: 'Moderate Protein',
          benefit: 'Maintains health without overload',
          examples: 'Egg whites, small portions of dal',
        },
        {
          name: 'Low Phosphorus Foods',
          benefit: 'Reduces mineral buildup',
          examples: 'Rice, pasta, green beans',
        },
      ],
      keyPrecautions: [
        'Follow protein restrictions as advised',
        'Monitor potassium intake',
        'Limit phosphorus-rich foods',
        'Control fluid intake if advised',
        'Avoid high-sodium foods',
        'Regular medical monitoring essential',
      ],
    },
  };

  const diseases = Object.keys(diseasesInfo);
  const currentInfo = diseasesInfo[selectedDisease as keyof typeof diseasesInfo];
  const CurrentIcon = currentInfo.icon;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Disease-Based Food Precautions</h1>
          <p className="text-gray-600">
            Dietary guidelines for managing common health conditions
          </p>
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> This information is for educational purposes only and not medical advice.
              Always consult your healthcare provider for personalized dietary recommendations.
            </p>
          </div>
        </div>

        {/* Disease Selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {diseases.map((disease) => {
            const info = diseasesInfo[disease as keyof typeof diseasesInfo];
            const IconComponent = info.icon;
            return (
              <button
                key={disease}
                onClick={() => setSelectedDisease(disease)}
                className={`p-4 rounded-xl transition-all border-2 ${
                  selectedDisease === disease
                    ? `bg-gradient-to-br ${info.color} text-white border-transparent shadow-lg`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-8 h-8 mb-2 mx-auto" />
                <div className={`text-sm font-semibold ${selectedDisease === disease ? 'text-white' : 'text-gray-700'}`}>
                  {info.name.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Disease Info Banner */}
        <div className={`bg-gradient-to-r ${currentInfo.color} rounded-2xl p-8 text-white mb-8 shadow-xl`}>
          <div className="flex items-start space-x-4">
            <CurrentIcon className="w-16 h-16" />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{currentInfo.name}</h2>
              <p className="text-lg opacity-90">{currentInfo.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Foods to Avoid */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold">Foods to Avoid</h3>
            </div>

            <div className="space-y-4">
              {currentInfo.foodsToAvoid.map((food, index) => (
                <div
                  key={index}
                  className="bg-red-50 border border-red-200 rounded-xl p-4"
                >
                  <div className="font-semibold text-red-900 mb-2">{food.name}</div>
                  <div className="text-sm text-red-700 mb-2">
                    <strong>Why:</strong> {food.reason}
                  </div>
                  <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-2">
                    <strong>Alternative:</strong> {food.alternative}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Foods to Include */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold">Foods to Include</h3>
            </div>

            <div className="space-y-4">
              {currentInfo.foodsToInclude.map((food, index) => (
                <div
                  key={index}
                  className="bg-green-50 border border-green-200 rounded-xl p-4"
                >
                  <div className="font-semibold text-green-900 mb-2">{food.name}</div>
                  <div className="text-sm text-green-700 mb-2">
                    <strong>Benefit:</strong> {food.benefit}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Examples:</strong> {food.examples}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Precautions */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-blue-900">Key Dietary Precautions</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {currentInfo.keyPrecautions.map((precaution, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-white rounded-lg p-4"
              >
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{precaution}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white text-center shadow-xl">
          <Heart className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Your Health Matters!</h3>
          <p className="text-lg opacity-90 mb-6">
            NutriWise can customize your meal plans based on your health conditions
          </p>
          <a
            href="/profile"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition-all font-semibold"
          >
            Update Your Health Profile
          </a>
        </div>
      </div>
    </div>
  );
}
