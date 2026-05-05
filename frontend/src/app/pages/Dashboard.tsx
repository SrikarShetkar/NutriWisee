import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  DollarSign,
  TrendingDown,
  Flame,
  Apple,
  ChefHat,
  ArrowRight,
  RefreshCw,
  Clock,
  Sparkles,
  Heart,
  Leaf,
  Zap,
  Bell,
  BellOff,
  AlertTriangle,
} from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

// Food database with health tags and nutrition info
const foodDatabase = [
  // Breakfast items
  { id: 1, name: 'Banana + Milk', category: 'breakfast', items: ['1 Banana', '200ml Milk'], cost: 20, calories: 250, protein: 8, carbs: 45, fats: 2, time: '5 min', timing: '7:00 AM - 9:00 AM', idealTime: '8:00 AM', tags: ['high-protein', 'low-cost'], avoid: [] },
  { id: 2, name: 'Oats + Fruits', category: 'breakfast', items: ['1 cup Oats', 'Seasonal Fruits', 'Honey'], cost: 25, calories: 280, protein: 10, carbs: 50, fats: 5, time: '8 min', timing: '7:00 AM - 9:00 AM', idealTime: '8:00 AM', tags: ['high-fiber', 'diabetes-friendly'], avoid: [] },
  { id: 3, name: 'Vegetable Upma', category: 'breakfast', items: ['Rava', 'Vegetables', 'Mustard Seeds'], cost: 20, calories: 180, protein: 6, carbs: 35, fats: 4, time: '15 min', timing: '7:00 AM - 9:00 AM', idealTime: '8:00 AM', tags: ['low-cost', 'nutritious'], avoid: [] },
  { id: 4, name: 'Poha', category: 'breakfast', items: ['Flattened Rice', 'Peanuts', 'Curry Leaves'], cost: 18, calories: 220, protein: 7, carbs: 40, fats: 6, time: '12 min', timing: '7:00 AM - 9:00 AM', idealTime: '8:00 AM', tags: ['low-cost', 'light'], avoid: [] },
  
  // Lunch items
  { id: 5, name: 'Rice + Dal + Spinach', category: 'lunch', items: ['1 cup Rice', '1 cup Dal', 'Spinach Sabzi'], cost: 40, calories: 450, protein: 18, carbs: 75, fats: 8, time: '20 min', timing: '12:00 PM - 2:00 PM', idealTime: '1:00 PM', tags: ['high-protein', 'iron-rich'], avoid: ['kidney-disease'] },
  { id: 6, name: 'Roti + Chicken Curry', category: 'lunch', items: ['2 Rotis', '100g Chicken', 'Curry'], cost: 60, calories: 500, protein: 28, carbs: 55, fats: 15, time: '30 min', timing: '12:00 PM - 2:00 PM', idealTime: '1:00 PM', tags: ['high-protein'], avoid: ['vegetarian'] },
  { id: 7, name: 'Vegetable Khichdi', category: 'lunch', items: ['Rice', 'Moong Dal', 'Mixed Vegetables'], cost: 30, calories: 350, protein: 14, carbs: 60, fats: 6, time: '20 min', timing: '12:00 PM - 2:00 PM', idealTime: '1:00 PM', tags: ['easy-digest', 'low-cost'], avoid: [] },
  { id: 8, name: 'Curd Rice + Pickle', category: 'lunch', items: ['Rice', 'Curd', 'Pickle', 'Pomegranate'], cost: 25, calories: 300, protein: 10, carbs: 50, fats: 5, time: '10 min', timing: '12:00 PM - 2:00 PM', idealTime: '1:00 PM', tags: ['probiotic', 'cooling'], avoid: [] },
  
  // Snacks
  { id: 9, name: 'Peanuts', category: 'snack', items: ['50g Roasted Peanuts'], cost: 10, calories: 150, protein: 7, carbs: 15, fats: 10, time: '0 min', timing: '4:00 PM - 6:00 PM', idealTime: '5:00 PM', tags: ['high-protein', 'low-cost'], avoid: ['peanut-allergy'] },
  { id: 10, name: 'Banana Smoothie', category: 'snack', items: ['Banana', 'Milk', 'Honey'], cost: 20, calories: 200, protein: 8, carbs: 35, fats: 3, time: '5 min', timing: '4:00 PM - 6:00 PM', idealTime: '5:00 PM', tags: ['energy-boost'], avoid: [] },
  { id: 11, name: 'Chickpea Salad', category: 'snack', items: ['Boiled Chickpeas', 'Onion', 'Tomato', 'Lemon'], cost: 20, calories: 180, protein: 12, carbs: 25, fats: 4, time: '10 min', timing: '4:00 PM - 6:00 PM', idealTime: '5:00 PM', tags: ['high-protein', 'low-fat'], avoid: [] },
  { id: 12, name: 'Sprouts Chaat', category: 'snack', items: ['Mixed Sprouts', 'Onion', 'Tomato', 'Chaat Masala'], cost: 15, calories: 140, protein: 10, carbs: 20, fats: 2, time: '5 min', timing: '4:00 PM - 6:00 PM', idealTime: '5:00 PM', tags: ['high-protein', 'low-fat'], avoid: [] },
  
  // Dinner
  { id: 13, name: 'Roti + Egg Curry', category: 'dinner', items: ['2 Rotis', '2 Eggs', 'Onion Curry'], cost: 30, calories: 400, protein: 20, carbs: 50, fats: 12, time: '25 min', timing: '7:00 PM - 9:00 PM', idealTime: '8:00 PM', tags: ['high-protein'], avoid: ['egg-allergy', 'vegetarian'] },
  { id: 14, name: 'Dal + Roti + Vegetables', category: 'dinner', items: ['Dal', '2 Rotis', 'Mixed Vegetables'], cost: 35, calories: 380, protein: 16, carbs: 60, fats: 8, time: '30 min', timing: '7:00 PM - 9:00 PM', idealTime: '8:00 PM', tags: ['balanced', 'nutritious'], avoid: [] },
  { id: 15, name: 'Paneer Bhurji + Roti', category: 'dinner', items: ['Paneer', '2 Rotis', 'Spices'], cost: 50, calories: 420, protein: 22, carbs: 48, fats: 16, time: '20 min', timing: '7:00 PM - 9:00 PM', idealTime: '8:00 PM', tags: ['high-protein'], avoid: ['lactose-intolerance'] },
  { id: 16, name: 'Vegetable Soup + Bread', category: 'dinner', items: ['Mixed Vegetable Soup', '2 Bread Slices'], cost: 28, calories: 280, protein: 8, carbs: 45, fats: 6, time: '15 min', timing: '7:00 PM - 9:00 PM', idealTime: '8:00 PM', tags: ['light', 'low-calorie'], avoid: [] },
];

// Mock user profile (in real app, fetch from localStorage or backend)
const userProfile = {
  diseases: ['diabetes'], // ['diabetes', 'kidney-disease', 'hypertension']
  allergies: [], // ['peanut-allergy', 'egg-allergy', 'lactose-intolerance']
  preferences: ['vegetarian'], // ['vegetarian', 'non-vegetarian']
  preferredTags: ['high-protein', 'low-cost'], // Tags user prefers
  dislikedFoods: [], // Foods user dislikes
  dailyBudget: 100,
};

// Meal Planner Algorithm
function generateMealPlan(userProfile: typeof userProfile, foodDb: typeof foodDatabase) {
  // STEP 1: COLLECT INPUTS (already provided via userProfile)
  console.log('🔄 Step 1: Collecting user inputs...', userProfile);
  
  // STEP 2: APPLY HEALTH FILTERING
  console.log('🏥 Step 2: Applying health filters...');
  const healthFilteredFoods = foodDb.filter((food) => {
    // Remove foods that conflict with diseases
    const conflictsWithDiseases = food.avoid.some((tag) => 
      userProfile.diseases.includes(tag)
    );
    
    // Remove foods that conflict with allergies
    const conflictsWithAllergies = food.avoid.some((tag) => 
      userProfile.allergies.includes(tag)
    );
    
    // Remove foods that conflict with preferences (e.g., vegetarian)
    const conflictsWithPreferences = food.avoid.some((tag) => 
      userProfile.preferences.includes(tag)
    );
    
    // Remove disliked foods
    const isDisliked = userProfile.dislikedFoods.includes(food.name);
    
    return !conflictsWithDiseases && !conflictsWithAllergies && !conflictsWithPreferences && !isDisliked;
  });
  
  console.log(`✅ Filtered: ${foodDb.length} → ${healthFilteredFoods.length} foods after health filtering`);
  
  // STEP 3: SCORE FOOD ITEMS
  console.log('⭐ Step 3: Scoring foods based on preferences...');
  const scoredFoods = healthFilteredFoods.map((food) => {
    let score = 0;
    let scoreBreakdown: string[] = [];
    
    // Prefer foods with user's preferred tags (HIGH PRIORITY)
    const matchingTags = food.tags.filter((tag) => 
      userProfile.preferredTags.includes(tag)
    );
    if (matchingTags.length > 0) {
      const tagScore = matchingTags.length * 30;
      score += tagScore;
      scoreBreakdown.push(`+${tagScore} (preferred tags: ${matchingTags.join(', ')})`);
    }
    
    // Prefer low-cost foods (BUDGET OPTIMIZATION)
    if (food.cost <= 25) {
      score += 25;
      scoreBreakdown.push('+25 (very low cost)');
    } else if (food.cost <= 35) {
      score += 15;
      scoreBreakdown.push('+15 (low cost)');
    } else if (food.cost <= 45) {
      score += 5;
      scoreBreakdown.push('+5 (moderate cost)');
    }
    
    // Prefer nutritious foods - high protein (NUTRITIONAL VALUE)
    if (food.protein >= 20) {
      score += 25;
      scoreBreakdown.push('+25 (very high protein)');
    } else if (food.protein >= 15) {
      score += 15;
      scoreBreakdown.push('+15 (high protein)');
    } else if (food.protein >= 10) {
      score += 8;
      scoreBreakdown.push('+8 (good protein)');
    }
    
    // Bonus for disease-specific optimization
    if (food.tags.includes('diabetes-friendly') && userProfile.diseases.includes('diabetes')) {
      score += 30;
      scoreBreakdown.push('+30 (diabetes-friendly)');
    }
    
    // Prefer high fiber for digestive health
    if (food.tags.includes('high-fiber')) {
      score += 10;
      scoreBreakdown.push('+10 (high fiber)');
    }
    
    // Prefer easy-to-digest foods
    if (food.tags.includes('easy-digest') || food.tags.includes('light')) {
      score += 8;
      scoreBreakdown.push('+8 (easy to digest)');
    }
    
    // Calorie efficiency (more nutrition per rupee)
    const caloriesPerRupee = food.calories / food.cost;
    if (caloriesPerRupee > 15) {
      score += 10;
      scoreBreakdown.push('+10 (excellent value)');
    } else if (caloriesPerRupee > 10) {
      score += 5;
      scoreBreakdown.push('+5 (good value)');
    }
    
    return { 
      ...food, 
      score,
      scoreBreakdown: scoreBreakdown.join(', ')
    };
  });
  
  console.log('🏆 Top scored foods:', scoredFoods.slice(0, 3).map(f => `${f.name} (${f.score}pts)`));
  
  // STEP 4: GENERATE INITIAL MEAL PLAN
  console.log('🍽️ Step 4: Generating meal plan by category...');
  const categories = ['breakfast', 'lunch', 'snack', 'dinner'];
  const mealPlan: any = {};
  let totalBudgetUsed = 0;
  
  // Budget allocation strategy
  const budgetAllocation = {
    breakfast: 0.20, // 20% of daily budget
    lunch: 0.35,     // 35% of daily budget
    snack: 0.15,     // 15% of daily budget
    dinner: 0.30,    // 30% of daily budget
  };
  
  categories.forEach((category) => {
    const categoryFoods = scoredFoods.filter((food) => food.category === category);
    
    // Sort by score (descending)
    categoryFoods.sort((a, b) => b.score - a.score);
    
    // Calculate budget for this meal
    const categoryBudget = userProfile.dailyBudget * budgetAllocation[category as keyof typeof budgetAllocation];
    
    // Select best food within budget
    const selectedFood = categoryFoods.find((food) => food.cost <= categoryBudget && 
                                                        (totalBudgetUsed + food.cost) <= userProfile.dailyBudget);
    
    if (selectedFood) {
      totalBudgetUsed += selectedFood.cost;
      mealPlan[category] = {
        name: selectedFood.name,
        items: selectedFood.items,
        cost: selectedFood.cost,
        calories: selectedFood.calories,
        protein: selectedFood.protein,
        time: selectedFood.time,
        timing: selectedFood.timing,
        idealTime: selectedFood.idealTime,
        score: selectedFood.score,
      };
      console.log(`✓ ${category}: ${selectedFood.name} (₹${selectedFood.cost}, ${selectedFood.score}pts)`);
    } else {
      console.log(`✗ ${category}: No suitable food found within budget`);
    }
  });
  
  console.log(`💰 Total budget used: ₹${totalBudgetUsed} / ₹${userProfile.dailyBudget}`);
  console.log('✅ Meal plan generated successfully!');
  
  return mealPlan;
}

// Function to select an alternative meal from the same category
function selectAlternativeMeal(mealType: string, currentMealName: string | undefined, userProfile: typeof userProfile, foodDb: typeof foodDatabase) {
  // Filter foods for this meal category
  const categoryFoods = foodDb.filter((food) => food.category === mealType);
  
  // Apply health filtering
  const healthFilteredFoods = categoryFoods.filter((food) => {
    const conflictsWithDiseases = food.avoid.some((tag) => userProfile.diseases.includes(tag));
    const conflictsWithAllergies = food.avoid.some((tag) => userProfile.allergies.includes(tag));
    const conflictsWithPreferences = food.avoid.some((tag) => userProfile.preferences.includes(tag));
    const isDisliked = userProfile.dislikedFoods.includes(food.name);
    return !conflictsWithDiseases && !conflictsWithAllergies && !conflictsWithPreferences && !isDisliked;
  });
  
  // Exclude current meal
  const alternativeFoods = healthFilteredFoods.filter((food) => food.name !== currentMealName);
  
  if (alternativeFoods.length === 0) {
    return null;
  }
  
  // Score and select best alternative
  const scoredFoods = alternativeFoods.map((food) => {
    let score = 0;
    
    const matchingTags = food.tags.filter((tag) => userProfile.preferredTags.includes(tag));
    if (matchingTags.length > 0) {
      score += matchingTags.length * 30;
    }
    
    if (food.cost <= 25) score += 25;
    else if (food.cost <= 35) score += 15;
    else if (food.cost <= 45) score += 5;
    
    if (food.protein >= 20) score += 25;
    else if (food.protein >= 15) score += 15;
    else if (food.protein >= 10) score += 8;
    
    if (food.tags.includes('diabetes-friendly') && userProfile.diseases.includes('diabetes')) {
      score += 30;
    }
    
    const caloriesPerRupee = food.calories / food.cost;
    if (caloriesPerRupee > 15) score += 10;
    else if (caloriesPerRupee > 10) score += 5;
    
    return { ...food, score };
  });
  
  scoredFoods.sort((a, b) => b.score - a.score);
  
  const selectedFood = scoredFoods[0];
  return {
    name: selectedFood.name,
    items: selectedFood.items,
    cost: selectedFood.cost,
    calories: selectedFood.calories,
    protein: selectedFood.protein,
    carbs: selectedFood.carbs || 0,
    fats: selectedFood.fats || 0,
    time: selectedFood.time,
    timing: selectedFood.timing,
    idealTime: selectedFood.idealTime,
    score: selectedFood.score,
  };
}

export function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [weeklyStats, setWeeklyStats] = useState<any>(null);
  const [healthMetrics, setHealthMetrics] = useState<any>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [mealPlan, setMealPlan] = useState<any>({});
  const [showAlgorithmDetails, setShowAlgorithmDetails] = useState(false);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        // Check if profile exists (API or localStorage)
        let profileData = null;
        
        try {
          profileData = await apiService.getUserProfile();
        } catch (err) {
          // Try localStorage as fallback
          const localProfile = localStorage.getItem('nutriwise-profile');
          if (localProfile) {
            profileData = JSON.parse(localProfile);
          }
        }

        // If still no profile, redirect to setup
        if (!profileData) {
          setError('Please complete your health profile first');
          setTimeout(() => {
            navigate('/profile');
          }, 1500);
          return;
        }

        // Try to fetch dashboard data from API, but use mock data if it fails
        let dashData, statsData, healthData;
        
        try {
          [dashData, statsData, healthData] = await Promise.all([
            apiService.getDashboardData(),
            apiService.getWeeklyStats(),
            apiService.getHealthMetrics(),
          ]);
        } catch (err) {
          // API not available, use profile data directly
          console.warn('Dashboard API not available, using local profile');
          dashData = { userProfile: profileData };
          statsData = { weeklyData: [] };
          healthData = { metrics: {} };
        }

        setDashboardData(dashData);
        setWeeklyStats(statsData);
        setHealthMetrics(healthData);

        // Load notification preference
        const notifyPref = localStorage.getItem('nutriwise-notifications');
        setNotificationsEnabled(notifyPref !== 'false');

        // Generate or fetch meal plan
        const userProfileToUse = dashData?.userProfile || profileData;
        if (userProfileToUse) {
          // Transform localStorage profile format to match what generateMealPlan expects
          const mealPlanUserProfile = {
            diseases: userProfileToUse.medicalConditions || [],
            allergies: userProfileToUse.allergies || [],
            preferences: userProfileToUse.dietaryPreference ? [userProfileToUse.dietaryPreference] : [],
            preferredTags: ['high-protein', 'low-cost'],
            dislikedFoods: [],
            dailyBudget: userProfileToUse.budgetPerWeek ? Math.round(userProfileToUse.budgetPerWeek / 7) : 100,
          };
          const plan = generateMealPlan(mealPlanUserProfile, foodDatabase);
          setMealPlan(plan);
        }
      } catch (error: any) {
        setError(error.message || 'Failed to load dashboard data');
        console.error('Dashboard error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, navigate]);

  const toggleNotifications = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem('nutriwise-notifications', newValue.toString());
  };

  const scheduleNotification = (mealType: string, meal: any) => {
    if (!notificationsEnabled) {
      alert('Please enable notifications first!');
      return;
    }

    const notifications = JSON.parse(localStorage.getItem('nutriwise-meal-notifications') || '{}');
    notifications[mealType] = {
      name: meal.name,
      idealTime: meal.idealTime,
      timing: meal.timing,
      enabled: true,
    };
    localStorage.setItem('nutriwise-meal-notifications', JSON.stringify(notifications));

    alert(`✅ Notification set for ${mealType} at ${meal.idealTime}!`);
  };

  const scheduleAllNotifications = () => {
    if (!notificationsEnabled) {
      alert('Please enable notifications first!');
      return;
    }

    const notifications: any = {};
    Object.entries(mealPlan).forEach(([mealType, meal]: [string, any]) => {
      notifications[mealType] = {
        name: meal.name,
        idealTime: meal.idealTime,
        timing: meal.timing,
        enabled: true,
      };
    });
    localStorage.setItem('nutriwise-meal-notifications', JSON.stringify(notifications));

    alert('✅ Notifications set for all meals!');
  };

  const handleGenerateMealPlan = async () => {
    if (!dashboardData?.userProfile) return;

    setIsGenerating(true);
    try {
      const mealPlanUserProfile = {
        diseases: dashboardData.userProfile.medicalConditions || [],
        allergies: dashboardData.userProfile.allergies || [],
        preferences: dashboardData.userProfile.dietaryPreference ? [dashboardData.userProfile.dietaryPreference] : [],
        preferredTags: ['high-protein', 'low-cost'],
        dislikedFoods: [],
        dailyBudget: dashboardData.userProfile.budgetPerWeek ? Math.round(dashboardData.userProfile.budgetPerWeek / 7) : 100,
      };
      const newPlan = generateMealPlan(mealPlanUserProfile, foodDatabase);
      setMealPlan(newPlan);
    } catch (error) {
      console.error('Failed to generate meal plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateSingleMeal = (mealType: string) => {
    if (!dashboardData?.userProfile) return;

    const mealPlanUserProfile = {
      diseases: dashboardData.userProfile.medicalConditions || [],
      allergies: dashboardData.userProfile.allergies || [],
      preferences: dashboardData.userProfile.dietaryPreference ? [dashboardData.userProfile.dietaryPreference] : [],
      preferredTags: ['high-protein', 'low-cost'],
      dislikedFoods: [],
      dailyBudget: dashboardData.userProfile.budgetPerWeek ? Math.round(dashboardData.userProfile.budgetPerWeek / 7) : 100,
    };

    const currentName = mealPlan[mealType]?.name;
    const alternative = selectAlternativeMeal(mealType, currentName, mealPlanUserProfile, foodDatabase);

    if (alternative) {
      setMealPlan((prev: any) => ({
        ...prev,
        [mealType]: {
          name: alternative.name,
          items: alternative.items,
          cost: alternative.cost,
          calories: alternative.calories,
          protein: alternative.protein,
          carbs: alternative.carbs,
          fats: alternative.fats,
          time: alternative.time,
          timing: alternative.timing,
          idealTime: alternative.idealTime,
          score: alternative.score,
        },
      }));
    } else {
      console.warn(`No alternative meal found for ${mealType}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-green-500 mx-auto animate-spin mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    const isProfileMissing = error.includes('profile');
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
        <div className={`${isProfileMissing ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'} border rounded-lg p-8 max-w-md`}>
          <AlertTriangle className={`w-10 h-10 ${isProfileMissing ? 'text-blue-500' : 'text-red-500'} mx-auto mb-4`} />
          <h2 className={`text-xl font-bold ${isProfileMissing ? 'text-blue-800' : 'text-red-800'} mb-2`}>
            {isProfileMissing ? 'Complete Your Profile' : 'Error Loading Dashboard'}
          </h2>
          <p className={`${isProfileMissing ? 'text-blue-700' : 'text-red-700'} mb-6`}>{error}</p>
          <div className="flex gap-3">
            {isProfileMissing ? (
              <button
                onClick={() => navigate('/profile')}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
              >
                Complete Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
                >
                  Retry
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
                >
                  Go to Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // User info from dashboard data or auth context
  const userName = dashboardData?.userName || user?.username || 'Student';
  const currentUserProfile = dashboardData?.userProfile || {};
  const dailyStats = dashboardData?.dailyStats || {};
  const budgetInfo = dashboardData?.budgetInfo || { spent: 0, budget: 0 };

  // Memoized calculation for algorithm details 
  const filteredFoodsCount = useMemo(() => {
    return foodDatabase.filter((food) => {
      const conflictsWithDiseases = food.avoid.some((tag) => 
        (currentUserProfile.medicalConditions || []).includes(tag)
      );
      const conflictsWithAllergies = food.avoid.some((tag) => 
        (currentUserProfile.allergies || []).includes(tag)
      );
      const conflictsWithPreferences = food.avoid.some((tag) => 
        (currentUserProfile.dietaryPreference ? [currentUserProfile.dietaryPreference] : []).includes(tag)
      );
      return !conflictsWithDiseases && !conflictsWithAllergies && !conflictsWithPreferences;
    }).length;
  }, [currentUserProfile]);

  // Calculated values
  const totalCost = Object.values(mealPlan).reduce((sum: number, meal: any) => sum + (meal.cost || 0), 0);
  const totalCalories = Object.values(mealPlan).reduce((sum: number, meal: any) => sum + (meal.calories || 0), 0);
  const totalProtein = Object.values(mealPlan).reduce((sum: number, meal: any) => sum + (meal.protein || 0), 0);
  const totalCarbs = Object.values(mealPlan).reduce((sum: number, meal: any) => sum + (meal.carbs || 0), 0);
  const totalFat = Object.values(mealPlan).reduce((sum: number, meal: any) => sum + (meal.fats || 0), 0);

  const nutritionData = [
    { id: 'calories', name: 'Calories', value: totalCalories, color: '#34d399' },
    { id: 'protein', name: 'Protein', value: totalProtein, color: '#60a5fa' },
    { id: 'carbs', name: 'Carbs', value: totalCarbs, color: '#fbbf24' },
    { id: 'fats', name: 'Fats', value: totalFat, color: '#f97316' },
  ];

  const dailyBudget = budgetInfo.budget || 100;
  const budgetRemaining = dailyBudget - totalCost;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Username */}
        <div className="mb-8">
          {userName && (
            <div className="mb-3 text-lg flex items-center justify-between">
              <div>
                <span className="text-gray-600">Heyyy!! </span>
                <span className="font-bold text-green-600 text-xl">{userName}</span>
                <span className="text-gray-600"> 👋</span>
              </div>
              <button
                onClick={toggleNotifications}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  notificationsEnabled
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={notificationsEnabled ? 'Disable meal notifications' : 'Enable meal notifications'}
              >
                {notificationsEnabled ? (
                  <>
                    <Bell className="w-5 h-5" />
                    <span className="text-sm font-medium">Notifications On</span>
                  </>
                ) : (
                  <>
                    <BellOff className="w-5 h-5" />
                    <span className="text-sm font-medium">Notifications Off</span>
                  </>
                )}
              </button>
            </div>
          )}
          <h1 className="text-4xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-gray-600">Here's your personalized meal plan for today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <DollarSign className="w-8 h-8 mb-3 opacity-90" />
            <div className="text-3xl font-bold mb-1">₹{totalCost}</div>
            <div className="text-green-100">Today's Cost</div>
            <div className="mt-2 text-sm">Budget: ₹{dailyBudget}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <TrendingDown className="w-8 h-8 mb-3 text-green-600" />
            <div className="text-3xl font-bold mb-1">₹{budgetRemaining}</div>
            <div className="text-gray-600">Remaining</div>
            <div className="mt-2 text-sm text-green-600">Under budget!</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <Flame className="w-8 h-8 mb-3 text-orange-600" />
            <div className="text-3xl font-bold mb-1">{totalCalories}</div>
            <div className="text-gray-600">Calories</div>
            <div className="mt-2 text-sm text-gray-500">Target: 2000</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <Apple className="w-8 h-8 mb-3 text-red-600" />
            <div className="text-3xl font-bold mb-1">{totalProtein}g</div>
            <div className="text-gray-600">Protein</div>
            <div className="mt-2 text-sm text-gray-500">Target: 60g</div>
          </div>
        </div>

        {/* Algorithm Info Banner */}
        {isGenerating && (
          <div className="mb-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <div>
                <h3 className="font-bold text-lg mb-1">Generating Personalized Meal Plan...</h3>
                <p className="text-sm text-blue-100">
                  Applying health filters and optimizing for your preferences
                </p>
              </div>
            </div>
          </div>
        )}

        {!isGenerating && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-green-600" />
                  Smart Meal Planner Active
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Your meal plan is optimized based on:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200 flex items-center space-x-1">
                    <Heart className="w-3 h-3 text-red-500" />
                    <span>Diabetes-friendly</span>
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200 flex items-center space-x-1">
                    <Leaf className="w-3 h-3 text-green-500" />
                    <span>Vegetarian</span>
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200 flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-orange-500" />
                    <span>High Protein</span>
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200 flex items-center space-x-1">
                    <DollarSign className="w-3 h-3 text-green-600" />
                    <span>Budget ₹100/day</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleGenerateMealPlan}
                  className="flex items-center space-x-2 px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Regenerate</span>
                </button>
                <button
                  onClick={() => setShowAlgorithmDetails(!showAlgorithmDetails)}
                  className="text-xs text-green-700 hover:text-green-800 font-medium underline"
                >
                  {showAlgorithmDetails ? 'Hide' : 'View'} Algorithm Details
                </button>
              </div>
            </div>
            
            {/* Algorithm Details Expandable Section */}
            {showAlgorithmDetails && (
              <div className="mt-6 pt-6 border-t border-green-200">
                <h4 className="font-bold text-gray-800 mb-4">🔬 Algorithm Process</h4>
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800 mb-1">Collect Inputs</h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Gathered your profile: Budget (₹100/day), Diseases (Diabetes), Preferences (Vegetarian), Priority Tags (High Protein, Low Cost)
                      </p>
                      <div className="bg-blue-50 rounded-lg p-3 text-xs text-gray-700">
                        ✓ User profile loaded successfully
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800 mb-1">Apply Health Filtering</h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Filtered {foodDatabase.length} foods → {filteredFoodsCount} safe foods
                      </p>
                      <div className="bg-purple-50 rounded-lg p-3 text-xs space-y-1">
                        <div className="text-gray-700">✓ Removed: Foods conflicting with {currentUserProfile.medicalConditions?.length ? currentUserProfile.medicalConditions[0] : 'diseases'}</div>
                        <div className="text-gray-700">✓ Removed: Foods with allergies</div>
                        <div className="text-gray-700">✓ Kept: {currentUserProfile.dietaryPreference || 'Healthy'} options</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800 mb-1">Score Food Items</h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Ranked foods based on preferences, cost, and nutritional value
                      </p>
                      <div className="bg-orange-50 rounded-lg p-3 text-xs space-y-1">
                        <div className="text-gray-700">• Preferred tags (high-protein, low-cost): +30 pts each</div>
                        <div className="text-gray-700">• Cost efficiency (≤₹25): +25 pts</div>
                        <div className="text-gray-700">• High protein (≥20g): +25 pts</div>
                        <div className="text-gray-700">• Diabetes-friendly: +30 pts bonus</div>
                        <div className="text-gray-700">• Value for money: +5-10 pts</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800 mb-1">Generate Meal Plan</h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Selected highest-scoring foods for each meal category within budget allocation
                      </p>
                      <div className="bg-green-50 rounded-lg p-3 text-xs space-y-1">
                        <div className="flex justify-between text-gray-700">
                          <span>• Breakfast (20% budget):</span>
                          <span className="font-semibold">₹{mealPlan.breakfast?.cost || 20}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>• Lunch (35% budget):</span>
                          <span className="font-semibold">₹{mealPlan.lunch?.cost || 40}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>• Snack (15% budget):</span>
                          <span className="font-semibold">₹{mealPlan.snack?.cost || 10}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>• Dinner (30% budget):</span>
                          <span className="font-semibold">₹{mealPlan.dinner?.cost || 30}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 font-bold pt-2 border-t border-green-200">
                          <span>Total:</span>
                          <span className="text-green-600">₹{totalCost}/₹{dailyBudget}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Result:</strong> Your meal plan maximizes nutrition while staying within budget, respecting all dietary restrictions, and prioritizing your food preferences.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Meal Plan */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Today's Meal Plan</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={scheduleAllNotifications}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  title="Set notifications for all meals"
                >
                  <Bell className="w-4 h-4" />
                  <span className="text-sm font-medium">Notify All</span>
                </button>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all">
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                  onClick={handleGenerateMealPlan}
                >
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Meal Cards */}
            <div className="space-y-4">
              {Object.entries(mealPlan).map(([mealType, meal]) => (
                <div
                  key={mealType}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wide text-green-600 font-semibold mb-1">
                        {mealType}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{meal.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-blue-600">{meal.idealTime}</span>
                        <span className="text-gray-400">•</span>
                        <span>{meal.timing}</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end space-y-2">
                      <div>
                        <div className="text-2xl font-bold text-green-600">₹{meal.cost}</div>
                        <div className="text-sm text-gray-500">Cook: {meal.time}</div>
                      </div>
                      <button
                        onClick={() => handleRegenerateSingleMeal(mealType)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all text-sm font-medium"
                        title="Get another recipe"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Change</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {meal.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span>{meal.calories} cal</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Apple className="w-4 h-4 text-red-500" />
                        <span>{meal.protein}g protein</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => scheduleNotification(mealType, meal)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all text-sm font-medium"
                        title="Set notification for this meal"
                      >
                        <Bell className="w-4 h-4" />
                        <span>Notify</span>
                      </button>
                      <Link
                        to="/recipes"
                        className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium"
                      >
                        <ChefHat className="w-4 h-4" />
                        <span>Recipe</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <Link
                  to="/recipes"
                  className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <ChefHat className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Find Recipes</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </Link>
                <Link
                  to="/comparison"
                  className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Compare Costs</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>

          {/* Analytics Sidebar */}
          <div className="space-y-5">

            {/* Macro Breakdown Chart */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Today's Macros</h3>
              <div className="space-y-3">
                {[
                  { label: 'Calories', value: totalCalories, max: 2000, color: '#34d399', unit: 'kcal' },
                  { label: 'Protein',  value: totalProtein,  max: 60,   color: '#60a5fa', unit: 'g' },
                  { label: 'Carbs',    value: totalCarbs,    max: 250,  color: '#fbbf24', unit: 'g' },
                  { label: 'Fats',     value: totalFat,      max: 65,   color: '#f97316', unit: 'g' },
                ].map(item => {
                  const pct = Math.min(100, Math.round((item.value / item.max) * 100));
                  return (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                          {item.label}
                        </span>
                        <span className="font-semibold text-gray-800">
                          {item.value}{item.unit} <span className="text-gray-400 font-normal">/ {item.max}</span>
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                      </div>
                      <div className="text-right text-xs text-gray-400 mt-0.5">{pct}%</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Budget Ring */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Budget Usage</h3>
              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <svg width="90" height="90" viewBox="0 0 90 90">
                    <circle cx="45" cy="45" r="36" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle cx="45" cy="45" r="36" fill="none" stroke="#34d399" strokeWidth="10"
                      strokeDasharray={`${Math.min(100, Math.round((totalCost / dailyBudget) * 100)) * 2.26} 226`}
                      strokeLinecap="round"
                      transform="rotate(-90 45 45)" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-gray-800">
                      {Math.min(100, Math.round((totalCost / dailyBudget) * 100))}%
                    </span>
                  </div>
                </div>
                <div className="flex-1 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Spent</span><span className="font-bold text-gray-800">₹{totalCost}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Budget</span><span className="font-bold text-gray-800">₹{dailyBudget}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Remaining</span><span className="font-bold text-green-600">₹{Math.max(0, budgetRemaining)}</span></div>
                </div>
              </div>
            </div>

            {/* Meal Status */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3">Today's Meals</h3>
              <div className="grid grid-cols-2 gap-3">
                {['breakfast', 'lunch', 'snack', 'dinner'].map(type => {
                  const has = !!mealPlan[type];
                  return (
                    <div key={type} className={`flex items-center gap-2 p-2.5 rounded-xl text-sm font-medium ${
                      has ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                    }`}>
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${has ? 'bg-green-500' : 'bg-gray-300'}`} />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tip Card */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-5 text-white shadow-lg">
              <h3 className="font-bold mb-2">💡 Today's Tip</h3>
              <p className="text-sm text-blue-100 mb-3">
                Prep your meals in advance on Sundays — it saves time and keeps you on budget all week!
              </p>
              <Link to="/tips" className="inline-flex items-center text-sm font-medium hover:underline">
                More nutrition tips <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
