# NutriWise Health Profile System

## Overview
NutriWise now features a comprehensive health profile system with login authentication and detailed health information collection to provide accurate, personalized meal plans.

## Login System

### Features
- **Sign Up / Sign In** - Full authentication flow
- **Email & Password** - Secure login credentials
- **Social Login** - Google & Facebook integration (UI ready)
- **Remember Me** - Persistent login sessions
- **Password Reset** - Forgot password functionality

### User Data Storage
User credentials and session data are stored in `localStorage`:
```javascript
localStorage.getItem('nutriwise-user')
// Contains: { name, email, isLoggedIn, loginDate }
```

## 7-Step Health Profile Creation

### Step 1: Personal Information
Collects basic demographics for BMI and calorie calculations:
- **Age** - For metabolism calculations
- **Gender** - Affects nutritional requirements
- **Height (cm)** - BMI calculation
- **Weight (kg)** - BMI and calorie needs
- **Auto-calculated BMI** - Shows health status

### Step 2: Activity Level
Essential for determining daily caloric needs:
- Sedentary - Desk job, little exercise
- Lightly Active - 1-3 days/week exercise
- Moderately Active - 3-5 days/week exercise
- Very Active - 6-7 days/week hard exercise
- Extra Active - Intense exercise + physical job

### Step 3: Budget
Critical for meal plan affordability:
- **Budget Type** - Daily or Monthly
- **Budget Amount** - In ₹ (Indian Rupees)
- **Auto-conversion** - Shows equivalent daily/monthly amounts
- **Budget Tips** - Average student spending guidance

### Step 4: Dietary Preferences
Filters meal recommendations based on diet:
- No Restrictions 🍽️
- Vegetarian 🥗
- Vegan 🌱
- Pescatarian 🐟
- Eggetarian 🥚
- Jain 🙏
- Halal ☪️
- Kosher ✡️
- **Custom Notes** - Additional dietary preferences

### Step 5: Allergies & Intolerances ⚠️
**Critical for safety** - Excludes dangerous foods:

**Common Allergies:**
- Peanuts 🥜
- Tree Nuts 🌰
- Milk/Dairy 🥛
- Eggs 🥚
- Wheat/Gluten 🌾
- Soy 🫘
- Fish 🐟
- Shellfish 🦐
- Sesame 🫘

**Custom Field** - For rare allergies and intolerances

### Step 6: Health Conditions 💙
**Recommends supportive foods and avoids harmful ones:**

**Tracked Conditions:**
- Diabetes (Type 1 & 2) 💉🩺
- High Blood Pressure ❤️
- High Cholesterol 🫀
- Heart Disease 💔
- Kidney Disease 🫘
- Thyroid Issues 🦋
- PCOS 🩺
- IBS 🫃
- Celiac Disease 🌾
- Anemia 🩸
- Acid Reflux/GERD 🔥

**Additional Fields:**
- Custom health conditions
- Current medications (for interaction awareness)

### Step 7: Health Goals 🎯
Tailors meal plans to achieve objectives:

**Available Goals:**
- Weight Loss 📉
- Weight Gain 📈
- Muscle Building 💪
- Maintain Weight ⚖️
- Better Energy ⚡
- Improve Digestion 🫃
- Better Skin ✨
- Boost Immunity 🛡️
- Study Performance 🎓
- Better Sleep 😴

**Target Weight** - Optional field for weight goals

## Data Storage

All profile data is stored locally:
```javascript
localStorage.getItem('nutriwise-profile')
```

### Profile Data Structure:
```javascript
{
  // Personal Info
  age: string,
  gender: string,
  height: string,
  weight: string,
  
  // Activity & Budget
  activityLevel: string,
  budgetType: string,
  budget: string,
  
  // Dietary Preferences
  dietaryPreference: string,
  customDiet: string,
  
  // Allergies
  allergies: string[],
  customAllergy: string,
  
  // Health Conditions
  healthConditions: string[],
  customCondition: string,
  medications: string,
  
  // Goals
  goals: string[],
  targetWeight: string
}
```

## How Data is Used

### 1. Meal Plan Generation (Dashboard)
- **Budget filtering** - Shows only affordable foods
- **Allergy filtering** - Excludes allergens completely
- **Disease filtering** - Avoids foods harmful to conditions
- **Dietary filtering** - Respects food preferences
- **Calorie calculation** - Based on age, gender, weight, activity

### 2. Recipe Recommendations
- Filters by dietary preferences
- Excludes allergenic ingredients
- Considers budget constraints
- Shows diabetes-friendly, heart-healthy options

### 3. Food Analyzer
- Compares foods against health conditions
- Highlights allergen warnings
- Shows nutritional impact on goals

### 4. Health Guide
- Displays disease-specific food recommendations
- Shows foods to avoid for conditions
- Provides personalized dietary precautions

### 5. Vitamin Sources
- Recommends vitamins based on health conditions
- Considers dietary restrictions
- Suggests affordable vitamin-rich foods

## Security & Privacy

- **Local Storage Only** - No backend/server storage
- **Client-Side** - All processing in browser
- **No External Sharing** - Data never leaves device
- **User Control** - Can clear/update anytime

## Update Profile Anytime

Users can update their profile by:
1. Going to `/profile` page
2. Modifying any step
3. Changes immediately reflected in meal plans

## Progressive Disclosure

The 7-step process prevents overwhelming users:
- **Progress Indicator** - Shows X of 7 completion
- **Step Navigation** - Previous/Next buttons
- **Visual Progress Bar** - Green indicators for completed steps
- **Skip Options** - Optional fields clearly marked

## Mobile Responsive

All profile forms are fully responsive:
- Touch-friendly buttons
- Large tap targets for conditions/allergies
- Scroll-friendly long lists
- Optimized for small screens

## Future Enhancements

Potential additions:
- Backend authentication (Supabase)
- Profile sync across devices
- Health data analytics
- Meal plan history
- Progress tracking
- Nutritionist consultation integration
