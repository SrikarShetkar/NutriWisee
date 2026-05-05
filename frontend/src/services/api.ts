const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('nutriwise-token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error('API request failed:', error);
      if (error instanceof TypeError) {
        throw new Error('Unable to connect to the server. Please make sure the backend is running.');
      }
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    return this.request<{
      message: string;
      userId: number;
      token: string;
      role?: string;
      username?: string;
    }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );
  }

  async login(credentials: { email: string; password: string }) {
    return this.request<{
      message: string;
      userId: number;
      token: string;
      role?: string;
      username?: string;
    }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    );
  }

  async logout() {
    return this.request<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  }

  // Profile endpoints
  async getUserProfile() {
    return this.request('/profile/me');
  }

  async createOrUpdateProfile(profileData: any) {
    return this.request('/profile/create', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  async updateProfile(profileData: any) {
    return this.request('/profile/update', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async calculateBMI(data: { weight: number; height: number }) {
    return this.request('/profile/calculate-bmi', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Foods endpoints
  async getAllFoods(params?: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const queryParams = params ? new URLSearchParams(params as any).toString() : '';
    return this.request(`/foods${queryParams ? `?${queryParams}` : ''}`);
  }

  async getFoodById(id: number) {
    return this.request(`/foods/${id}`);
  }

  async searchFoods(query: string) {
    return this.request(`/foods/search?query=${encodeURIComponent(query)}`);
  }

  async getFoodCategories() {
    return this.request('/foods/categories');
  }

  async getFoodNutrition(id: number) {
    return this.request(`/foods/nutrition/${id}`);
  }

  // Meal plans endpoints
  async createMealPlan(planData: {
    name: string;
    startDate: string;
    endDate: string;
    type: string;
    totalCalories: number;
    budget: number;
  }) {
    return this.request('/meal-plans/create', {
      method: 'POST',
      body: JSON.stringify(planData),
    });
  }

  async getUserMealPlans() {
    return this.request('/meal-plans');
  }

  async getMealPlanById(id: number) {
    return this.request(`/meal-plans/${id}`);
  }

  async addMealToPlan(planId: number, mealData: {
    foodId: number;
    mealType: string;
    dayOfWeek: number;
    servingSize: number;
    unit: string;
  }) {
    return this.request(`/meal-plans/${planId}/add-meal`, {
      method: 'POST',
      body: JSON.stringify(mealData),
    });
  }

  // Food logs endpoints
  async logFood(logData: {
    foodId: number;
    date: string;
    mealType: string;
    servingSize: number;
    unit: string;
  }) {
    return this.request('/food-logs/log', {
      method: 'POST',
      body: JSON.stringify(logData),
    });
  }

  async getFoodLogs(date?: string) {
    const query = date ? `?date=${date}` : '';
    return this.request(`/food-logs${query}`);
  }

  async getDailyNutrition(date?: string) {
    const query = date ? `?date=${date}` : '';
    return this.request(`/food-logs/daily-nutrition${query}`);
  }

  async getNutritionTrends(days: number = 7) {
    return this.request(`/food-logs/trends?days=${days}`);
  }

  // Saved foods endpoints
  async saveFoodToFavorites(foodId: number) {
    return this.request('/saved-foods/save', {
      method: 'POST',
      body: JSON.stringify({ foodId }),
    });
  }

  async getSavedFoods() {
    return this.request('/saved-foods');
  }

  async removeSavedFood(foodId: number) {
    return this.request(`/saved-foods/${foodId}`, {
      method: 'DELETE',
    });
  }

  async isFoodSaved(foodId: number) {
    return this.request(`/saved-foods/check/${foodId}`);
  }

  // Dashboard endpoints
  async getDashboardData() {
    return this.request('/dashboard');
  }

  async getWeeklyStats() {
    return this.request('/dashboard/weekly-stats');
  }

  async getHealthMetrics() {
    return this.request('/dashboard/health-metrics');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Admin stats
  async getAdminStats() {
    return this.request('/admin/stats');
  }

  // Admin recipes CRUD
  async getAdminRecipes() {
    return this.request('/admin/recipes');
  }

  async createAdminRecipe(data: any) {
    return this.request('/admin/recipes', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateAdminRecipe(id: number, data: any) {
    return this.request(`/admin/recipes/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteAdminRecipe(id: number) {
    return this.request(`/admin/recipes/${id}`, { method: 'DELETE' });
  }

  // Public recipes (admin-created, visible to all users)
  async getPublicRecipes() {
    return this.request('/recipes');
  }

  // Admin users
  async getAdminUsers() {
    return this.request('/admin/users');
  }

  async updateUserRole(userId: number, role: string) {
    return this.request('/admin/users/role', { method: 'PUT', body: JSON.stringify({ userId, role }) });
  }

  async deleteAdminUser(userId: number) {
    return this.request(`/admin/users/${userId}`, { method: 'DELETE' });
  }

  // Seasonal Foods
  async getSeasonalFoods() {
    return this.request('/admin/seasonal-foods');
  }

  async createSeasonalFood(data: any) {
    return this.request('/admin/seasonal-foods', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateSeasonalFood(id: number, data: any) {
    return this.request(`/admin/seasonal-foods/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteSeasonalFood(id: number) {
    return this.request(`/admin/seasonal-foods/${id}`, { method: 'DELETE' });
  }

  // Vitamin Sources
  async getVitaminSources() {
    return this.request('/admin/vitamin-sources');
  }

  async createVitaminSource(data: any) {
    return this.request('/admin/vitamin-sources', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateVitaminSource(id: number, data: any) {
    return this.request(`/admin/vitamin-sources/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteVitaminSource(id: number) {
    return this.request(`/admin/vitamin-sources/${id}`, { method: 'DELETE' });
  }

  // Nutrition Tips
  async getNutritionTipsAdmin() {
    return this.request('/admin/nutrition-tips');
  }

  async createNutritionTip(data: any) {
    return this.request('/admin/nutrition-tips', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateNutritionTip(id: number, data: any) {
    return this.request(`/admin/nutrition-tips/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteNutritionTip(id: number) {
    return this.request(`/admin/nutrition-tips/${id}`, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();
export default apiService;
