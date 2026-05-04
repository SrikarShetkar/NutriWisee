import { useState, useEffect } from 'react';
import { Users, Database, BarChart3, ChefHat, Plus, Trash2, Edit2, Save, X, Check, AlertCircle, Youtube, Image, Clock, DollarSign, Flame, User, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';

type Tab = 'overview' | 'recipes' | 'users';

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
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<any>(null);
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);

  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    (apiService as any).getAdminStats().then((s: any) => setStats(s)).catch(() => {});
  }, []);

  useEffect(() => {
    if (tab === 'recipes') loadRecipes();
    if (tab === 'users') loadUsers();
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

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this recipe?')) return;
    try { await (apiService as any).deleteAdminRecipe(id); notify('Deleted'); loadRecipes(); }
    catch { notify('Failed to delete'); }
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

  const TABS: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'recipes', label: 'Recipe Manager', icon: ChefHat },
    { id: 'users', label: 'User Manager', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
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
              <div className="grid md:grid-cols-2 gap-4">
                <button onClick={() => { setTab('recipes'); setShowForm(true); }} className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-green-300 hover:border-green-500 hover:bg-green-50 transition-all text-left">
                  <div className="p-2 bg-green-100 rounded-lg"><ChefHat className="w-5 h-5 text-green-600" /></div>
                  <div><div className="font-semibold text-gray-800">Add New Recipe</div><div className="text-sm text-gray-500">Create a recipe visible to all users</div></div>
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

            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading recipes…</div>
            ) : recipes.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No recipes yet</p>
                <p className="text-sm text-gray-400">Click "Add Recipe" to create your first one</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {recipes.map(r => (
                  <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
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
                        <button onClick={() => handleDelete(r.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 border-2 border-red-100 rounded-xl text-sm font-medium text-red-500 hover:border-red-400 hover:bg-red-50 transition-all">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
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
      </div>
    </div>
  );
}
