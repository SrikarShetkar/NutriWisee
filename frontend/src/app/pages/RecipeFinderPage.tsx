import { useState, useEffect } from 'react';
import { Search, Clock, DollarSign, Flame, ChefHat, Filter, Play, X, User, Heart } from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

type Recipe = {
  id: number;
  backendId?: number;
  name: string;
  category: string;
  cost: number;
  time: number;
  calories: number;
  protein: number;
  difficulty: string;
  ingredients: string[];
  detailedSteps: string[];
  tips: string[];
  image: string;
  videoLink: string;
  videoChannel: string;
};

export function RecipeFinderPage() {
  const [searchType, setSearchType] = useState<'ingredients' | 'budget'>('ingredients');
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [dynamicRecipes, setDynamicRecipes] = useState<Recipe[]>([]);
  const [savedRecipeKeys, setSavedRecipeKeys] = useState<Set<string>>(new Set());
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [userName, setUserName] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const userData = localStorage.getItem('nutriwise-user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name || 'Friend');
    }
  }, []);

  // Expanded recipe database with detailed instructions
  const recipes = [
    {
      id: 1,
      name: 'Masala Dosa',
      category: 'Breakfast',
      cost: 30,
      time: 30,
      calories: 320,
      protein: 8,
      difficulty: 'Medium',
      ingredients: ['Dosa Batter', 'Potatoes', 'Onions', 'Mustard Seeds', 'Curry Leaves', 'Turmeric', 'Oil'],
      detailedSteps: [
        'Boil 3-4 potatoes until soft, then peel and mash them coarsely',
        'Heat 2 tbsp oil in a pan, add 1 tsp mustard seeds and let them splutter',
        'Add curry leaves, chopped onions, and green chilies. Sauté until golden',
        'Add 1/2 tsp turmeric powder, mashed potatoes, and salt. Mix well and cook for 5 minutes',
        'Heat a non-stick tawa, pour a ladleful of dosa batter and spread in circular motion',
        'Drizzle oil around edges, cook until crispy and golden brown',
        'Place potato filling in the center, fold the dosa and serve hot with chutney and sambar'
      ],
      tips: [
        'Batter should be thin and flowing for crispy dosas',
        'Keep the tawa at medium heat for even cooking',
        'Add a pinch of hing (asafoetida) to the filling for better digestion'
      ],
      image: 'https://images.unsplash.com/photo-1743517894265-c86ab035adef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhbGElMjBkb3NhJTIwc291dGglMjBpbmRpYW58ZW58MXx8fHwxNzc1NDc4MTc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=D6QLGsLyEv8',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 2,
      name: 'Poha (Flattened Rice)',
      category: 'Breakfast',
      cost: 18,
      time: 15,
      calories: 220,
      protein: 7,
      difficulty: 'Easy',
      ingredients: ['Poha (Flattened Rice)', 'Onions', 'Peanuts', 'Curry Leaves', 'Mustard Seeds', 'Turmeric', 'Lemon'],
      detailedSteps: [
        'Rinse 2 cups poha in water and drain immediately. Keep aside for 5 minutes',
        'Heat 2 tbsp oil, add 1 tsp mustard seeds, let them splutter',
        'Add 2 tbsp peanuts, fry until golden. Add curry leaves and chopped green chilies',
        'Add chopped onions, sauté until translucent',
        'Add 1/4 tsp turmeric powder and salt to taste',
        'Add the soaked poha, mix gently without breaking',
        'Cover and cook on low heat for 2-3 minutes',
        'Squeeze lemon juice, garnish with fresh coriander and serve hot'
      ],
      tips: [
        'Don\'t over-soak poha - it should remain fluffy, not mushy',
        'Add boiled potatoes for extra nutrition',
        'Roast peanuts until crispy for best taste'
      ],
      image: 'https://images.unsplash.com/photo-1614247310314-c17f87b47ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2hhJTIwaW5kaWFuJTIwYnJlYWtmYXN0JTIwZmxhdHRlbmVkJTIwcmljZXxlbnwxfHx8fDE3NzU0NzgxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=XE9DhYiXJik',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 3,
      name: 'Idli Sambar',
      category: 'Breakfast',
      cost: 25,
      time: 20,
      calories: 180,
      protein: 8,
      difficulty: 'Easy',
      ingredients: ['Idli Batter', 'Toor Dal', 'Mixed Vegetables', 'Sambar Powder', 'Tamarind', 'Curry Leaves'],
      detailedSteps: [
        'Grease idli plates with oil',
        'Pour idli batter into each mold (3/4th full)',
        'Steam in idli steamer or pressure cooker (without weight) for 10-12 minutes',
        'For sambar: Pressure cook 1/2 cup toor dal with turmeric until soft',
        'In a pan, cook mixed vegetables (carrots, beans, drumstick) with sambar powder',
        'Add tamarind extract and cooked dal',
        'Prepare tempering with mustard seeds, curry leaves, and dried red chilies',
        'Pour tempering over sambar and simmer for 5 minutes',
        'Serve hot idlis with sambar and coconut chutney'
      ],
      tips: [
        'Batter should be fermented well overnight for soft idlis',
        'Add 1/4 tsp baking soda if batter hasn\'t fermented properly',
        'Use drumsticks in sambar for authentic taste'
      ],
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpZGxpJTIwc2FtYmFyJTIwc291dGglMjBpbmRpYW4lMjBicmVha2Zhc3R8ZW58MXx8fHwxNzc1NDc4MTc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=lW_P5zQ77_Q',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 4,
      name: 'Dal Tadka',
      category: 'Main Course',
      cost: 25,
      time: 25,
      calories: 200,
      protein: 14,
      difficulty: 'Easy',
      ingredients: ['Toor Dal', 'Onion', 'Tomato', 'Garlic', 'Cumin Seeds', 'Red Chili', 'Ghee', 'Coriander'],
      detailedSteps: [
        'Wash 1 cup toor dal thoroughly and pressure cook with 3 cups water and 1/4 tsp turmeric for 3-4 whistles',
        'Mash the cooked dal well with a whisk until smooth',
        'Heat 2 tbsp ghee in a pan, add 1 tsp cumin seeds',
        'Add 4-5 chopped garlic cloves, sauté until golden',
        'Add 1 finely chopped onion, cook until translucent',
        'Add 2 chopped tomatoes, cook until soft and mushy',
        'Add red chili powder, coriander powder, and garam masala',
        'Pour this tadka over the boiled dal and mix well',
        'Simmer for 5 minutes, garnish with fresh coriander',
        'Serve hot with rice or roti'
      ],
      tips: [
        'Adding a pinch of hing (asafoetida) helps with digestion',
        'For restaurant-style, add 1 tbsp butter at the end',
        'Adjust consistency with hot water if too thick'
      ],
      image: 'https://images.unsplash.com/photo-1767114915989-c6ab3c8fc42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBsZW50aWwlMjBjdXJyeSUyMGRhbHxlbnwxfHx8fDE3NzQwOTQ5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=QaRJPqHNZj4',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 5,
      name: 'Paneer Tikka',
      category: 'Main Course',
      cost: 60,
      time: 30,
      calories: 380,
      protein: 22,
      difficulty: 'Medium',
      ingredients: ['Paneer', 'Hung Curd', 'Bell Peppers', 'Onions', 'Tikka Masala', 'Ginger-Garlic Paste', 'Lemon'],
      detailedSteps: [
        'Cut 250g paneer into 1-inch cubes',
        'In a bowl, mix 1 cup hung curd, 2 tbsp tikka masala, 1 tbsp ginger-garlic paste, lemon juice, and salt',
        'Add paneer cubes, chopped bell peppers, and onion pieces to the marinade',
        'Mix gently and marinate for at least 30 minutes (or 2 hours for best results)',
        'Preheat oven to 200°C or prepare a grill pan',
        'Thread marinated paneer and vegetables onto skewers',
        'Brush with oil and grill for 15-20 minutes, turning occasionally',
        'Or bake in oven for 20-25 minutes until slightly charred',
        'Garnish with chat masala, lemon juice, and onion rings',
        'Serve hot with mint chutney'
      ],
      tips: [
        'Use hung curd (not regular curd) for better consistency',
        'Don\'t over-marinate as paneer can become too soft',
        'Add kasuri methi for restaurant-style flavor'
      ],
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjB0aWtrYSUyMGluZGlhbiUyMGRpc2h8ZW58MXx8fHwxNzc1NDc4MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=gYvIXawW4aU',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 6,
      name: 'Vegetable Upma',
      category: 'Breakfast',
      cost: 20,
      time: 15,
      calories: 180,
      protein: 6,
      difficulty: 'Easy',
      ingredients: ['Rava (Semolina)', 'Mixed Vegetables', 'Mustard Seeds', 'Curry Leaves', 'Cashews', 'Lemon'],
      detailedSteps: [
        'Dry roast 1 cup rava in a pan until aromatic. Keep aside',
        'Heat 2 tbsp oil, add 1 tsp mustard seeds and urad dal',
        'Add cashews, fry until golden',
        'Add curry leaves, chopped green chilies, and ginger',
        'Add chopped vegetables (carrots, beans, peas) and sauté for 5 minutes',
        'Add 2.5 cups water and bring to boil',
        'Gradually add roasted rava while stirring continuously to avoid lumps',
        'Cover and cook on low heat for 3-4 minutes',
        'Add lemon juice, mix well',
        'Garnish with coriander and serve hot'
      ],
      tips: [
        'Roasting rava prevents lumps and enhances flavor',
        'Water ratio is 2.5:1 for soft upma',
        'Add ghee on top for rich taste'
      ],
      image: 'https://images.unsplash.com/photo-1651718243509-742f5bd5836c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjB1cG1hJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc3NDA5NDk2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=7p7zrJu7hNE',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 7,
      name: 'Egg Fried Rice',
      category: 'Main Course',
      cost: 35,
      time: 15,
      calories: 350,
      protein: 12,
      difficulty: 'Easy',
      ingredients: ['Cooked Rice', 'Eggs', 'Mixed Vegetables', 'Soy Sauce', 'Spring Onions', 'Garlic', 'Ginger'],
      detailedSteps: [
        'Use day-old cooked rice for best results. Fluff it up',
        'Beat 2 eggs with a pinch of salt',
        'Heat 2 tbsp oil in a wok or large pan on high heat',
        'Add chopped garlic and ginger, sauté for 30 seconds',
        'Add chopped vegetables (carrots, beans, cabbage, capsicum), stir-fry for 3 minutes',
        'Push vegetables to side, pour beaten eggs in the center',
        'Scramble eggs until cooked, then mix with vegetables',
        'Add cooked rice, break up any clumps',
        'Add 2 tbsp soy sauce, 1 tsp vinegar, pepper, and salt',
        'Toss everything on high heat for 2-3 minutes',
        'Garnish with chopped spring onions and serve hot'
      ],
      tips: [
        'High heat is essential for authentic fried rice',
        'Don\'t use freshly cooked rice - it becomes mushy',
        'Add green chilies for spicy version'
      ],
      image: 'https://images.unsplash.com/photo-1642972420043-4736c570a716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2clMjBmcmllZCUyMHJpY2UlMjBpbmRpYW58ZW58MXx8fHwxNzc0MDk0OTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=ZWgPIR66vgY',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 8,
      name: 'Aloo Paratha',
      category: 'Breakfast',
      cost: 25,
      time: 30,
      calories: 320,
      protein: 8,
      difficulty: 'Medium',
      ingredients: ['Wheat Flour', 'Potatoes', 'Green Chilies', 'Coriander', 'Cumin Powder', 'Amchur', 'Ghee'],
      detailedSteps: [
        'Boil 4 potatoes, peel and mash them while still warm',
        'Add chopped green chilies, coriander, cumin powder, amchur, garam masala, and salt to the mashed potatoes',
        'Mix the spiced potato filling well',
        'Prepare dough with 2 cups wheat flour, water, salt, and 1 tbsp oil. Knead until soft',
        'Divide dough into equal portions (golf ball size)',
        'Roll each portion into a small circle, place potato filling in center',
        'Seal edges and roll gently into a thick paratha (don\'t roll too thin)',
        'Heat tawa on medium-high, place paratha',
        'Apply ghee on both sides, cook until golden brown spots appear',
        'Serve hot with curd, pickle, or butter'
      ],
      tips: [
        'Don\'t add too much filling or paratha will break while rolling',
        'Keep the paratha thick for soft texture',
        'Serve immediately for best taste'
      ],
      image: 'https://images.unsplash.com/photo-1668357530437-72a12c660f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9vJTIwcGFyYXRoYSUyMGluZGlhbiUyMGJyZWFkfGVufDF8fHx8MTc3NDA5NDk2MXww&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=lW6qp7v77o0',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 9,
      name: 'Vegetable Khichdi',
      category: 'Main Course',
      cost: 30,
      time: 25,
      calories: 220,
      protein: 10,
      difficulty: 'Easy',
      ingredients: ['Rice', 'Moong Dal', 'Mixed Vegetables', 'Turmeric', 'Cumin', 'Ghee', 'Ginger'],
      detailedSteps: [
        'Wash 1/2 cup rice and 1/2 cup moong dal together',
        'Chop mixed vegetables (carrots, beans, peas, cauliflower)',
        'Heat 1 tbsp ghee in pressure cooker',
        'Add 1 tsp cumin seeds, grated ginger, and green chili',
        'Add chopped vegetables and sauté for 2 minutes',
        'Add washed rice and dal, mix well',
        'Add 1/4 tsp turmeric powder, salt, and 3 cups water',
        'Pressure cook for 3 whistles on medium heat',
        'Let pressure release naturally',
        'Mash slightly, add more ghee if desired',
        'Serve hot with curd, pickle, or papad'
      ],
      tips: [
        'This is perfect comfort food for sick days',
        'Add 1/4 tsp asafoetida for better digestion',
        'Consistency should be porridge-like, not too dry'
      ],
      image: 'https://images.unsplash.com/photo-1664717698774-84f62382613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBraGljaGRpJTIwcmljZSUyMGxlbnRpbHxlbnwxfHx8fDE3NzQwOTQ5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=cZfNSUK_G9A',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 10,
      name: 'Chickpea Salad (Chana Chaat)',
      category: 'Snack',
      cost: 20,
      time: 10,
      calories: 250,
      protein: 15,
      difficulty: 'Very Easy',
      ingredients: ['Boiled Chickpeas', 'Onion', 'Tomato', 'Cucumber', 'Lemon', 'Chaat Masala', 'Coriander'],
      detailedSteps: [
        'Boil 1 cup chickpeas until soft (or use canned chickpeas)',
        'Finely chop 1 onion, 1 tomato, and 1/2 cucumber',
        'In a bowl, add boiled chickpeas',
        'Add all chopped vegetables',
        'Add juice of 1 lemon',
        'Add 1 tsp chaat masala, 1/2 tsp cumin powder, black salt, and regular salt',
        'Add chopped green chilies (optional)',
        'Mix everything well',
        'Garnish with fresh coriander leaves',
        'Serve immediately as a healthy snack or light meal'
      ],
      tips: [
        'This is high in protein and fiber',
        'Add boiled potatoes for extra filling',
        'Perfect pre-workout snack'
      ],
      image: 'https://images.unsplash.com/photo-1688923130941-889a41f4439c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja3BlYSUyMHNhbGFkJTIwaGVhbHRoeXxlbnwxfHx8fDE3NzQwOTQ5NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=V5oNOg9KFyo',
      videoChannel: 'Vismai Food',
    },
    {
      id: 11,
      name: 'Banana Smoothie',
      category: 'Snack',
      cost: 15,
      time: 5,
      calories: 200,
      protein: 8,
      difficulty: 'Very Easy',
      ingredients: ['Banana', 'Milk', 'Honey', 'Oats', 'Cinnamon'],
      detailedSteps: [
        'Peel and slice 2 ripe bananas',
        'Add bananas to a blender',
        'Pour 1 cup chilled milk (dairy or plant-based)',
        'Add 1 tbsp honey or maple syrup for sweetness',
        'Add 2 tbsp oats for extra fiber (optional)',
        'Add a pinch of cinnamon powder',
        'Add 4-5 ice cubes for a refreshing drink',
        'Blend on high speed until smooth and creamy',
        'Pour into glasses',
        'Optionally top with sliced banana, nuts, or seeds'
      ],
      tips: [
        'Use frozen bananas for thicker consistency',
        'Add peanut butter for protein boost',
        'Perfect post-workout recovery drink'
      ],
      image: 'https://images.unsplash.com/photo-1592503469446-7c9a9f55b5ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBzbW9vdGhpZSUyMGhlYWx0aHl8ZW58MXx8fHwxNzc0MDk0OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=F7lzlqOjYyQ',
      videoChannel: 'Vismai Food',
    },
    {
      id: 12,
      name: 'Egg Bhurji',
      category: 'Main Course',
      cost: 30,
      time: 15,
      calories: 280,
      protein: 18,
      difficulty: 'Easy',
      ingredients: ['Eggs', 'Onion', 'Tomato', 'Green Chili', 'Coriander', 'Turmeric', 'Red Chili Powder'],
      detailedSteps: [
        'Beat 3-4 eggs in a bowl with salt',
        'Finely chop 1 large onion, 2 tomatoes, 2 green chilies',
        'Heat 2 tbsp oil in a pan',
        'Add chopped onions, sauté until golden brown',
        'Add green chilies, ginger-garlic paste, cook for 1 minute',
        'Add chopped tomatoes, cook until soft and mushy',
        'Add 1/4 tsp turmeric powder, 1/2 tsp red chili powder, and salt',
        'Pour beaten eggs, stir continuously',
        'Scramble eggs until cooked but still moist (don\'t overcook)',
        'Garnish with fresh coriander',
        'Serve hot with bread, roti, or paratha'
      ],
      tips: [
        'Don\'t overcook eggs - they should be soft and fluffy',
        'Add 1 tbsp butter at the end for rich taste',
        'Perfect quick meal for students'
      ],
      image: 'https://images.unsplash.com/photo-1644289450169-bc58aa16bacb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2clMjBiaHVyamklMjBzY3JhbWJsZWR8ZW58MXx8fHwxNzc0MDk0OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      videoLink: 'https://www.youtube.com/watch?v=RAYAHFukLxQ',
      videoChannel: 'Hebbars Kitchen',
    },
    // ── Non-Veg Recipes ──────────────────────────────────────
    {
      id: 13,
      name: 'Butter Chicken',
      category: 'Non-Veg',
      cost: 120,
      time: 45,
      calories: 480,
      protein: 32,
      difficulty: 'Medium',
      ingredients: ['Chicken', 'Butter', 'Cream', 'Tomatoes', 'Onion', 'Ginger-Garlic Paste', 'Kashmiri Chili', 'Garam Masala', 'Kasuri Methi'],
      detailedSteps: [
        'Marinate 500g chicken in yogurt, red chili, garam masala, ginger-garlic paste for 30 min',
        'Grill or pan-fry marinated chicken until cooked and slightly charred',
        'Heat 2 tbsp butter in a pan, sauté onions until golden',
        'Add ginger-garlic paste, cook 2 min. Add chopped tomatoes, cook until mushy',
        'Add Kashmiri chili powder, coriander powder, salt. Cook 5 min',
        'Blend the sauce smooth. Return to pan',
        'Add grilled chicken pieces, pour in 1/2 cup cream',
        'Add 1 tsp kasuri methi (crushed). Simmer 10 min',
        'Finish with 1 tbsp butter. Serve with naan or rice'
      ],
      tips: ['Use Kashmiri chili for vibrant colour without too much heat', 'Rest marinated chicken overnight for deeper flavour', 'Kasuri methi is the secret to restaurant taste'],
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=a03U45jFxOI',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 14,
      name: 'Chicken Curry',
      category: 'Non-Veg',
      cost: 90,
      time: 40,
      calories: 380,
      protein: 28,
      difficulty: 'Medium',
      ingredients: ['Chicken', 'Onions', 'Tomatoes', 'Ginger-Garlic Paste', 'Coriander Powder', 'Turmeric', 'Red Chili Powder', 'Garam Masala', 'Oil'],
      detailedSteps: [
        'Heat oil in a heavy pot. Add whole spices (bay leaf, cloves, cardamom)',
        'Add finely chopped onions, fry until deep golden brown — this is key',
        'Add ginger-garlic paste, fry 2 minutes until raw smell disappears',
        'Add chopped tomatoes. Cook until oil separates (10 min)',
        'Add turmeric, red chili, coriander powder, salt. Mix well',
        'Add chicken pieces, coat in masala. Sear on high heat 5 min',
        'Add 1 cup water, bring to boil. Cover and cook 20 min on medium',
        'Check chicken is cooked through. Add garam masala',
        'Garnish with fresh coriander. Serve with rice or roti'
      ],
      tips: ['Brown the onions deeply — this builds the base flavour', 'Adding whole spices at the start gives a more aromatic curry', 'Bone-in chicken gives more flavour than boneless'],
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=7JEBrZHFZS4',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 15,
      name: 'Fish Fry',
      category: 'Non-Veg',
      cost: 80,
      time: 25,
      calories: 320,
      protein: 30,
      difficulty: 'Easy',
      ingredients: ['Fish Fillets', 'Red Chili Powder', 'Turmeric', 'Lemon Juice', 'Ginger-Garlic Paste', 'Curry Leaves', 'Oil', 'Rice Flour'],
      detailedSteps: [
        'Clean and pat dry 4 fish fillets (surmai, pomfret, or rohu)',
        'Make marinade: red chili powder, turmeric, ginger-garlic paste, lemon juice, salt, rice flour',
        'Coat fish fillets evenly in marinade. Rest 15 minutes',
        'Heat oil in a wide pan on medium-high heat',
        'Place fish carefully, add curry leaves alongside',
        'Fry 4-5 minutes each side without disturbing until golden and crispy',
        'Drain on paper towel',
        'Serve hot with lemon wedges and onion rings'
      ],
      tips: ['Pat fish completely dry before marinating', 'Rice flour gives extra crispiness', 'Don\'t flip too early — wait until it releases naturally'],
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=6I7EMXL6g0M',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 16,
      name: 'Egg Curry',
      category: 'Non-Veg',
      cost: 40,
      time: 25,
      calories: 290,
      protein: 16,
      difficulty: 'Easy',
      ingredients: ['Boiled Eggs', 'Onions', 'Tomatoes', 'Ginger-Garlic Paste', 'Coconut Milk', 'Turmeric', 'Red Chili Powder', 'Garam Masala'],
      detailedSteps: [
        'Hard boil 4 eggs, peel and make 3-4 slits on each egg',
        'Shallow fry eggs in oil with a pinch of turmeric until golden. Set aside',
        'In same pan, add onions, fry until golden',
        'Add ginger-garlic paste, cook 2 min',
        'Add tomatoes, cook until soft and oil separates',
        'Add turmeric, chili powder, coriander powder, salt. Cook 3 min',
        'Pour in 1 cup coconut milk (or water), bring to simmer',
        'Add fried eggs, simmer 5 minutes until gravy thickens',
        'Finish with garam masala and fresh coriander'
      ],
      tips: ['Pricking the eggs lets the masala absorb inside', 'Light frying the eggs before adding to curry adds great texture', 'Coconut milk makes it rich and creamy'],
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=V83SFkfIJFg',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 17,
      name: 'Mutton Biryani',
      category: 'Non-Veg',
      cost: 150,
      time: 90,
      calories: 580,
      protein: 38,
      difficulty: 'Hard',
      ingredients: ['Basmati Rice', 'Mutton', 'Fried Onions', 'Yogurt', 'Saffron', 'Whole Spices', 'Mint', 'Ghee', 'Biryani Masala'],
      detailedSteps: [
        'Marinate mutton in yogurt, biryani masala, ginger-garlic paste, fried onions overnight',
        'Soak basmati rice 30 min, par-boil with whole spices until 70% done',
        'Cook marinated mutton in heavy pot until tender (30 min pressure cooker)',
        'Layer: mutton masala at bottom, then rice, saffron milk, fried onions, mint, ghee',
        'Seal pot with dough or foil. Cook on dum: high 5 min, then low 25 min',
        'Rest 10 min before opening',
        'Mix gently from the bottom and serve with raita'
      ],
      tips: ['Long marination is essential for tender mutton', 'Dum cooking on a tawa/griddle prevents burning', 'Use aged basmati rice for best results'],
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=e5SRBzYhGnA',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 18,
      name: 'Keema Pav',
      category: 'Non-Veg',
      cost: 70,
      time: 30,
      calories: 420,
      protein: 26,
      difficulty: 'Easy',
      ingredients: ['Minced Mutton / Chicken', 'Onions', 'Tomatoes', 'Peas', 'Pav Bread', 'Ginger-Garlic Paste', 'Keema Masala', 'Butter'],
      detailedSteps: [
        'Heat oil, add onions fry until golden',
        'Add ginger-garlic paste, cook 2 min',
        'Add minced meat (keema), cook on high heat breaking lumps — 10 min',
        'Add tomatoes, cook until oil separates',
        'Add keema masala, turmeric, red chili powder, salt',
        'Add peas and 1/4 cup water. Simmer covered 10 min',
        'Garnish with lemon juice and coriander',
        'Toast pav with butter on a tawa. Serve keema with pav'
      ],
      tips: ['Cook keema on high heat first to remove excess moisture', 'Add a squeeze of lemon at the end for freshness', 'Leftover keema makes great sandwiches'],
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=RYZV3L1Evng',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 19,
      name: 'Prawn Masala',
      category: 'Non-Veg',
      cost: 130,
      time: 25,
      calories: 300,
      protein: 28,
      difficulty: 'Medium',
      ingredients: ['Prawns', 'Onions', 'Tomatoes', 'Coconut', 'Ginger-Garlic Paste', 'Red Chili', 'Turmeric', 'Curry Leaves', 'Oil'],
      detailedSteps: [
        'Clean and devein 300g prawns. Marinate with turmeric and salt for 10 min',
        'Dry roast coconut until golden. Grind with red chilies and a little water',
        'Heat oil, add curry leaves, then onions. Fry until golden',
        'Add ginger-garlic paste, cook 2 min',
        'Add tomatoes, cook until soft. Add coconut-chili paste',
        'Cook masala 5 min until oil surfaces',
        'Add prawns, cook 5-6 min — don\'t overcook or they become rubbery',
        'Adjust salt, garnish with coriander. Serve with rice'
      ],
      tips: ['Prawns cook fast — remove from heat the moment they curl into a C-shape', 'Fresh coconut makes the masala richer', 'Deveining is important for a clean taste'],
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=6rG1n4fkpnM',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 20,
      name: 'Chicken Biryani',
      category: 'Non-Veg',
      cost: 100,
      time: 60,
      calories: 520,
      protein: 34,
      difficulty: 'Medium',
      ingredients: ['Basmati Rice', 'Chicken', 'Yogurt', 'Fried Onions', 'Mint', 'Saffron', 'Ghee', 'Biryani Masala', 'Whole Spices'],
      detailedSteps: [
        'Marinate chicken in yogurt, biryani masala, ginger-garlic paste, fried onions, lemon — 1 hr',
        'Soak basmati rice 30 min. Par-boil with whole spices until 70% cooked',
        'Cook marinated chicken in pot until 80% done (15-20 min)',
        'Layer rice over chicken. Add saffron milk, mint, fried onions, ghee',
        'Cover tightly with foil and lid. Cook on dum: high 5 min then low 20 min',
        'Rest 10 min. Open gently and mix from the edges',
        'Serve with raita, boiled egg, and salan'
      ],
      tips: ['Par-cooking rice only 70% ensures it finishes perfectly in the dum', 'Fresh mint and saffron are what make biryani special', 'Tawa/griddle under the pot prevents burning on dum'],
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=FlQlBFBqhN4',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 21,
      name: 'Tandoori Chicken',
      category: 'Non-Veg',
      cost: 110,
      time: 50,
      calories: 340,
      protein: 36,
      difficulty: 'Medium',
      ingredients: ['Chicken Legs / Whole Chicken', 'Hung Curd', 'Kashmiri Chili', 'Ginger-Garlic Paste', 'Tandoori Masala', 'Lemon', 'Mustard Oil', 'Charcoal'],
      detailedSteps: [
        'Make deep cuts in chicken pieces for marinade to penetrate',
        'First marinate: lemon juice, salt, chili powder — 20 min',
        'Second marinade: hung curd, tandoori masala, ginger-garlic paste, mustard oil — mix well',
        'Coat chicken thoroughly. Marinate minimum 4 hours (overnight is best)',
        'Preheat oven to 220°C or prepare grill',
        'Place chicken on wire rack. Bake/grill 25-30 min, turning halfway',
        'For smoky tandoor flavour: place hot charcoal in foil cup inside pot, drizzle oil, cover 5 min',
        'Serve with onion rings, lemon, and mint chutney'
      ],
      tips: ['Mustard oil in marinade gives authentic tandoor flavour', 'The charcoal smoking trick is magic', 'Don\'t skip overnight marination for bone-in chicken'],
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=gfp-KhFqvLs',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 22,
      name: 'Fish Curry',
      category: 'Non-Veg',
      cost: 90,
      time: 30,
      calories: 310,
      protein: 26,
      difficulty: 'Easy',
      ingredients: ['Fish', 'Coconut Milk', 'Tamarind', 'Onions', 'Tomatoes', 'Mustard Seeds', 'Curry Leaves', 'Red Chili', 'Turmeric'],
      detailedSteps: [
        'Marinate fish with turmeric and salt, rest 10 min',
        'Heat oil, add mustard seeds until they splutter. Add curry leaves',
        'Add sliced onions, fry until translucent',
        'Add ginger-garlic paste, cook 2 min',
        'Add tomatoes and cook until mushy',
        'Add red chili powder, coriander powder, turmeric. Cook 3 min',
        'Pour coconut milk and tamarind extract. Bring to gentle simmer',
        'Add fish pieces, cook 8-10 min on medium. Don\'t stir too much',
        'Season and serve with steamed rice'
      ],
      tips: ['Simmer gently — vigorous boiling breaks delicate fish', 'Tamarind balances the richness of coconut milk', 'Kerala-style: use kokum instead of tamarind'],
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=9LCWOaLJxPg',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 23,
      name: 'Chicken Tikka Masala',
      category: 'Non-Veg',
      cost: 115,
      time: 40,
      calories: 450,
      protein: 33,
      difficulty: 'Medium',
      ingredients: ['Chicken Breast', 'Hung Curd', 'Onions', 'Tomatoes', 'Cream', 'Cashews', 'Tikka Masala', 'Kasuri Methi', 'Butter'],
      detailedSteps: [
        'Marinate boneless chicken in hung curd, tikka masala, lemon, ginger-garlic paste — 2 hrs',
        'Grill or pan-fry marinated chicken until lightly charred. Set aside',
        'Blend cooked onions, tomatoes, and cashews into smooth paste',
        'Heat butter in pan, add the blended paste. Cook 8-10 min stirring',
        'Add tikka masala, red chili, salt. Cook until oil separates',
        'Add grilled chicken tikka pieces',
        'Pour cream, add crushed kasuri methi. Simmer 5 min',
        'Adjust seasoning. Serve with naan and sliced onions'
      ],
      tips: ['Cashews in the gravy make it silky smooth', 'Charring the chicken before adding to curry is essential', 'This tastes even better the next day'],
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=a03U45jFxOI',
      videoChannel: 'Hebbars Kitchen',
    },
    {
      id: 24,
      name: 'Omelette',
      category: 'Breakfast',
      cost: 20,
      time: 10,
      calories: 220,
      protein: 14,
      difficulty: 'Very Easy',
      ingredients: ['Eggs', 'Onion', 'Tomato', 'Green Chili', 'Coriander', 'Salt', 'Pepper', 'Oil / Butter'],
      detailedSteps: [
        'Beat 2-3 eggs with salt, pepper, and a splash of water',
        'Finely chop onion, tomato, green chili, and coriander',
        'Heat butter or oil in a non-stick pan on medium heat',
        'Add chopped vegetables, sauté 1 min',
        'Pour beaten eggs over vegetables',
        'Let it set for 30 seconds without touching',
        'Gently fold one half over the other',
        'Slide onto plate. Serve immediately with toast'
      ],
      tips: ['Don\'t over-beat eggs — a few streaks are fine', 'Medium heat prevents rubbery texture', 'Add cheese inside before folding for a treat'],
      image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      videoLink: 'https://www.youtube.com/watch?v=qiG85lK-wUI',
      videoChannel: 'Tasty',
    },
  ];

  const categories = ['all', 'Breakfast', 'Main Course', 'Non-Veg', 'Snack'];

  const getRecipeKey = (recipe: Recipe) =>
    recipe.backendId ? `backend-${recipe.backendId}` : `static-${recipe.id}`;

  const formatFoodCategory = (category: string) => {
    const normalized = category.toLowerCase();
    if (normalized.includes('breakfast') || normalized.includes('breakfast')) return 'Breakfast';
    if (normalized.includes('snack') || normalized.includes('fruit') || normalized.includes('vegetable')) return 'Snack';
    if (normalized.includes('main') || normalized.includes('rice') || normalized.includes('dal') || normalized.includes('curry') || normalized.includes('meat')) return 'Main Course';
    return 'Main Course';
  };

  const parseTime = (time: string) => {
    const match = time.match(/\d+/);
    return match ? Number(match[0]) : 20;
  };

  const getImageForFood = (name: string) =>
    `https://images.unsplash.com/featured/?${encodeURIComponent(name)}&w=900&q=80`;

  const mapFoodToRecipe = (food: any): Recipe => ({
    id: 1000 + Number(food.id),
    backendId: Number(food.id),
    name: food.name,
    category: formatFoodCategory(food.category || 'Main Course'),
    cost: Number(food.price || food.calories || 30),
    time: parseTime(food.prepTime || '20 min'),
    calories: Number(food.calories || 200),
    protein: Number(food.protein || 8),
    difficulty: 'Easy',
    ingredients: [food.name, ...(food.vitamins || []).slice(0, 3)],
    detailedSteps: [
      `Start by preparing ${food.name}.`,
      `Use fresh ingredients and follow simple cooking steps.`,
      `Serve ${food.name} with your favorite sides or salads.`,
    ],
    tips: [`Add spices for taste`, `Use seasonal produce`, `Balance your meal with greens`],
    image: getImageForFood(food.name),
    videoLink: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(food.name + ' recipe'),
    videoChannel: 'Online Recipe',
  });

  const combinedRecipes = [...recipes, ...dynamicRecipes];

  const loadSavedRecipeKeys = async () => {
    const storageSaved = JSON.parse(localStorage.getItem('nutriwise-wishlist') || '[]') as string[];
    const savedSet = new Set(storageSaved);

    if (user) {
      try {
        const savedFoods = await apiService.getSavedFoods();
        savedFoods.forEach((food: any) => savedSet.add(`backend-${food.id}`));
      } catch (error) {
        console.warn('Unable to load saved favorites from backend:', error);
      }
    }

    setSavedRecipeKeys(savedSet);
  };

  // Load admin-created recipes from backend
  const loadDynamicRecipes = async () => {
    setIsLoadingRecipes(true);
    try {
      const data: any = await (apiService as any).getPublicRecipes();
      const rows: any[] = Array.isArray(data) ? data : (data.recipes || []);
      const mapped: Recipe[] = rows.map((r: any) => ({
        id: 1000 + Number(r.id),
        backendId: Number(r.id),
        name: r.name,
        category: r.category || 'Main Course',
        cost: Number(r.cost) || 0,
        time: Number(r.time) || 30,
        calories: Number(r.calories) || 300,
        protein: Number(r.protein) || 10,
        difficulty: r.difficulty || 'Easy',
        ingredients: (() => { try { return JSON.parse(r.ingredients); } catch { return r.ingredients ? r.ingredients.split(',') : []; } })(),
        detailedSteps: (() => { try { return JSON.parse(r.steps); } catch { return r.steps ? r.steps.split('\n') : []; } })(),
        tips: (() => { try { return JSON.parse(r.tips); } catch { return r.tips ? r.tips.split('\n') : []; } })(),
        image: r.image || '',
        videoLink: r.videoLink || '',
        videoChannel: r.videoChannel || '',
      }));
      setDynamicRecipes(mapped);
    } catch {
      // silently ignore — static recipes will show
    } finally {
      setIsLoadingRecipes(false);
    }
  };

  useEffect(() => {
    loadDynamicRecipes();
    loadSavedRecipeKeys();
  }, [user]);

  const filteredRecipes = combinedRecipes.filter((recipe) => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesBudget = !budgetFilter || recipe.cost <= Number(budgetFilter);
    const matchesSearch =
      !searchQuery ||
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesBudget && matchesSearch;
  });

  const persistSavedKeys = (keys: Set<string>) => {
    localStorage.setItem('nutriwise-wishlist', JSON.stringify(Array.from(keys)));
  };

  const handleToggleFavorite = async (recipe: Recipe) => {
    const key = getRecipeKey(recipe);
    const nextSavedKeys = new Set(savedRecipeKeys);

    if (nextSavedKeys.has(key)) {
      nextSavedKeys.delete(key);
      setSavedRecipeKeys(nextSavedKeys);
      persistSavedKeys(nextSavedKeys);
      if (recipe.backendId && user) {
        try {
          await apiService.removeSavedFood(recipe.backendId);
        } catch (error) {
          console.warn('Unable to remove saved recipe from backend:', error);
        }
      }
      return;
    }

    nextSavedKeys.add(key);
    setSavedRecipeKeys(nextSavedKeys);
    persistSavedKeys(nextSavedKeys);

    if (recipe.backendId && user) {
      try {
        await apiService.saveFoodToFavorites(recipe.backendId);
      } catch (error) {
        console.warn('Unable to save recipe to backend:', error);
      }
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Username */}
        <div className="mb-8">
          {userName && (
            <div className="mb-4 flex items-center space-x-2 text-lg">
              <span className="text-gray-600">Heyyy!!</span>
              <span className="font-bold text-green-600 text-xl">{userName}</span>
              <span className="text-gray-600">👋 Let's find you a delicious recipe</span>
            </div>
          )}
          <h1 className="text-4xl font-bold mb-3">
            Recipe Finder
          </h1>
          <p className="text-gray-600">
            Discover budget-friendly recipes with step-by-step instructions
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by name or ingredient
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="E.g., dal, rice, egg..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Budget (₹)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter max budget"
                />
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Recipes' : cat}
              </button>
            ))}
          </div>
        </div>

        {loadError && (
          <div className="mb-4 rounded-2xl bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-900">
            {loadError}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Found {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
        </div>

        {/* Recipe Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="relative h-48">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleToggleFavorite(recipe);
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      savedRecipeKeys.has(getRecipeKey(recipe)) ? 'bg-red-500 text-white' : 'bg-white/90 text-green-700 hover:bg-white'
                    }`}
                    title={savedRecipeKeys.has(getRecipeKey(recipe)) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ₹{recipe.cost}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{recipe.name}</h3>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {recipe.category}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {recipe.difficulty}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.time}m</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Flame className="w-4 h-4" />
                    <span>{recipe.calories}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <ChefHat className="w-4 h-4" />
                    <span>{recipe.protein}g</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Detail Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h2 className="text-3xl font-bold">{selectedRecipe.name}</h2>
                  <button
                    onClick={() => handleToggleFavorite(selectedRecipe)}
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-full transition-all ${
                      savedRecipeKeys.has(getRecipeKey(selectedRecipe)) ? 'bg-red-500 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                    title={savedRecipeKeys.has(getRecipeKey(selectedRecipe)) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <div className="font-bold text-green-600">₹{selectedRecipe.cost}</div>
                    <div className="text-xs text-gray-600">Cost</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <div className="font-bold text-blue-600">{selectedRecipe.time}m</div>
                    <div className="text-xs text-gray-600">Time</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <Flame className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                    <div className="font-bold text-orange-600">{selectedRecipe.calories}</div>
                    <div className="text-xs text-gray-600">Calories</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <ChefHat className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <div className="font-bold text-purple-600">{selectedRecipe.protein}g</div>
                    <div className="text-xs text-gray-600">Protein</div>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Ingredients</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Steps */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Step-by-Step Instructions</h3>
                  <div className="space-y-4">
                    {selectedRecipe.detailedSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="mb-6 bg-yellow-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2 text-yellow-800">Pro Tips</h3>
                  <ul className="space-y-1">
                    {selectedRecipe.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-yellow-900">• {tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Video Link */}
                <a
                  href={selectedRecipe.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Video Tutorial on {selectedRecipe.videoChannel}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}