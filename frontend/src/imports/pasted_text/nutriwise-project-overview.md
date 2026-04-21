You are an experienced software architect, product designer, and full-stack mentor.
Help us design and build a student project called **NutriWise**. First understand the full project description below and then assist in planning and building the system step-by-step.

---

PROJECT TITLE
NutriWise – Budget-Based Smart Meal Planning System

---

PROJECT OVERVIEW

NutriWise is a web-based platform designed to help college students plan **healthy and affordable meals** within a limited budget.

Many hostel and college students rely on junk food because healthy eating seems expensive or difficult to manage. NutriWise solves this by combining:

• Nutrition awareness
• Budget optimization
• Smart meal planning
• Recipe assistance

The system recommends **balanced meals within the user’s budget** and also shows **how to cook them using simple recipes**.

---

TARGET USERS

• College students
• Hostel students
• Budget-conscious individuals
• Beginners learning basic cooking

---

CORE PROBLEM

Students typically face these challenges:

1. Limited food budget
2. Lack of knowledge about balanced nutrition
3. Easy access to unhealthy junk food
4. Lack of simple cooking knowledge

Most existing nutrition apps focus only on calories or fitness goals and **do not consider affordability for students**.

---

SOLUTION

NutriWise provides a smart system that:

• Accepts a student’s food budget
• Calculates nutritional needs
• Generates affordable meal plans
• Suggests simple recipes
• Compares healthy meals with junk food
• Encourages healthy and economical eating

---

CORE FEATURES

1. USER PROFILE

Users enter:

• Age
• Gender
• Height
• Weight
• Activity level
• Monthly food budget

This data helps estimate nutritional requirements.

---

2. BUDGET INPUT SYSTEM

Users can enter:

• Monthly food budget
OR
• Daily food budget

Example:

Monthly Budget = ₹3000
Daily Budget ≈ ₹100

---

3. NUTRITION REQUIREMENT CALCULATION

The system estimates nutritional requirements such as:

• Daily calories
• Protein
• Carbohydrates
• Fats

This is calculated using standard nutrition formulas.

---

4. FOOD DATABASE

The system maintains a dataset of affordable foods commonly available for students.

Example categories:

Grains
• Rice
• Roti

Protein Sources
• Eggs
• Dal
• Chickpeas

Vegetables
• Spinach
• Carrot
• Tomato

Fruits
• Banana
• Apple

Dairy
• Milk
• Curd

Each food item stores:

• Price
• Calories
• Protein
• Carbohydrates
• Fats

---

5. SMART MEAL PLAN GENERATOR

Based on:

• User nutrition requirement
• User budget

The system generates a daily meal plan including:

• Breakfast
• Lunch
• Dinner
• Snacks

Example output:

Breakfast
Banana + Milk

Lunch
Rice + Dal + Vegetable

Snack
Peanuts

Dinner
Roti + Egg Curry

---

6. BUDGET OPTIMIZATION

The algorithm ensures:

Total meal cost ≤ user budget.

If a meal exceeds budget, the system replaces items with cheaper alternatives while maintaining nutritional balance.

---

7. HEALTHY VS JUNK FOOD COMPARISON

The system compares common junk food with healthy alternatives.

Example:

Junk food meal
Burger + Fries = ₹120

NutriWise healthy meal
Rice + Dal + Vegetable = ₹55

Comparison metrics:

• Cost
• Calories
• Protein content
• Nutrition quality

---

8. SMART RECIPE FINDER

Students may not know how to cook suggested meals.
The Smart Recipe Finder converts ingredients into simple recipes.

Recipe search methods:

1. Ingredient-Based Search
   User enters ingredients they already have.

Example input
Rice + Egg + Onion

System suggests recipes like
• Egg Fried Rice
• Egg Rice Bowl

2. Budget-Based Recipes
   User enters budget and receives recipes within that cost.

Example
Budget = ₹40

Suggested recipes:

• Vegetable Upma
• Egg Bhurji + Roti

3. Meal Plan Integration
   When NutriWise generates a meal plan, users can click:

"View Recipe"

to see cooking instructions.

---

RECIPE INFORMATION DISPLAYED

Each recipe includes:

• Ingredient list
• Estimated cost
• Cooking time
• Step-by-step instructions
• Nutrition estimate

Example recipe:

Recipe Name
Egg Fried Rice

Estimated Cost
₹35

Cooking Time
10 minutes

Ingredients
Rice
Egg
Onion
Oil
Salt

Steps

1. Heat oil in pan
2. Add chopped onion
3. Add egg and scramble
4. Add cooked rice
5. Mix and add salt

Nutrition
Calories: 350 kcal
Protein: 12g

---

9. DASHBOARD

The user dashboard shows:

• Daily budget
• Meal plan suggestions
• Nutrition summary
• Cost breakdown
• Remaining budget
• Healthy vs junk comparison

---

10. SEASONAL FOOD SUGGESTIONS (OPTIONAL)

Suggest cheaper seasonal fruits and vegetables to reduce cost and increase nutrition.

---

11. NUTRITION EDUCATION SECTION

Short educational tips such as:

• Importance of protein
• Balanced diet basics
• Healthy hostel eating tips
• Budget grocery planning

---

FRONTEND PAGES

1. Landing Page
   Project introduction and purpose

2. User Profile Page
   User enters personal details

3. Budget Input Page
   User enters monthly or daily budget

4. Dashboard
   Shows meal plan, nutrition stats, and budget usage

5. Meal Planner Page
   Displays generated meal plan

6. Smart Recipe Finder Page
   Users search and view recipes

7. Healthy vs Junk Comparison Page
   Visual comparison of food choices

8. Nutrition Tips Page
   Educational content

---

SUGGESTED TECH STACK

Frontend
React.js
Tailwind CSS

Backend
Python Flask or Node.js

Database
Firebase / MongoDB / SQLite

Food dataset
Stored as JSON with nutrition + price values.

---

SIMPLE ALGORITHM LOGIC

Step 1
User inputs profile and budget

Step 2
System calculates nutritional requirement

Step 3
Food items are selected from database

Step 4
Meal combinations are generated

Step 5
System checks total cost

If cost > budget
replace expensive foods with cheaper alternatives.

Step 6
Generate final optimized meal plan

Step 7
Attach recipes using Smart Recipe Finder.

---

EXPECTED OUTPUT EXAMPLE

User Input
Daily Budget = ₹100

Generated Plan

Breakfast
Banana + Milk (₹20)

Lunch
Rice + Dal + Spinach (₹40)

Snack
Peanuts (₹10)

Dinner
Roti + Egg Curry (₹30)

Total Cost
₹100

---

PROJECT IMPACT

• Promotes healthy eating among students
• Reduces dependency on junk food
• Helps manage food expenses
• Teaches basic cooking skills
• Creates nutrition awareness

---

WHAT I WANT FROM YOU

Help me build this project step-by-step.

Guide me with:

1. System architecture
2. Database schema
3. Frontend UI design
4. Backend API structure
5. Meal planning algorithm
6. Recipe matching logic
7. Full implementation strategy

Explain everything clearly and help implement NutriWise like a real product.