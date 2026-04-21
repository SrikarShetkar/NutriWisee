import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, DollarSign, Activity, ArrowRight, Check, Heart, AlertTriangle, Apple, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '../components/ui/badge';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    age: '',
    gender: '',
    height: '',
    weight: '',

    // Step 2: Activity Level
    activityLevel: '',

    // Step 3: Budget
    budgetType: 'daily',
    budget: '',

    // Step 4: Dietary Preferences
    dietaryPreference: '',
    customDiet: '',

    // Step 5: Allergies & Intolerances
    allergies: [] as string[],
    customAllergy: '',

    // Step 6: Health Conditions
    healthConditions: [] as string[],
    customCondition: '',
    medications: '',

    // Step 7: Goals
    goals: [] as string[],
    targetWeight: '',

    // Meal Times (added for notifications)
    breakfastTime: '08:00',
    lunchTime: '13:00',
    dinnerTime: '20:00',
  });

  useEffect(() => {
    // Load existing profile if available
    const loadProfile = async () => {
      try {
        const profile = await apiService.getUserProfile();
        if (profile) {
          setFormData(prev => ({ ...prev, ...profile }));
        }
      } catch (error) {
        // Profile doesn't exist yet, that's fine
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Convert budget based on type
      const budgetPerWeek = formData.budgetType === 'daily'
        ? parseFloat(formData.budget) * 7
        : parseFloat(formData.budget);

      const profileData = {
        age: parseInt(formData.age),
        gender: formData.gender,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        activityLevel: formData.activityLevel,
        dietaryRestrictions: formData.dietaryPreference,
        allergies: formData.allergies.join(', '),
        budgetPerWeek: budgetPerWeek,
        healthGoals: formData.goals.join(', '),
        medicalConditions: formData.healthConditions.join(', '),
        preferredCuisines: formData.customDiet,
        step: step,
      };

      await apiService.createOrUpdateProfile(profileData);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: keyof typeof formData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleCustomAdd = (field: keyof typeof formData, customField: string) => {
    const customValue = formData[customField as keyof typeof formData] as string;
    if (customValue.trim()) {
      const currentArray = formData[field] as string[];
      const newArray = [...currentArray, customValue.trim()];
      setFormData(prev => ({
        ...prev,
        [field]: newArray,
        [customField]: ''
      }));
    }
  };

  const nextStep = () => {
    if (step < 7) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <User className="mx-auto h-12 w-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-600 mt-2">Let's start with your basic details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter height in cm"
                  min="50"
                  max="250"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter weight in kg"
                  min="20"
                  max="300"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Activity className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Activity Level</h2>
              <p className="text-gray-600 mt-2">How active are you on a daily basis?</p>
            </div>

            <div className="space-y-3">
              {[
                { value: 'sedentary', label: 'Sedentary (little or no exercise)', desc: 'Desk job, little physical activity' },
                { value: 'lightly-active', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
                { value: 'moderately-active', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
                { value: 'very-active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
                { value: 'extremely-active', label: 'Extremely Active', desc: 'Very hard exercise, physical job' }
              ].map((activity) => (
                <div
                  key={activity.value}
                  onClick={() => handleInputChange('activityLevel', activity.value)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.activityLevel === activity.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{activity.label}</div>
                  <div className="text-sm text-gray-600">{activity.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <DollarSign className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Budget</h2>
              <p className="text-gray-600 mt-2">What's your weekly food budget?</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="budgetType"
                    value="daily"
                    checked={formData.budgetType === 'daily'}
                    onChange={(e) => handleInputChange('budgetType', e.target.value)}
                    className="mr-2"
                  />
                  Daily
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="budgetType"
                    value="weekly"
                    checked={formData.budgetType === 'weekly'}
                    onChange={(e) => handleInputChange('budgetType', e.target.value)}
                    className="mr-2"
                  />
                  Weekly
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.budgetType === 'daily' ? 'Daily Budget ($)' : 'Weekly Budget ($)'}
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Apple className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Dietary Preferences</h2>
              <p className="text-gray-600 mt-2">Do you follow any specific diet?</p>
            </div>

            <div className="space-y-3">
              {[
                'None',
                'Vegetarian',
                'Vegan',
                'Pescatarian',
                'Keto',
                'Paleo',
                'Mediterranean',
                'Low-carb',
                'Gluten-free',
                'Halal',
                'Kosher'
              ].map((diet) => (
                <div
                  key={diet}
                  onClick={() => handleInputChange('dietaryPreference', diet)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.dietaryPreference === diet
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {diet}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Other (specify)</label>
              <input
                type="text"
                value={formData.customDiet}
                onChange={(e) => handleInputChange('customDiet', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter custom diet"
              />
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Allergies & Intolerances</h2>
              <p className="text-gray-600 mt-2">Any food allergies or intolerances?</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Peanuts',
                'Tree Nuts',
                'Milk',
                'Eggs',
                'Fish',
                'Shellfish',
                'Soy',
                'Wheat',
                'Gluten',
                'Sesame',
                'Sulfites'
              ].map((allergy) => (
                <div
                  key={allergy}
                  onClick={() => handleArrayToggle('allergies', allergy)}
                  className={`p-3 border rounded-lg cursor-pointer text-center transition-colors ${
                    formData.allergies.includes(allergy)
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {allergy}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={formData.customAllergy}
                onChange={(e) => handleInputChange('customAllergy', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Other allergy"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomAdd('allergies', 'customAllergy')}
              />
              <button
                type="button"
                onClick={() => handleCustomAdd('allergies', 'customAllergy')}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            {formData.allergies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.allergies.map((allergy) => (
                  <Badge key={allergy} variant="destructive">
                    {allergy}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Heart className="mx-auto h-12 w-12 text-pink-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Health Conditions</h2>
              <p className="text-gray-600 mt-2">Any medical conditions we should know about?</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Diabetes',
                'Hypertension',
                'Heart Disease',
                'Kidney Disease',
                'Liver Disease',
                'Thyroid Issues',
                'Anemia',
                'Osteoporosis',
                'Arthritis',
                'Cancer',
                'Pregnancy'
              ].map((condition) => (
                <div
                  key={condition}
                  onClick={() => handleArrayToggle('healthConditions', condition)}
                  className={`p-3 border rounded-lg cursor-pointer text-center transition-colors ${
                    formData.healthConditions.includes(condition)
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {condition}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={formData.customCondition}
                onChange={(e) => handleInputChange('customCondition', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Other condition"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomAdd('healthConditions', 'customCondition')}
              />
              <button
                type="button"
                onClick={() => handleCustomAdd('healthConditions', 'customCondition')}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            {formData.healthConditions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.healthConditions.map((condition) => (
                  <Badge key={condition} variant="secondary">
                    {condition}
                  </Badge>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
              <textarea
                value={formData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="List any medications you're currently taking"
                rows={3}
              />
            </div>
          </motion.div>
        );

      case 7:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Target className="mx-auto h-12 w-12 text-purple-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Goals</h2>
              <p className="text-gray-600 mt-2">What are your nutrition and health goals?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Weight Loss',
                'Weight Gain',
                'Maintain Weight',
                'Build Muscle',
                'Improve Energy',
                'Better Sleep',
                'Reduce Inflammation',
                'Lower Cholesterol',
                'Control Blood Sugar',
                'Improve Digestion',
                'Increase Immunity'
              ].map((goal) => (
                <div
                  key={goal}
                  onClick={() => handleArrayToggle('goals', goal)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.goals.includes(goal)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {goal}
                </div>
              ))}
            </div>

            {formData.goals.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.goals.map((goal) => (
                  <Badge key={goal} variant="outline">
                    {goal}
                  </Badge>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Weight (kg) - Optional</label>
              <input
                type="number"
                value={formData.targetWeight}
                onChange={(e) => handleInputChange('targetWeight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter target weight"
                min="20"
                max="300"
              />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Create Your Health Profile</h1>
          <p className="text-gray-600">Help us personalize your meal plans for optimal health</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div key={s} className="flex items-center flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all font-semibold ${
                  step >= s
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 7 && (
                <div
                  className={`w-8 h-1 mx-1 transition-all ${
                    step > s ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Form Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}

              {step < 7 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="ml-auto px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <span>Complete Profile</span>
                      <Check className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Step {step} of 7 - {Math.round((step / 7) * 100)}% Complete
        </div>
      </div>
    </div>
  );
}
