import { useState } from 'react';
import { Search, Sparkles, Apple, Fish, Carrot, Milk, Egg, Wheat, Citrus, Leaf } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface VitaminInfo {
  name: string;
  aliases: string[];
  category: string;
  description: string;
  benefits: string[];
  sources: {
    name: string;
    amount: string;
    category: string;
  }[];
  deficiencySymptoms: string[];
  recommendedDailyIntake: string;
  funFact: string;
}

const vitaminDatabase: VitaminInfo[] = [
  {
    name: 'Vitamin A',
    aliases: ['Retinol', 'Beta-carotene'],
    category: 'Fat-Soluble',
    description: 'Essential for vision, immune function, and skin health. Exists in two forms: preformed vitamin A (retinol) and provitamin A carotenoids.',
    benefits: ['Maintains healthy vision', 'Supports immune system', 'Promotes skin health', 'Aids in reproduction'],
    sources: [
      { name: 'Sweet Potato', amount: '1400 mcg per 1 cup', category: 'Vegetable' },
      { name: 'Carrots', amount: '1070 mcg per 1 cup', category: 'Vegetable' },
      { name: 'Spinach', amount: '940 mcg per 1 cup cooked', category: 'Vegetable' },
      { name: 'Kale', amount: '885 mcg per 1 cup cooked', category: 'Vegetable' },
      { name: 'Liver (Beef)', amount: '6500 mcg per 3 oz', category: 'Meat' },
      { name: 'Eggs', amount: '80 mcg per large egg', category: 'Dairy & Eggs' },
      { name: 'Mango', amount: '112 mcg per 1 cup', category: 'Fruit' },
      { name: 'Cantaloupe', amount: '270 mcg per 1 cup', category: 'Fruit' },
    ],
    deficiencySymptoms: ['Night blindness', 'Dry eyes', 'Dry skin', 'Increased infections'],
    recommendedDailyIntake: '700-900 mcg for adults',
    funFact: 'Carrots don\'t actually improve your vision unless you\'re deficient in Vitamin A!',
  },
  {
    name: 'Vitamin B1',
    aliases: ['Thiamine', 'Thiamin'],
    category: 'Water-Soluble',
    description: 'Helps convert nutrients into energy and is crucial for glucose metabolism.',
    benefits: ['Energy production', 'Supports nervous system', 'Muscle function', 'Heart health'],
    sources: [
      { name: 'Whole Grains', amount: '0.38 mg per 1 cup brown rice', category: 'Grains' },
      { name: 'Pork', amount: '0.8 mg per 3 oz', category: 'Meat' },
      { name: 'Sunflower Seeds', amount: '0.4 mg per 1 oz', category: 'Nuts & Seeds' },
      { name: 'Black Beans', amount: '0.4 mg per 1 cup', category: 'Legumes' },
      { name: 'Lentils', amount: '0.3 mg per 1 cup', category: 'Legumes' },
      { name: 'Fortified Breakfast Cereal', amount: '1.5 mg per serving', category: 'Grains' },
    ],
    deficiencySymptoms: ['Fatigue', 'Irritability', 'Muscle weakness', 'Memory problems'],
    recommendedDailyIntake: '1.1-1.2 mg for adults',
    funFact: 'White rice loses 80% of its thiamine during processing - choose brown rice!',
  },
  {
    name: 'Vitamin B2',
    aliases: ['Riboflavin'],
    category: 'Water-Soluble',
    description: 'Important for energy production, cellular function, and metabolism of fats.',
    benefits: ['Energy metabolism', 'Healthy skin', 'Eye health', 'Red blood cell production'],
    sources: [
      { name: 'Milk', amount: '0.45 mg per 1 cup', category: 'Dairy & Eggs' },
      { name: 'Yogurt', amount: '0.6 mg per 1 cup', category: 'Dairy & Eggs' },
      { name: 'Eggs', amount: '0.2 mg per large egg', category: 'Dairy & Eggs' },
      { name: 'Almonds', amount: '0.3 mg per 1 oz', category: 'Nuts & Seeds' },
      { name: 'Spinach', amount: '0.4 mg per 1 cup cooked', category: 'Vegetable' },
      { name: 'Mushrooms', amount: '0.3 mg per 1 cup', category: 'Vegetable' },
    ],
    deficiencySymptoms: ['Sore throat', 'Skin disorders', 'Anemia', 'Swollen tongue'],
    recommendedDailyIntake: '1.1-1.3 mg for adults',
    funFact: 'Riboflavin gives your urine a bright yellow color when you take supplements!',
  },
  {
    name: 'Vitamin B3',
    aliases: ['Niacin', 'Nicotinic acid'],
    category: 'Water-Soluble',
    description: 'Supports metabolism, DNA repair, and the production of stress and sex hormones.',
    benefits: ['Converts food to energy', 'Improves cholesterol', 'Supports brain function', 'DNA repair'],
    sources: [
      { name: 'Chicken Breast', amount: '14 mg per 3 oz', category: 'Meat' },
      { name: 'Tuna', amount: '22 mg per 3 oz', category: 'Seafood' },
      { name: 'Turkey', amount: '10 mg per 3 oz', category: 'Meat' },
      { name: 'Peanuts', amount: '4.2 mg per 1 oz', category: 'Nuts & Seeds' },
      { name: 'Avocado', amount: '3.5 mg per avocado', category: 'Fruit' },
      { name: 'Brown Rice', amount: '5.2 mg per 1 cup', category: 'Grains' },
    ],
    deficiencySymptoms: ['Digestive issues', 'Skin problems', 'Fatigue', 'Depression'],
    recommendedDailyIntake: '14-16 mg for adults',
    funFact: 'Niacin can cause a harmless "flush" - temporary redness and warmth of the skin.',
  },
  {
    name: 'Vitamin B5',
    aliases: ['Pantothenic acid'],
    category: 'Water-Soluble',
    description: 'Essential for making blood cells and converting food into energy.',
    benefits: ['Energy production', 'Hormone synthesis', 'Cholesterol metabolism', 'Wound healing'],
    sources: [
      { name: 'Avocado', amount: '2 mg per avocado', category: 'Fruit' },
      { name: 'Chicken', amount: '1.3 mg per 3 oz', category: 'Meat' },
      { name: 'Mushrooms (Shiitake)', amount: '5.2 mg per 1 cup', category: 'Vegetable' },
      { name: 'Sweet Potato', amount: '1.8 mg per 1 cup', category: 'Vegetable' },
      { name: 'Sunflower Seeds', amount: '2.4 mg per 1 oz', category: 'Nuts & Seeds' },
      { name: 'Salmon', amount: '1.6 mg per 3 oz', category: 'Seafood' },
    ],
    deficiencySymptoms: ['Fatigue', 'Numbness', 'Irritability', 'Insomnia'],
    recommendedDailyIntake: '5 mg for adults',
    funFact: 'B5 deficiency is extremely rare because it\'s found in almost all foods!',
  },
  {
    name: 'Vitamin B6',
    aliases: ['Pyridoxine'],
    category: 'Water-Soluble',
    description: 'Important for protein metabolism, cognitive development, and immune function.',
    benefits: ['Mood regulation', 'Brain development', 'Immune function', 'Hemoglobin production'],
    sources: [
      { name: 'Chickpeas', amount: '1.1 mg per 1 cup', category: 'Legumes' },
      { name: 'Banana', amount: '0.4 mg per medium banana', category: 'Fruit' },
      { name: 'Chicken Breast', amount: '0.5 mg per 3 oz', category: 'Meat' },
      { name: 'Salmon', amount: '0.6 mg per 3 oz', category: 'Seafood' },
      { name: 'Potatoes', amount: '0.4 mg per 1 cup', category: 'Vegetable' },
      { name: 'Spinach', amount: '0.4 mg per 1 cup cooked', category: 'Vegetable' },
    ],
    deficiencySymptoms: ['Anemia', 'Skin rashes', 'Depression', 'Confusion'],
    recommendedDailyIntake: '1.3-1.7 mg for adults',
    funFact: 'Bananas are a budget-friendly source of B6, perfect for college students!',
  },
  {
    name: 'Vitamin B7',
    aliases: ['Biotin', 'Vitamin H'],
    category: 'Water-Soluble',
    description: 'Supports healthy hair, skin, and nails while aiding in energy metabolism.',
    benefits: ['Hair growth', 'Skin health', 'Nail strength', 'Energy metabolism'],
    sources: [
      { name: 'Eggs (cooked)', amount: '10 mcg per large egg', category: 'Dairy & Eggs' },
      { name: 'Almonds', amount: '1.5 mcg per 1 oz', category: 'Nuts & Seeds' },
      { name: 'Sweet Potato', amount: '2.4 mcg per 1/2 cup', category: 'Vegetable' },
      { name: 'Salmon', amount: '5 mcg per 3 oz', category: 'Seafood' },
      { name: 'Sunflower Seeds', amount: '2.6 mcg per 1 oz', category: 'Nuts & Seeds' },
      { name: 'Avocado', amount: '2 mcg per 1/2 avocado', category: 'Fruit' },
    ],
    deficiencySymptoms: ['Hair loss', 'Brittle nails', 'Skin rash', 'Depression'],
    recommendedDailyIntake: '30 mcg for adults',
    funFact: 'Raw egg whites contain avidin that blocks biotin - always cook your eggs!',
  },
  {
    name: 'Vitamin B9',
    aliases: ['Folate', 'Folic acid'],
    category: 'Water-Soluble',
    description: 'Crucial for cell division, DNA synthesis, and preventing birth defects.',
    benefits: ['DNA synthesis', 'Cell division', 'Prevents birth defects', 'Red blood cell formation'],
    sources: [
      { name: 'Lentils', amount: '358 mcg per 1 cup', category: 'Legumes' },
      { name: 'Spinach', amount: '263 mcg per 1 cup cooked', category: 'Vegetable' },
      { name: 'Asparagus', amount: '268 mcg per 1 cup', category: 'Vegetable' },
      { name: 'Broccoli', amount: '168 mcg per 1 cup cooked', category: 'Vegetable' },
      { name: 'Avocado', amount: '120 mcg per avocado', category: 'Fruit' },
      { name: 'Fortified Cereals', amount: '400 mcg per serving', category: 'Grains' },
    ],
    deficiencySymptoms: ['Anemia', 'Fatigue', 'Mouth sores', 'Poor growth'],
    recommendedDailyIntake: '400 mcg for adults',
    funFact: 'Folate got its name from "foliage" because it\'s found in leafy greens!',
  },
  {
    name: 'Vitamin B12',
    aliases: ['Cobalamin'],
    category: 'Water-Soluble',
    description: 'Essential for nerve function, DNA production, and red blood cell formation.',
    benefits: ['Nerve function', 'Red blood cell production', 'DNA synthesis', 'Energy production'],
    sources: [
      { name: 'Clams', amount: '84 mcg per 3 oz', category: 'Seafood' },
      { name: 'Salmon', amount: '4.8 mcg per 3 oz', category: 'Seafood' },
      { name: 'Beef', amount: '2.4 mcg per 3 oz', category: 'Meat' },
      { name: 'Eggs', amount: '0.6 mcg per large egg', category: 'Dairy & Eggs' },
      { name: 'Milk', amount: '1.2 mcg per 1 cup', category: 'Dairy & Eggs' },
      { name: 'Fortified Nutritional Yeast', amount: '2.4 mcg per 1 tbsp', category: 'Other' },
    ],
    deficiencySymptoms: ['Fatigue', 'Weakness', 'Memory problems', 'Numbness'],
    recommendedDailyIntake: '2.4 mcg for adults',
    funFact: 'Vegans need B12 supplements since it\'s only naturally found in animal products!',
  },
  {
    name: 'Vitamin C',
    aliases: ['Ascorbic acid'],
    category: 'Water-Soluble',
    description: 'Powerful antioxidant essential for immune function, collagen production, and iron absorption.',
    benefits: ['Immune support', 'Collagen production', 'Wound healing', 'Antioxidant protection'],
    sources: [
      { name: 'Orange', amount: '70 mg per medium orange', category: 'Fruit' },
      { name: 'Strawberries', amount: '89 mg per 1 cup', category: 'Fruit' },
      { name: 'Bell Peppers (Red)', amount: '190 mg per 1 cup', category: 'Vegetable' },
      { name: 'Broccoli', amount: '81 mg per 1 cup cooked', category: 'Vegetable' },
      { name: 'Kiwi', amount: '64 mg per medium kiwi', category: 'Fruit' },
      { name: 'Tomatoes', amount: '55 mg per 1 cup', category: 'Vegetable' },
    ],
    deficiencySymptoms: ['Scurvy', 'Bleeding gums', 'Slow wound healing', 'Fatigue'],
    recommendedDailyIntake: '75-90 mg for adults',
    funFact: 'Red bell peppers have more Vitamin C than oranges - 190mg vs 70mg!',
  },
  {
    name: 'Vitamin D',
    aliases: ['Cholecalciferol', 'Calciferol', 'The Sunshine Vitamin'],
    category: 'Fat-Soluble',
    description: 'Essential for calcium absorption, bone health, and immune function. Produced by the skin when exposed to sunlight.',
    benefits: ['Bone health', 'Calcium absorption', 'Immune function', 'Mood regulation'],
    sources: [
      { name: 'Salmon', amount: '570 IU per 3 oz', category: 'Seafood' },
      { name: 'Sardines', amount: '164 IU per 3 oz', category: 'Seafood' },
      { name: 'Egg Yolk', amount: '44 IU per large egg', category: 'Dairy & Eggs' },
      { name: 'Fortified Milk', amount: '115 IU per 1 cup', category: 'Dairy & Eggs' },
      { name: 'Mushrooms (UV-exposed)', amount: '400 IU per 1 cup', category: 'Vegetable' },
      { name: 'Sunlight', amount: '15-30 min exposure', category: 'Other' },
    ],
    deficiencySymptoms: ['Weak bones', 'Muscle weakness', 'Fatigue', 'Depression'],
    recommendedDailyIntake: '600-800 IU for adults',
    funFact: 'Just 15 minutes of sunlight can provide your daily dose of Vitamin D!',
  },
  {
    name: 'Vitamin E',
    aliases: ['Tocopherol', 'Alpha-tocopherol'],
    category: 'Fat-Soluble',
    description: 'Powerful antioxidant that protects cells from damage and supports immune function.',
    benefits: ['Antioxidant protection', 'Immune support', 'Skin health', 'Eye health'],
    sources: [
      { name: 'Sunflower Seeds', amount: '7.4 mg per 1 oz', category: 'Nuts & Seeds' },
      { name: 'Almonds', amount: '7.3 mg per 1 oz', category: 'Nuts & Seeds' },
      { name: 'Spinach', amount: '3.7 mg per 1 cup cooked', category: 'Vegetable' },
      { name: 'Avocado', amount: '4.2 mg per avocado', category: 'Fruit' },
      { name: 'Olive Oil', amount: '2 mg per 1 tbsp', category: 'Other' },
      { name: 'Peanuts', amount: '2.4 mg per 1 oz', category: 'Nuts & Seeds' },
    ],
    deficiencySymptoms: ['Muscle weakness', 'Vision problems', 'Nerve damage', 'Weak immunity'],
    recommendedDailyIntake: '15 mg for adults',
    funFact: 'Vitamin E is often added to cosmetics for its skin-protective properties!',
  },
  {
    name: 'Vitamin K',
    aliases: ['Phylloquinone', 'Menaquinone'],
    category: 'Fat-Soluble',
    description: 'Essential for blood clotting and bone metabolism.',
    benefits: ['Blood clotting', 'Bone health', 'Heart health', 'Wound healing'],
    sources: [
      { name: 'Kale', amount: '1062 mcg per 1 cup cooked', category: 'Vegetable' },
      { name: 'Spinach', amount: '889 mcg per 1 cup cooked', category: 'Vegetable' },
      { name: 'Broccoli', amount: '220 mcg per 1 cup cooked', category: 'Vegetable' },
      { name: 'Brussels Sprouts', amount: '218 mcg per 1 cup', category: 'Vegetable' },
      { name: 'Cabbage', amount: '163 mcg per 1 cup cooked', category: 'Vegetable' },
      { name: 'Natto (Fermented Soybeans)', amount: '850 mcg per 3 oz', category: 'Legumes' },
    ],
    deficiencySymptoms: ['Excessive bleeding', 'Easy bruising', 'Weak bones'],
    recommendedDailyIntake: '90-120 mcg for adults',
    funFact: 'One cup of kale provides over 1000% of your daily Vitamin K needs!',
  },
];

export function VitaminSourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVitamin, setSelectedVitamin] = useState<VitaminInfo | null>(null);

  const filteredVitamins = vitaminDatabase.filter((vitamin) => {
    const query = searchQuery.toLowerCase();
    return (
      vitamin.name.toLowerCase().includes(query) ||
      vitamin.aliases.some((alias) => alias.toLowerCase().includes(query)) ||
      vitamin.category.toLowerCase().includes(query)
    );
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Vegetable':
        return <Carrot className="w-4 h-4" />;
      case 'Fruit':
        return <Citrus className="w-4 h-4" />;
      case 'Seafood':
        return <Fish className="w-4 h-4" />;
      case 'Dairy & Eggs':
        return <Milk className="w-4 h-4" />;
      case 'Meat':
        return <Egg className="w-4 h-4" />;
      case 'Grains':
        return <Wheat className="w-4 h-4" />;
      case 'Nuts & Seeds':
      case 'Legumes':
        return <Leaf className="w-4 h-4" />;
      default:
        return <Apple className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Vegetable':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Fruit':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Seafood':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Dairy & Eggs':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Meat':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Grains':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Nuts & Seeds':
      case 'Legumes':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Vitamin Sources Finder
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover where to find essential vitamins and nutrients. Search for any vitamin to learn about its benefits, food sources, and health impact.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for vitamins (e.g., Vitamin D, B12, Folate, Biotin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg border-2 border-green-200 focus:border-green-500 rounded-xl"
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              Found {filteredVitamins.length} vitamin{filteredVitamins.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Results */}
        {!selectedVitamin ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVitamins.map((vitamin) => (
              <Card
                key={vitamin.name}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-300"
                onClick={() => setSelectedVitamin(vitamin)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl">{vitamin.name}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {vitamin.category}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {vitamin.aliases.join(' • ')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {vitamin.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vitamin.benefits.slice(0, 3).map((benefit, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    {vitamin.sources.length} food sources →
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedVitamin(null)}
              className="mb-6 text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
            >
              ← Back to all vitamins
            </button>

            <Card className="border-2 border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{selectedVitamin.name}</CardTitle>
                    <CardDescription className="text-base">
                      Also known as: {selectedVitamin.aliases.join(', ')}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    {selectedVitamin.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-8 pt-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    What is it?
                  </h3>
                  <p className="text-gray-700">{selectedVitamin.description}</p>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Health Benefits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedVitamin.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Food Sources */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Food Sources
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedVitamin.sources.map((source, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-lg hover:border-green-200 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg border ${getCategoryColor(source.category)}`}>
                            {getCategoryIcon(source.category)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{source.name}</div>
                            <div className="text-sm text-gray-500">{source.amount}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getCategoryColor(source.category)}>
                          {source.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Intake */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2 text-blue-900">
                    Recommended Daily Intake
                  </h3>
                  <p className="text-blue-800 text-lg">{selectedVitamin.recommendedDailyIntake}</p>
                </div>

                {/* Deficiency Symptoms */}
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-900">
                    Deficiency Symptoms
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedVitamin.deficiencySymptoms.map((symptom, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></div>
                        <span className="text-red-800">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fun Fact */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2 text-purple-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Fun Fact
                  </h3>
                  <p className="text-purple-800 italic">{selectedVitamin.funFact}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Reference Guide */}
        {!selectedVitamin && filteredVitamins.length === vitaminDatabase.length && (
          <div className="mt-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
              Quick Reference: Vitamin Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-semibold text-lg mb-3 text-blue-900">Water-Soluble Vitamins</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Not stored in the body - need daily replenishment
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">Vitamin C</Badge>
                  <Badge variant="outline" className="mr-2">B1 (Thiamine)</Badge>
                  <Badge variant="outline" className="mr-2">B2 (Riboflavin)</Badge>
                  <Badge variant="outline" className="mr-2">B3 (Niacin)</Badge>
                  <Badge variant="outline" className="mr-2">B5 (Pantothenic acid)</Badge>
                  <Badge variant="outline" className="mr-2">B6 (Pyridoxine)</Badge>
                  <Badge variant="outline" className="mr-2">B7 (Biotin)</Badge>
                  <Badge variant="outline" className="mr-2">B9 (Folate)</Badge>
                  <Badge variant="outline" className="mr-2">B12 (Cobalamin)</Badge>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-orange-200">
                <h3 className="font-semibold text-lg mb-3 text-orange-900">Fat-Soluble Vitamins</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Stored in body fat and liver - can accumulate
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">Vitamin A</Badge>
                  <Badge variant="outline" className="mr-2">Vitamin D</Badge>
                  <Badge variant="outline" className="mr-2">Vitamin E</Badge>
                  <Badge variant="outline" className="mr-2">Vitamin K</Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
