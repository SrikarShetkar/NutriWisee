import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_PATH = process.env.DATABASE_PATH || path.join(__dirname, '../../data/nutriwise.db');

const db = new sqlite3.Database(DATABASE_PATH, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // 1. Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. User profiles table
    db.run(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER UNIQUE NOT NULL,
        age INTEGER,
        gender TEXT,
        height REAL,
        weight REAL,
        activityLevel TEXT,
        dietaryRestrictions TEXT,
        allergies TEXT,
        budgetPerWeek REAL,
        healthGoals TEXT,
        medicalConditions TEXT,
        preferredCuisines TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);

    // 3. AUTOMATIC PROFILE TRIGGER
    // This solves the "User profile not found" error by creating a profile 
    // immediately after a user signs up.
    db.run(`
      CREATE TRIGGER IF NOT EXISTS create_profile_after_signup
      AFTER INSERT ON users
      BEGIN
        INSERT INTO user_profiles (userId) VALUES (NEW.id);
      END;
    `);

    // 4. Foods table
    db.run(`
      CREATE TABLE IF NOT EXISTS foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        calories REAL,
        protein REAL,
        carbs REAL,
        fats REAL,
        fiber REAL,
        vitamins TEXT,
        minerals TEXT,
        price REAL,
        storageLife TEXT,
        prepTime TEXT,
        healthBenefits TEXT,
        source TEXT
      )
    `);

    // Seed a default admin account if none exists
    db.get("SELECT COUNT(*) AS count FROM users WHERE role = 'admin'", async (err, row) => {
      if (err) {
        console.error('Failed to check admin account:', err);
        return;
      }

      const adminCount = row?.count || 0;
      if (adminCount === 0) {
        const hashedPassword = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123', 10);
        const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@nutriwise.com';
        const adminUsername = process.env.DEFAULT_ADMIN_USERNAME || 'nutriadmin';

        db.run(
          'INSERT OR IGNORE INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
          [adminUsername, adminEmail, hashedPassword, 'admin'],
          function (insertErr) {
            if (insertErr) {
              console.error('Failed to seed default admin user:', insertErr);
            } else {
              console.log(`Created default admin account: ${adminEmail}`);
            }
          }
        );
      }
    });

    // 5. Recipes table (admin-managed)
    db.run(`
      CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT DEFAULT 'Main Course',
        cost REAL DEFAULT 0,
        time INTEGER DEFAULT 30,
        calories INTEGER DEFAULT 300,
        protein REAL DEFAULT 10,
        difficulty TEXT DEFAULT 'Easy',
        ingredients TEXT DEFAULT '[]',
        steps TEXT DEFAULT '[]',
        tips TEXT DEFAULT '[]',
        image TEXT DEFAULT '',
        videoLink TEXT DEFAULT '',
        videoChannel TEXT DEFAULT '',
        createdBy INTEGER,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (createdBy) REFERENCES users(id)
      )
    `);

    // 5b. Meal plans table
    db.run(`
      CREATE TABLE IF NOT EXISTS meal_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        name TEXT,
        startDate DATE,
        endDate DATE,
        type TEXT,
        totalCalories REAL,
        budget REAL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);

    // 6. Meal plan items table
    db.run(`
      CREATE TABLE IF NOT EXISTS meal_plan_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mealPlanId INTEGER NOT NULL,
        foodId INTEGER NOT NULL,
        mealType TEXT,
        dayOfWeek INTEGER,
        servingSize REAL,
        unit TEXT,
        FOREIGN KEY (mealPlanId) REFERENCES meal_plans(id),
        FOREIGN KEY (foodId) REFERENCES foods(id)
      )
    `);

    // 7. Food log table
    db.run(`
      CREATE TABLE IF NOT EXISTS food_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        foodId INTEGER NOT NULL,
        date DATE,
        mealType TEXT,
        servingSize REAL,
        unit TEXT,
        calories REAL,
        protein REAL,
        carbs REAL,
        fats REAL,
        fiber REAL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (foodId) REFERENCES foods(id)
      )
    `);

    // 8. Saved foods table
    db.run(`
      CREATE TABLE IF NOT EXISTS saved_foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        foodId INTEGER NOT NULL,
        isFavorite BOOLEAN DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (foodId) REFERENCES foods(id),
        UNIQUE(userId, foodId)
      )
    `);
  });
}

export default db;