import { useState, useEffect } from 'react';
import { Users, Database, BarChart3, ChefHat, Plus, Trash2, Edit2, Save, X, Check, AlertCircle, Clock, DollarSign, Flame, User, Shield, Search, BookOpen, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';

const FINDER_KEY = 'nutriwise-finder-recipes';
const SEASONAL_KEY = 'nutriwise-seasonal-foods';

type Tab = 'overview' | 'recipes' | 'users' | 'finder' | 'seasonal';

const SEASONS = ['summer', 'monsoon', 'winter'] as const;
type Season = typeof SEASONS[number];

const EMPTY_SEASONAL_FOOD = { name: '', emoji: '🥗', season: 'summer' as Season, benefits: '', cost: '', calories: 0, protein: 0, carbs: 0, savingPercent: 20, image: '' };

type Recipe = {
  id: number; name: string; category: string; cost: number; time: number;
  calories: number; protein: number; difficulty: string;
  ingredients: string; steps: string; tips: string;
  image: string; videoLink: string; videoChannel: string;
};

const EMPTY_RECIPE = {
  name: '', category: 'Main Course', cost: 0, time: 30, calories: 300,
  protein: 10, difficulty: 'Easy', ingredients: '', steps: '', tips: '',
  image: '', videoLink: '', videoChannel: '',
};

const CATEGORIES = ['Breakfast', 'Main Course', 'Non-Veg', 'Snack'];
const DIFFICULTIES = ['Very Easy', 'Easy', 'Medium', 'Hard'];

// ── localStorage helpers for Seasonal Foods ──
function loadSeasonalFoods(): any[] {
  try { return JSON.parse(localStorage.getItem(SEASONAL_KEY) || '[]'); } catch { return []; }
}
function saveSeasonalFoods(arr: any[]) {
  localStorage.setItem(SEASONAL_KEY, JSON.stringify(arr));
}

// ── localStorage helpers for Recipe Finder recipes ──
function loadFinderRecipes(): any[] {
  try { return JSON.parse(localStorage.getItem(FINDER_KEY) || '[]'); } catch { return []; }
}
function saveFinderRecipes(arr: any[]) {
  localStorage.setItem(FINDER_KEY, JSON.stringify(arr));
}

// ── Reusable recipe form (shared by both managers) ──
function RecipeFinderForm({ initial, onSave, onCancel }: { initial: any; onSave: (d: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ ...initial });
  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));
  const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400';
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{initial.id ? 'Edit Recipe Finder Recipe' : 'Add Recipe Finder Recipe'}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Recipe Name *</label>
          <input className={inp} placeholder="e.g. Butter Chicken" value={form.name} onChange={e => set('name', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Category</label>
          <select className={inp} value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Difficulty</label>
          <select className={inp} value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Cost (₹)</label>
          <input className={inp} type="number" value={form.cost} onChange={e => set('cost', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Time (minutes)</label>
          <input className={inp} type="number" value={form.time} onChange={e => set('time', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Calories</label>
          <input className={inp} type="number" value={form.calories} onChange={e => set('calories', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Protein (g)</label>
          <input className={inp} type="number" value={form.protein} onChange={e => set('protein', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Image URL</label>
          <input className={inp} placeholder="https://images.unsplash.com/..." value={form.image} onChange={e => set('image', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">YouTube Link</label>
          <input className={inp} placeholder="https://www.youtube.com/watch?v=..." value={form.videoLink} onChange={e => set('videoLink', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Channel Name</label>
          <input className={inp} placeholder="e.g. Hebbars Kitchen" value={form.videoChannel} onChange={e => set('videoChannel', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Ingredients (one per line)</label>
          <textarea className={inp + ' h-24 resize-none'} placeholder="Chicken&#10;Onion&#10;Tomato" value={form.ingredients} onChange={e => set('ingredients', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Steps (one per line)</label>
          <textarea className={inp + ' h-32 resize-none'} placeholder="Step 1&#10;Step 2" value={form.steps} onChange={e => set('steps', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Tips (one per line, optional)</label>
          <textarea className={inp + ' h-20 resize-none'} placeholder="Tip 1&#10;Tip 2" value={form.tips} onChange={e => set('tips', e.target.value)} />
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={() => onSave(form)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
          <Save className="w-4 h-4" /> {initial.id ? 'Update' : 'Create'} Recipe
        </button>
        <button onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all">
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmModal({
  title,
  description,
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4"
            initial={{ opacity: 0, scale: 0.9, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6 ml-11">{description}</p>

            <div className="flex gap-3 justify-end">
              <motion.button
                onClick={onCancel}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={onConfirm}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium text-sm hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading && <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                Delete
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function RecipeForm({ initial, onSave, onCancel }: { initial: any; onSave: (d: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState(initial);
  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));
  const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400';
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{initial.id ? 'Edit Recipe' : 'Add New Recipe'}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Recipe Name *</label>
          <input className={inp} placeholder="e.g. Butter Chicken" value={form.name} onChange={e => set('name', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Category</label>
          <select className={inp} value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Difficulty</label>
          <select className={inp} value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Cost (₹)</label>
          <input className={inp} type="number" value={form.cost} onChange={e => set('cost', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Time (minutes)</label>
          <input className={inp} type="number" value={form.time} onChange={e => set('time', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Calories</label>
          <input className={inp} type="number" value={form.calories} onChange={e => set('calories', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Protein (g)</label>
          <input className={inp} type="number" value={form.protein} onChange={e => set('protein', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Image URL</label>
          <input className={inp} placeholder="https://images.unsplash.com/..." value={form.image} onChange={e => set('image', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">YouTube Link</label>
          <input className={inp} placeholder="https://www.youtube.com/watch?v=..." value={form.videoLink} onChange={e => set('videoLink', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Channel Name</label>
          <input className={inp} placeholder="e.g. Hebbars Kitchen" value={form.videoChannel} onChange={e => set('videoChannel', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Ingredients (one per line)</label>
          <textarea className={inp + ' h-24 resize-none'} placeholder="Chicken&#10;Onion&#10;Tomato" value={form.ingredients} onChange={e => set('ingredients', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Steps (one per line)</label>
          <textarea className={inp + ' h-32 resize-none'} placeholder="Step 1&#10;Step 2&#10;Step 3" value={form.steps} onChange={e => set('steps', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Pro Tips (one per line, optional)</label>
          <textarea className={inp + ' h-20 resize-none'} placeholder="Tip 1&#10;Tip 2" value={form.tips} onChange={e => set('tips', e.target.value)} />
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={() => onSave(form)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
          <Save className="w-4 h-4" /> {initial.id ? 'Update' : 'Create'} Recipe
        </button>
        <button onClick={onCancel} className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all">
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </div>
  );
}

export function AdminDashboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('overview');
  const [stats, setStats] = useState({ totalUsers: 0, totalRecipes: 0, totalFoods: 0, profilesCompleted: 0 });
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // ── Recipe Finder Manager state ──
  const [finderRecipes, setFinderRecipes] = useState<any[]>([]);
  const [showFinderForm, setShowFinderForm] = useState(false);
  const [editingFinderRecipe, setEditingFinderRecipe] = useState<any>(null);
  const [finderSearch, setFinderSearch] = useState('');
  const [finderCategory, setFinderCategory] = useState('all');
  const [finderDeleteModal, setFinderDeleteModal] = useState({ isOpen: false, id: null as number | null, isDeleting: false });

  // ── Seasonal Foods Manager state ──
  const [seasonalFoods, setSeasonalFoods] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season>('summer');
  const [showSeasonalForm, setShowSeasonalForm] = useState(false);
  const [editingSeasonalFood, setEditingSeasonalFood] = useState<any>(null);
  const [seasonalDeleteId, setSeasonalDeleteId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<any>(null);
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Delete confirmation modal
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, recipeId: null, isDeleting: false });

  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    (apiService as any).getAdminStats().then((s: any) => setStats(s)).catch(() => { });
  }, []);

  useEffect(() => {
    if (tab === 'recipes') loadRecipes();
    if (tab === 'users') loadUsers();
    if (tab === 'seasonal') setSeasonalFoods(loadSeasonalFoods());
  }, [tab]);

  const loadRecipes = async () => {
    setLoading(true);
    try { const d: any = await (apiService as any).getAdminRecipes(); setRecipes(d.recipes || []); }
    catch { notify('Failed to load recipes'); } finally { setLoading(false); }
  };

  const loadUsers = async () => {
    setLoading(true);
    try { const d: any = await (apiService as any).getAdminUsers(); setUsers(d.users || []); }
    catch { notify('Failed to load users'); } finally { setLoading(false); }
  };

  const parseLines = (val: string): string[] => val.split('\n').map(s => s.trim()).filter(Boolean);

  const handleSave = async (form: any) => {
    if (!form.name.trim()) { notify('Recipe name is required'); return; }
    const payload = {
      ...form,
      cost: Number(form.cost), time: Number(form.time),
      calories: Number(form.calories), protein: Number(form.protein),
      ingredients: parseLines(form.ingredients),
      steps: parseLines(form.steps),
      tips: parseLines(form.tips),
    };
    try {
      if (form.id) { await (apiService as any).updateAdminRecipe(form.id, payload); notify('Recipe updated!'); }
      else { await (apiService as any).createAdminRecipe(payload); notify('Recipe created!'); }
      setShowForm(false); setEditingRecipe(null); loadRecipes();
    } catch (e: any) { notify(e.message || 'Failed to save'); }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteModal({ isOpen: true, recipeId: id, isDeleting: false });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.recipeId) return;
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    try {
      await (apiService as any).deleteAdminRecipe(deleteModal.recipeId);
      notify('Recipe deleted');
      loadRecipes();
      setDeleteModal({ isOpen: false, recipeId: null, isDeleting: false });
    } catch {
      notify('Failed to delete recipe');
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Delete this user?')) return;
    try { await (apiService as any).deleteAdminUser(id); notify('User deleted'); loadUsers(); }
    catch { notify('Failed to delete user'); }
  };

  const handleRoleToggle = async (u: any) => {
    const newRole = u.role === 'admin' ? 'user' : 'admin';
    try { await (apiService as any).updateUserRole(u.id, newRole); notify('Role updated'); loadUsers(); }
    catch { notify('Failed to update role'); }
  };

  const parseJson = (s: string) => { try { return JSON.parse(s); } catch { return []; } };

  // Filter recipes based on search and category
  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // ── Recipe Finder CRUD (localStorage) ──
  // Load ALL recipes: static (from RecipeFinderPage cache) + custom (nutriwise-finder-recipes)
  const loadFinderRecipesState = () => {
    // Static overrides & deletions
    const overrides: Record<number,any> = (() => { try { return JSON.parse(localStorage.getItem('nutriwise-static-recipe-overrides') || '{}'); } catch { return {}; } })();
    const deletedIds: number[] = (() => { try { return JSON.parse(localStorage.getItem('nutriwise-deleted-static-ids') || '[]'); } catch { return []; } })();
    // Static recipes cache (written by RecipeFinderPage on load)
    const staticCached: any[] = (() => { try { return JSON.parse(localStorage.getItem('nutriwise-recipes-cache') || '[]'); } catch { return []; } })();
    const effectiveStatic = staticCached
      .filter((r: any) => !deletedIds.includes(r.id))
      .map((r: any) => overrides[r.id] ? { ...r, ...overrides[r.id], _isStatic: true } : { ...r, _isStatic: true });
    // Custom recipes
    const custom: any[] = loadFinderRecipes().map((r: any, idx: number) => ({ ...r, id: 9000 + idx, _isStatic: false }));
    setFinderRecipes([...effectiveStatic, ...custom]);
  };

  useEffect(() => {
    if (tab === 'finder') loadFinderRecipesState();
  }, [tab]);

  const parseLines2 = (val: string): string[] => val.split('\n').map(s => s.trim()).filter(Boolean);

  const handleFinderSave = (form: any) => {
    if (!form.name.trim()) { notify('Recipe name is required'); return; }
    const payload = {
      ...form,
      cost: Number(form.cost), time: Number(form.time),
      calories: Number(form.calories), protein: Number(form.protein),
      ingredients: parseLines2(form.ingredients || ''),
      detailedSteps: parseLines2(form.steps || ''),
      tips: parseLines2(form.tips || ''),
    };
    if (form._isStatic) {
      // Edit a built-in static recipe — save to overrides
      const overrides = (() => { try { return JSON.parse(localStorage.getItem('nutriwise-static-recipe-overrides') || '{}'); } catch { return {}; } })();
      overrides[form.id] = payload;
      localStorage.setItem('nutriwise-static-recipe-overrides', JSON.stringify(overrides));
      notify('Static recipe updated!');
    } else if (form.id && form.id < 9000) {
      // Same as static (shouldn't reach but guard)
      notify('Cannot save this way');
    } else if (form.id) {
      // Custom recipe update
      const idx = form.id - 9000;
      const existing = loadFinderRecipes();
      existing[idx] = payload;
      saveFinderRecipes(existing);
      notify('Recipe updated!');
    } else {
      // New custom recipe
      saveFinderRecipes([...loadFinderRecipes(), { ...payload, id: Date.now() }]);
      notify('Recipe created!');
    }
    setShowFinderForm(false); setEditingFinderRecipe(null);
    loadFinderRecipesState();
  };

  const handleFinderDeleteConfirm = () => {
    if (!finderDeleteModal.id) return;
    setFinderDeleteModal(p => ({ ...p, isDeleting: true }));
    const targetId = finderDeleteModal.id;
    // Check if static
    const cached: any[] = (() => { try { return JSON.parse(localStorage.getItem('nutriwise-recipes-cache') || '[]'); } catch { return []; } })();
    const isStatic = cached.some((r: any) => r.id === targetId);
    if (isStatic) {
      const deleted: number[] = (() => { try { return JSON.parse(localStorage.getItem('nutriwise-deleted-static-ids') || '[]'); } catch { return []; } })();
      if (!deleted.includes(targetId)) deleted.push(targetId);
      localStorage.setItem('nutriwise-deleted-static-ids', JSON.stringify(deleted));
    } else {
      const idx = targetId - 9000;
      const arr = loadFinderRecipes();
      arr.splice(idx, 1);
      saveFinderRecipes(arr);
    }
    notify('Recipe deleted');
    setFinderDeleteModal({ isOpen: false, id: null, isDeleting: false });
    loadFinderRecipesState();
  };

  const filteredFinderRecipes = finderRecipes.filter(r => {
    const ms = r.name.toLowerCase().includes(finderSearch.toLowerCase());
    const mc = finderCategory === 'all' || r.category === finderCategory;
    return ms && mc;
  });

  // ── Seasonal Foods CRUD (localStorage) ──
  const handleSeasonalSave = (form: any) => {
    if (!form.name.trim()) { notify('Food name is required'); return; }
    const payload = {
      ...form,
      calories: Number(form.calories), protein: Number(form.protein),
      carbs: Number(form.carbs), savingPercent: Number(form.savingPercent),
      benefits: typeof form.benefits === 'string' ? form.benefits.split('\n').map((s: string) => s.trim()).filter(Boolean) : form.benefits,
      id: form.id ?? Date.now(),
    };
    const existing = loadSeasonalFoods();
    if (form.id) {
      saveSeasonalFoods(existing.map((f: any) => f.id === form.id ? payload : f));
      notify('Food updated!');
    } else {
      saveSeasonalFoods([...existing, payload]);
      notify('Food added!');
    }
    setShowSeasonalForm(false); setEditingSeasonalFood(null);
    setSeasonalFoods(loadSeasonalFoods());
  };

  const handleSeasonalDelete = (id: number) => setSeasonalDeleteId(id);

  const confirmSeasonalDelete = () => {
    if (seasonalDeleteId === null) return;
    saveSeasonalFoods(loadSeasonalFoods().filter((f: any) => f.id !== seasonalDeleteId));
    notify('Food deleted');
    setSeasonalDeleteId(null);
    setSeasonalFoods(loadSeasonalFoods());
  };

  const filteredSeasonalFoods = seasonalFoods.filter((f: any) => f.season === selectedSeason);

  const TABS: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'recipes', label: 'Recipe Manager', icon: ChefHat },
    { id: 'finder', label: 'Recipe Finder', icon: BookOpen },
    { id: 'seasonal', label: 'Seasonal Foods', icon: Sun },
    { id: 'users', label: 'User Manager', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Delete Confirmation Modal — backend recipes */}
      <DeleteConfirmModal
        title="Delete Recipe?"
        description="This action cannot be undone. The recipe will be permanently removed from the database."
        isOpen={deleteModal.isOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, recipeId: null, isDeleting: false })}
        isLoading={deleteModal.isDeleting}
      />

      {/* Delete Confirmation Modal — Recipe Finder recipes */}
      <DeleteConfirmModal
        title="Delete Recipe Finder Recipe?"
        description="This will remove the recipe from the Recipe Finder page permanently."
        isOpen={finderDeleteModal.isOpen}
        onConfirm={handleFinderDeleteConfirm}
        onCancel={() => setFinderDeleteModal({ isOpen: false, id: null, isDeleting: false })}
        isLoading={finderDeleteModal.isDeleting}
      />

      {/* Delete Confirmation Modal — Seasonal Foods */}
      <DeleteConfirmModal
        title="Delete Seasonal Food?"
        description="This will remove this food from the Seasonal Foods page."
        isOpen={seasonalDeleteId !== null}
        onConfirm={confirmSeasonalDelete}
        onCancel={() => setSeasonalDeleteId(null)}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-5 right-5 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-medium">
            <Check className="w-4 h-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl"><Shield className="w-6 h-6 text-white" /></div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-500 ml-14">Logged in as <span className="font-semibold text-green-600">{user?.email}</span></p>
        </div>

        {/* Tab Nav */}
        <div className="flex gap-2 mb-8 bg-white rounded-2xl p-1.5 shadow-sm w-fit">
          {TABS.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${tab === t.id ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
              {[
                { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-600' },
                { label: 'Recipes Created', value: stats.totalRecipes, icon: ChefHat, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', text: 'text-green-600' },
                { label: 'Food Items', value: stats.totalFoods, icon: Database, color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50', text: 'text-purple-600' },
                { label: 'Profiles Done', value: stats.profilesCompleted, icon: User, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50', text: 'text-orange-600' },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`text-3xl font-bold ${s.text} mb-1`}>{s.value}</div>
                    <div className="text-gray-500 text-sm">{s.label}</div>
                  </div>
                );
              })}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button onClick={() => { setTab('recipes'); setShowForm(true); }} className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-green-300 hover:border-green-500 hover:bg-green-50 transition-all text-left">
                  <div className="p-2 bg-green-100 rounded-lg"><ChefHat className="w-5 h-5 text-green-600" /></div>
                  <div><div className="font-semibold text-gray-800">Add Backend Recipe</div><div className="text-sm text-gray-500">Create a recipe via backend API</div></div>
                </button>
                <button onClick={() => { setTab('finder'); setShowFinderForm(true); }} className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left">
                  <div className="p-2 bg-indigo-100 rounded-lg"><BookOpen className="w-5 h-5 text-indigo-600" /></div>
                  <div><div className="font-semibold text-gray-800">Add Finder Recipe</div><div className="text-sm text-gray-500">Add to Recipe Finder page</div></div>
                </button>
                <button onClick={() => setTab('users')} className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                  <div className="p-2 bg-blue-100 rounded-lg"><Users className="w-5 h-5 text-blue-600" /></div>
                  <div><div className="font-semibold text-gray-800">Manage Users</div><div className="text-sm text-gray-500">View, promote, or remove users</div></div>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── RECIPE MANAGER ── */}
        {tab === 'recipes' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">Recipe Manager</h2>
              {!showForm && !editingRecipe && (
                <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
                  <Plus className="w-4 h-4" /> Add Recipe
                </button>
              )}
            </div>

            {(showForm || editingRecipe) && (
              <div className="mb-6">
                <RecipeForm
                  initial={editingRecipe || EMPTY_RECIPE}
                  onSave={handleSave}
                  onCancel={() => { setShowForm(false); setEditingRecipe(null); }}
                />
              </div>
            )}

            {/* Search and Filter */}
            {!showForm && !editingRecipe && (
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search recipes by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                  />
                </div>

                {/* Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all font-medium text-sm bg-white"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <div className="w-10 h-10 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-400">Loading recipes…</p>
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">{recipes.length === 0 ? 'No recipes yet' : 'No recipes match your search'}</p>
                <p className="text-sm text-gray-400">{recipes.length === 0 ? 'Click "Add Recipe" to create your first one' : 'Try adjusting your search or filter'}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredRecipes.map(r => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                  >
                    {r.image ? (
                      <img src={r.image} alt={r.name} className="w-full h-40 object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                        <ChefHat className="w-10 h-10 text-green-400" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-gray-800 leading-tight">{r.name}</h3>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">{r.category}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />₹{r.cost}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.time}m</span>
                        <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{r.calories} cal</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingRecipe({ ...r, ingredients: parseJson(r.ingredients).join('\n'), steps: parseJson(r.steps).join('\n'), tips: parseJson(r.tips).join('\n') }); setShowForm(false); }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-600 transition-all">
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleDeleteClick(r.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 border-2 border-red-100 rounded-xl text-sm font-medium text-red-500 hover:border-red-400 hover:bg-red-50 transition-all">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── RECIPE FINDER MANAGER ── */}
        {tab === 'finder' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Recipe Finder Manager</h2>
                <p className="text-sm text-gray-500 mt-0.5">Recipes added here appear live in the <span className="font-semibold text-indigo-600">Recipe Finder</span> page for all users.</p>
              </div>
              {!showFinderForm && !editingFinderRecipe && (
                <button onClick={() => setShowFinderForm(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
                  <Plus className="w-4 h-4" /> Add Recipe
                </button>
              )}
            </div>

            {(showFinderForm || editingFinderRecipe) && (
              <div className="mb-6">
                <RecipeFinderForm
                  initial={editingFinderRecipe || EMPTY_RECIPE}
                  onSave={handleFinderSave}
                  onCancel={() => { setShowFinderForm(false); setEditingFinderRecipe(null); }}
                />
              </div>
            )}

            {/* Search + filter */}
            {!showFinderForm && !editingFinderRecipe && (
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search recipes by name..."
                    value={finderSearch} onChange={e => setFinderSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
                </div>
                <select value={finderCategory} onChange={e => setFinderCategory(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all font-medium text-sm bg-white">
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            {filteredFinderRecipes.length === 0 && !showFinderForm && !editingFinderRecipe ? (
              <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-indigo-100">
                <BookOpen className="w-12 h-12 text-indigo-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">{finderRecipes.length === 0 ? 'No custom recipes yet' : 'No recipes match your search'}</p>
                <p className="text-sm text-gray-400 mt-1">{finderRecipes.length === 0 ? 'Click "Add Recipe" to create one — it will appear in Recipe Finder instantly' : 'Try adjusting your search or filter'}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredFinderRecipes.map(r => (
                  <motion.div key={r.id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
                  >
                    {r.image ? (
                      <img src={r.image} alt={r.name} className="w-full h-40 object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-indigo-400" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-gray-800 leading-tight">{r.name}</h3>
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">{r.category}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />₹{r.cost}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.time}m</span>
                        <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{r.calories} cal</span>
                      </div>
                      {Array.isArray(r.ingredients) && r.ingredients.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {r.ingredients.slice(0, 3).map((ing: string, i: number) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{ing}</span>
                          ))}
                          {r.ingredients.length > 3 && (
                            <span className="text-xs text-gray-400">+{r.ingredients.length - 3} more</span>
                          )}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingFinderRecipe({
                              ...r,
                              ingredients: Array.isArray(r.ingredients) ? r.ingredients.join('\n') : r.ingredients,
                              steps: Array.isArray(r.detailedSteps) ? r.detailedSteps.join('\n') : r.detailedSteps,
                              tips: Array.isArray(r.tips) ? r.tips.join('\n') : r.tips,
                            });
                            setShowFinderForm(false);
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-all">
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => setFinderDeleteModal({ isOpen: true, id: r.id, isDeleting: false })}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 border-2 border-red-100 rounded-xl text-sm font-medium text-red-500 hover:border-red-400 hover:bg-red-50 transition-all">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── USER MANAGER ── */}
        {tab === 'users' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-5">User Manager</h2>
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading users…</div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-[1fr_2fr_1fr_auto] gap-4 px-5 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  <span>Username</span><span>Email</span><span>Role</span><span>Actions</span>
                </div>
                {users.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">No users found</div>
                ) : users.map(u => (
                  <div key={u.id} className="grid grid-cols-[1fr_2fr_1fr_auto] gap-4 items-center px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-800 text-sm truncate">{u.username}</span>
                    <span className="text-gray-500 text-sm truncate">{u.email}</span>
                    <span>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                        {u.role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />} {u.role}
                      </span>
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => handleRoleToggle(u)} title={u.role === 'admin' ? 'Demote to user' : 'Promote to admin'}
                        className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all">
                        <Shield className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteUser(u.id)} disabled={u.role === 'admin'}
                        className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── SEASONAL FOODS MANAGER ── */}
        {tab === 'seasonal' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Seasonal Foods Manager</h2>
                <p className="text-sm text-gray-500 mt-0.5">Foods added here appear live in the <span className="font-semibold text-orange-600">Seasonal Foods</span> page for all users.</p>
              </div>
              {!showSeasonalForm && !editingSeasonalFood && (
                <button onClick={() => setShowSeasonalForm(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
                  <Plus className="w-4 h-4" /> Add Food
                </button>
              )}
            </div>

            {/* Season tabs */}
            <div className="flex gap-2 mb-5">
              {(['summer','monsoon','winter'] as Season[]).map(s => (
                <button key={s} onClick={() => setSelectedSeason(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                    selectedSeason === s ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}>{s}</button>
              ))}
            </div>

            {/* Add/Edit form */}
            {(showSeasonalForm || editingSeasonalFood) && (() => {
              const form = editingSeasonalFood || { ...EMPTY_SEASONAL_FOOD, season: selectedSeason };
              const setF = (k: string, v: any) => setEditingSeasonalFood((p: any) => ({ ...(p ?? { ...EMPTY_SEASONAL_FOOD, season: selectedSeason }), [k]: v }));
              const setNew = (k: string, v: any) => showSeasonalForm && !editingSeasonalFood
                ? setEditingSeasonalFood({ ...EMPTY_SEASONAL_FOOD, season: selectedSeason, [k]: v })
                : setF(k, v);
              const cur = editingSeasonalFood ?? { ...EMPTY_SEASONAL_FOOD, season: selectedSeason };
              const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400';
              return (
                <div className="mb-6 bg-white rounded-2xl shadow-xl p-6 border border-orange-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">{editingSeasonalFood?.id ? 'Edit Seasonal Food' : 'Add Seasonal Food'}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><label className="text-xs font-semibold text-gray-500 mb-1 block">Food Name *</label>
                      <input className={inp} value={cur.name || ''} onChange={e => setNew('name', e.target.value)} placeholder="e.g. Watermelon" /></div>
                    <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Emoji</label>
                      <input className={inp} value={cur.emoji || ''} onChange={e => setNew('emoji', e.target.value)} placeholder="🍉" /></div>
                    <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Season</label>
                      <select className={inp} value={cur.season || 'summer'} onChange={e => setNew('season', e.target.value)}>
                        {(['summer','monsoon','winter'] as Season[]).map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                      </select></div>
                    <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Cost (e.g. ₹20-30/kg)</label>
                      <input className={inp} value={cur.cost || ''} onChange={e => setNew('cost', e.target.value)} placeholder="₹20-30/kg" /></div>
                    <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Saving %</label>
                      <input className={inp} type="number" value={cur.savingPercent || 0} onChange={e => setNew('savingPercent', e.target.value)} /></div>
                    <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Calories</label>
                      <input className={inp} type="number" value={cur.calories || 0} onChange={e => setNew('calories', e.target.value)} /></div>
                    <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Protein (g)</label>
                      <input className={inp} type="number" value={cur.protein || 0} onChange={e => setNew('protein', e.target.value)} /></div>
                    <div className="md:col-span-2"><label className="text-xs font-semibold text-gray-500 mb-1 block">Image URL</label>
                      <input className={inp} value={cur.image || ''} onChange={e => setNew('image', e.target.value)} placeholder="https://images.unsplash.com/..." /></div>
                    <div className="md:col-span-2"><label className="text-xs font-semibold text-gray-500 mb-1 block">Benefits (one per line)</label>
                      <textarea className={inp + ' h-24 resize-none'} value={Array.isArray(cur.benefits) ? cur.benefits.join('\n') : (cur.benefits || '')} onChange={e => setNew('benefits', e.target.value)} placeholder="92% water content&#10;Keeps you hydrated" /></div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button onClick={() => handleSeasonalSave(cur)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg">
                      <Save className="w-4 h-4" /> {editingSeasonalFood?.id ? 'Update' : 'Add'} Food
                    </button>
                    <button onClick={() => { setShowSeasonalForm(false); setEditingSeasonalFood(null); }} className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              );
            })()}

            {filteredSeasonalFoods.length === 0 && !showSeasonalForm && !editingSeasonalFood ? (
              <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-orange-100">
                <Sun className="w-12 h-12 text-orange-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No custom {selectedSeason} foods yet</p>
                <p className="text-sm text-gray-400 mt-1">Click "Add Food" to add one — it will appear in Seasonal Foods instantly</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSeasonalFoods.map((f: any) => (
                  <motion.div key={f.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                    {f.image ? (
                      <img src={f.image} alt={f.name} className="w-full h-36 object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <div className="w-full h-36 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-5xl">{f.emoji || '🥗'}</div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-800">{f.name}</h3>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium capitalize">{f.season}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{f.cost}</p>
                      <p className="text-xs text-green-600 font-medium mb-3">Save {f.savingPercent}%</p>
                      {Array.isArray(f.benefits) && f.benefits.length > 0 && (
                        <ul className="text-xs text-gray-600 space-y-0.5 mb-3">
                          {f.benefits.slice(0,2).map((b: string, i: number) => <li key={i}>✓ {b}</li>)}
                        </ul>
                      )}
                      <div className="flex gap-2">
                        <button onClick={() => setEditingSeasonalFood({ ...f, benefits: Array.isArray(f.benefits) ? f.benefits.join('\n') : f.benefits })}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-all">
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleSeasonalDelete(f.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 border-2 border-red-100 rounded-xl text-sm font-medium text-red-500 hover:border-red-400 hover:bg-red-50 transition-all">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
