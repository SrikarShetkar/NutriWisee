import db from '../config/database.js';

// Admin middleware to check if user is admin
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Get all users (admin only)
export const getAllUsers = (req, res) => {
  db.all('SELECT id, username, email, role, createdAt FROM users ORDER BY createdAt DESC', [], (err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ users });
  });
};

// Update user role (admin only)
export const updateUserRole = (req, res) => {
  const { userId, role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  db.run('UPDATE users SET role = ? WHERE id = ?', [role, userId], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User role updated successfully' });
  });
};

// Delete user (admin only)
export const deleteUser = (req, res) => {
  const { userId } = req.params;

  db.run('DELETE FROM users WHERE id = ?', [userId], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  });
};

// Create food item (admin only)
export const createFood = (req, res) => {
  const {
    name,
    category,
    calories,
    protein,
    carbs,
    fats,
    fiber,
    vitamins,
    minerals,
    price,
    storageLife,
    prepTime,
    healthBenefits,
    source
  } = req.body;

  db.run(`
    INSERT INTO foods (name, category, calories, protein, carbs, fats, fiber, vitamins, minerals, price, storageLife, prepTime, healthBenefits, source)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [name, category, calories, protein, carbs, fats, fiber, vitamins, minerals, price, storageLife, prepTime, healthBenefits, source], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({
      message: 'Food item created successfully',
      foodId: this.lastID
    });
  });
};

// Update food item (admin only)
export const updateFood = (req, res) => {
  const { id } = req.params;
  const {
    name,
    category,
    calories,
    protein,
    carbs,
    fats,
    fiber,
    vitamins,
    minerals,
    price,
    storageLife,
    prepTime,
    healthBenefits,
    source
  } = req.body;

  db.run(`
    UPDATE foods SET
      name = ?, category = ?, calories = ?, protein = ?, carbs = ?, fats = ?,
      fiber = ?, vitamins = ?, minerals = ?, price = ?, storageLife = ?,
      prepTime = ?, healthBenefits = ?, source = ?
    WHERE id = ?
  `, [name, category, calories, protein, carbs, fats, fiber, vitamins, minerals, price, storageLife, prepTime, healthBenefits, source, id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.json({ message: 'Food item updated successfully' });
  });
};

// Delete food item (admin only)
export const deleteFood = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM foods WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.json({ message: 'Food item deleted successfully' });
  });
};

// Get all foods with pagination (admin only)
export const getAllFoodsAdmin = (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const offset = (page - 1) * limit;
  db.all('SELECT * FROM foods ORDER BY id DESC LIMIT ? OFFSET ?', [limit, offset], (err, foods) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ foods, page: parseInt(page), limit: parseInt(limit) });
  });
};

// ─── Recipe CRUD ────────────────────────────────────────────────

export const getAllRecipesAdmin = (req, res) => {
  db.all('SELECT * FROM recipes ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ recipes: rows });
  });
};

export const createRecipe = (req, res) => {
  const { userId } = req.user;
  const { name, category, cost, time, calories, protein, difficulty, ingredients, steps, tips, image, videoLink, videoChannel } = req.body;
  if (!name) return res.status(400).json({ error: 'Recipe name is required' });

  const ing = Array.isArray(ingredients) ? JSON.stringify(ingredients) : (ingredients || '[]');
  const st  = Array.isArray(steps) ? JSON.stringify(steps) : (steps || '[]');
  const tp  = Array.isArray(tips) ? JSON.stringify(tips) : (tips || '[]');

  db.run(
    `INSERT INTO recipes (name, category, cost, time, calories, protein, difficulty, ingredients, steps, tips, image, videoLink, videoChannel, createdBy)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, category || 'Main Course', cost || 0, time || 30, calories || 300, protein || 10,
     difficulty || 'Easy', ing, st, tp, image || '', videoLink || '', videoChannel || '', userId],
    function(err) {
      if (err) { console.error(err); return res.status(500).json({ error: 'Failed to create recipe: ' + err.message }); }
      res.status(201).json({ message: 'Recipe created', id: this.lastID });
    }
  );
};

export const updateRecipe = (req, res) => {
  const { id } = req.params;
  const { name, category, cost, time, calories, protein, difficulty, ingredients, steps, tips, image, videoLink, videoChannel } = req.body;
  const ing = Array.isArray(ingredients) ? JSON.stringify(ingredients) : (ingredients || '[]');
  const st  = Array.isArray(steps) ? JSON.stringify(steps) : (steps || '[]');
  const tp  = Array.isArray(tips) ? JSON.stringify(tips) : (tips || '[]');

  db.run(
    `UPDATE recipes SET name=?, category=?, cost=?, time=?, calories=?, protein=?, difficulty=?,
     ingredients=?, steps=?, tips=?, image=?, videoLink=?, videoChannel=?, updatedAt=CURRENT_TIMESTAMP WHERE id=?`,
    [name, category, cost, time, calories, protein, difficulty, ing, st, tp, image, videoLink, videoChannel, id],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to update recipe' });
      if (this.changes === 0) return res.status(404).json({ error: 'Recipe not found' });
      res.json({ message: 'Recipe updated' });
    }
  );
};

export const deleteRecipe = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM recipes WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'Failed to delete recipe' });
    if (this.changes === 0) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
  });
};

// ─── Seasonal Foods Management ──────────────────────────────────

export const getSeasonalFoods = (req, res) => {
  db.all('SELECT * FROM seasonal_foods ORDER BY season DESC', [], (err, foods) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ foods: foods || [] });
  });
};

export const createSeasonalFood = (req, res) => {
  const { foodName, season, benefits, tips, image } = req.body;
  if (!foodName || !season) return res.status(400).json({ error: 'Food name and season are required' });

  db.run(
    `INSERT INTO seasonal_foods (foodName, season, benefits, tips, image, createdAt)
     VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [foodName, season, benefits || '', tips || '', image || ''],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to create seasonal food' });
      res.status(201).json({ message: 'Seasonal food created', id: this.lastID });
    }
  );
};

export const updateSeasonalFood = (req, res) => {
  const { id } = req.params;
  const { foodName, season, benefits, tips, image } = req.body;

  db.run(
    `UPDATE seasonal_foods SET foodName=?, season=?, benefits=?, tips=?, image=? WHERE id=?`,
    [foodName, season, benefits, tips, image, id],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to update seasonal food' });
      if (this.changes === 0) return res.status(404).json({ error: 'Seasonal food not found' });
      res.json({ message: 'Seasonal food updated' });
    }
  );
};

export const deleteSeasonalFood = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM seasonal_foods WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'Failed to delete seasonal food' });
    if (this.changes === 0) return res.status(404).json({ error: 'Seasonal food not found' });
    res.json({ message: 'Seasonal food deleted' });
  });
};

// ─── Vitamin Sources Management ────────────────────────────────

export const getVitaminSources = (req, res) => {
  db.all('SELECT * FROM vitamin_sources ORDER BY vitaminName ASC', [], (err, sources) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ sources: sources || [] });
  });
};

export const createVitaminSource = (req, res) => {
  const { vitaminName, foods, benefits, deficiencySymptoms } = req.body;
  if (!vitaminName || !foods) return res.status(400).json({ error: 'Vitamin name and foods are required' });

  const foodList = Array.isArray(foods) ? JSON.stringify(foods) : foods;

  db.run(
    `INSERT INTO vitamin_sources (vitaminName, foods, benefits, deficiencySymptoms, createdAt)
     VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [vitaminName, foodList, benefits || '', deficiencySymptoms || ''],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to create vitamin source' });
      res.status(201).json({ message: 'Vitamin source created', id: this.lastID });
    }
  );
};

export const updateVitaminSource = (req, res) => {
  const { id } = req.params;
  const { vitaminName, foods, benefits, deficiencySymptoms } = req.body;
  const foodList = Array.isArray(foods) ? JSON.stringify(foods) : foods;

  db.run(
    `UPDATE vitamin_sources SET vitaminName=?, foods=?, benefits=?, deficiencySymptoms=? WHERE id=?`,
    [vitaminName, foodList, benefits, deficiencySymptoms, id],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to update vitamin source' });
      if (this.changes === 0) return res.status(404).json({ error: 'Vitamin source not found' });
      res.json({ message: 'Vitamin source updated' });
    }
  );
};

export const deleteVitaminSource = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM vitamin_sources WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'Failed to delete vitamin source' });
    if (this.changes === 0) return res.status(404).json({ error: 'Vitamin source not found' });
    res.json({ message: 'Vitamin source deleted' });
  });
};

// ─── Nutrition Tips Management ─────────────────────────────────

export const getNutritionTips = (req, res) => {
  db.all('SELECT * FROM nutrition_tips ORDER BY createdAt DESC', [], (err, tips) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ tips: tips || [] });
  });
};

export const createNutritionTip = (req, res) => {
  const { title, content, category, icon } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

  db.run(
    `INSERT INTO nutrition_tips (title, content, category, icon, createdAt)
     VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [title, content, category || 'general', icon || '💡'],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to create nutrition tip' });
      res.status(201).json({ message: 'Nutrition tip created', id: this.lastID });
    }
  );
};

export const updateNutritionTip = (req, res) => {
  const { id } = req.params;
  const { title, content, category, icon } = req.body;

  db.run(
    `UPDATE nutrition_tips SET title=?, content=?, category=?, icon=? WHERE id=?`,
    [title, content, category, icon, id],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to update nutrition tip' });
      if (this.changes === 0) return res.status(404).json({ error: 'Nutrition tip not found' });
      res.json({ message: 'Nutrition tip updated' });
    }
  );
};

export const deleteNutritionTip = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM nutrition_tips WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'Failed to delete nutrition tip' });
    if (this.changes === 0) return res.status(404).json({ error: 'Nutrition tip not found' });
    res.json({ message: 'Nutrition tip deleted' });
  });
};

// ─── Real Stats ─────────────────────────────────────────────────
export const getAdminStats = (req, res) => {
  db.get('SELECT COUNT(*) AS totalUsers FROM users', [], (err, u) => {
    db.get('SELECT COUNT(*) AS totalRecipes FROM recipes', [], (err2, r) => {
      db.get('SELECT COUNT(*) AS totalFoods FROM foods', [], (err3, f) => {
        db.get('SELECT COUNT(*) AS totalProfiles FROM user_profiles WHERE age IS NOT NULL', [], (err4, p) => {
          res.json({
            totalUsers: u?.totalUsers || 0,
            totalRecipes: r?.totalRecipes || 0,
            totalFoods: f?.totalFoods || 0,
            profilesCompleted: p?.totalProfiles || 0,
          });
        });
      });
    });
  });
};

export default {
  requireAdmin,
  getAllUsers,
  updateUserRole,
  deleteUser,
  createFood,
  updateFood,
  deleteFood,
  getAllFoodsAdmin,
  getAllRecipesAdmin,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getSeasonalFoods,
  createSeasonalFood,
  updateSeasonalFood,
  deleteSeasonalFood,
  getVitaminSources,
  createVitaminSource,
  updateVitaminSource,
  deleteVitaminSource,
  getNutritionTips,
  createNutritionTip,
  updateNutritionTip,
  deleteNutritionTip,
  getAdminStats,
};
