
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  User, DollarSign, Activity, ArrowRight, ArrowLeft,
  Heart, AlertTriangle, Target, Weight, Ruler, Users,
  Utensils, Shield, Check, AlertCircle, Zap, Apple,
  Dumbbell, Droplets, Brain, Leaf, Wheat, Milk, Fish,
  LayoutList, Star, TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState('');
  const [direction, setDirection] = useState(1);

  const [formData, setFormData] = useState({
    age: '', gender: '', height: '', weight: '',
    activityLevel: '', budget: '', dietaryPreference: '',
    allergies: [] as string[], healthConditions: [] as string[],
    goals: [] as string[], targetWeight: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await apiService.getUserProfile();
        if (profile) {
          const p = profile as any;
          setFormData(prev => ({
            ...prev,
            ...p,
            // Normalize null/string array fields back to arrays
            allergies: Array.isArray(p.allergies) ? p.allergies : (p.allergies ? JSON.parse(p.allergies) : []),
            healthConditions: Array.isArray(p.medicalConditions) ? p.medicalConditions : (p.medicalConditions ? JSON.parse(p.medicalConditions) : []),
            goals: Array.isArray(p.healthGoals) ? p.healthGoals : (p.healthGoals ? JSON.parse(p.healthGoals) : []),
            age: p.age ?? '',
            height: p.height ?? '',
            weight: p.weight ?? '',
            budget: p.budgetPerWeek ?? '',
            dietaryPreference: p.dietaryRestrictions ?? p.dietaryPreference ?? '',
          }));
        }
      } catch { /* new user */ } finally { setLoadingProfile(false); }
    };
    if (user) loadProfile(); else setLoadingProfile(false);
  }, [user]);

  const set = (field: string, value: any) => { setFormData(prev => ({ ...prev, [field]: value })); setError(''); };
  const toggleArray = (field: 'allergies' | 'healthConditions' | 'goals', value: string) => {
    setFormData(prev => {
      const arr: string[] = Array.isArray(prev[field]) ? prev[field] : [];
      return { ...prev, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  // ── Steps ────────────────────────────────────────────────────
  const STEPS = [
    { id: 'personal', title: 'Personal Details', subtitle: 'Tell us about yourself', icon: Users, color: 'from-blue-500 to-indigo-600' },
    { id: 'activityLevel', title: 'Activity Level', subtitle: 'How active is your lifestyle?', icon: Activity, color: 'from-yellow-500 to-orange-500' },
    { id: 'diet', title: 'Dietary Preference', subtitle: 'What type of food do you eat?', icon: Utensils, color: 'from-green-500 to-emerald-600' },
    { id: 'goals', title: 'Health Goals', subtitle: 'What do you want to achieve?', icon: Target, color: 'from-pink-500 to-rose-600' },
    { id: 'health', title: 'Medical Conditions', subtitle: 'Any health conditions we should know?', icon: Shield, color: 'from-red-500 to-rose-600' },
    { id: 'allergies', title: 'Food Allergies', subtitle: 'Any foods you react to?', icon: AlertTriangle, color: 'from-amber-500 to-orange-600' },
    { id: 'budget', title: 'Weekly Budget', subtitle: 'What is your food budget per week?', icon: DollarSign, color: 'from-emerald-500 to-green-600' },
  ];

  const total = STEPS.length;
  const progress = ((step + 1) / total) * 100;

  const canNext = () => {
    const id = STEPS[step].id;
    if (id === 'personal') return !!formData.gender && !!formData.age && Number(formData.age) >= 10 && !!formData.height && Number(formData.height) > 0 && !!formData.weight && Number(formData.weight) > 0;
    if (id === 'activityLevel') return !!formData.activityLevel;
    if (id === 'diet') return !!formData.dietaryPreference;
    if (id === 'budget') return !!formData.budget && !isNaN(parseFloat(formData.budget));
    return true;
  };

  const goNext = () => { if (!canNext()) { setError('Please fill all fields to continue'); return; } if (step < total - 1) { setDirection(1); setStep(s => s + 1); setError(''); } };
  const goPrev = () => { if (step > 0) { setDirection(-1); setStep(s => s - 1); setError(''); } };

  const handleSubmit = async () => {
    setError('');
    const bv = parseFloat(formData.budget);
    if (isNaN(bv)) { setError('Enter a valid budget'); return; }
    const profileData = {
      age: Number(formData.age), gender: formData.gender,
      height: Number(formData.height), weight: Number(formData.weight),
      activityLevel: formData.activityLevel, dietaryPreference: formData.dietaryPreference,
      allergies: formData.allergies, budgetPerWeek: bv,
      healthGoals: formData.goals, medicalConditions: formData.healthConditions,
      targetWeight: formData.targetWeight ? Number(formData.targetWeight) : null,
    };
    try {
      setIsLoading(true);
      await apiService.createOrUpdateProfile(profileData);
      localStorage.setItem('nutriwise-profile', JSON.stringify({ ...profileData, completedAt: new Date().toISOString() }));
      navigate('/dashboard');
    } catch (err: any) { setError(err.message || 'Save failed. Please try again.'); }
    finally { setIsLoading(false); }
  };

  if (loadingProfile) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Loading your profile…</p>
      </div>
    </div>
  );

  const currentStep = STEPS[step];
  const StepIcon = currentStep.icon;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  // ── Reusable components ───────────────────────────────────────
  const OptionBtn = ({ label, value, field, icon: Icon, description }: { label: string; value: string; field: string; icon?: any; description?: string }) => {
    const active = (formData as any)[field] === value;
    return (
      <button type="button" onClick={() => set(field, value)}
        className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${active ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/50'}`}>
        {Icon && <div className={`p-2 rounded-xl ${active ? 'bg-green-500' : 'bg-gray-100'}`}><Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500'}`} /></div>}
        <div className="flex-1">
          <div className={`font-semibold ${active ? 'text-green-700' : 'text-gray-800'}`}>{label}</div>
          {description && <div className="text-sm text-gray-500 mt-0.5">{description}</div>}
        </div>
        {active && <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"><Check className="w-4 h-4 text-white" /></div>}
      </button>
    );
  };

  const MultiBtn = ({ label, value, field, icon: Icon }: { label: string; value: string; field: 'allergies' | 'healthConditions' | 'goals'; icon?: any }) => {
    const active = formData[field].includes(value);
    return (
      <button type="button" onClick={() => toggleArray(field, value)}
        className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2.5 ${active ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-green-300'}`}>
        {Icon && <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-green-600' : 'text-gray-400'}`} />}
        <span className={`text-sm font-medium ${active ? 'text-green-700' : 'text-gray-700'}`}>{label}</span>
        {active && <Check className="w-3.5 h-3.5 text-green-500 ml-auto" />}
      </button>
    );
  };

  const NumField = ({ field, label, unit, placeholder, min, max }: { field: string; label: string; unit: string; placeholder: string; min?: number; max?: number }) => (
    <div>
      <label className="text-sm font-semibold text-gray-600 mb-1.5 block">{label}</label>
      <div className="relative">
        <input type="number" value={(formData as any)[field]} onChange={e => set(field, e.target.value)} placeholder={placeholder} min={min} max={max}
          className="w-full py-3 px-4 pr-14 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all text-gray-800 font-medium text-lg text-center" />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">{unit}</span>
      </div>
    </div>
  );

  // ── Step Content ─────────────────────────────────────────────
  const renderContent = () => {
    const id = currentStep.id;

    if (id === 'personal') return (
      <div className="space-y-5">
        {/* Gender */}
        <div>
          <label className="text-sm font-semibold text-gray-600 mb-2 block flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" /> Gender *</label>
          <div className="grid grid-cols-3 gap-2">
            {[{ v: 'male', label: 'Male', icon: User }, { v: 'female', label: 'Female', icon: Users }, { v: 'other', label: 'Other', icon: Users }].map(({ v, label, icon: Ic }) => {
              const active = formData.gender === v;
              return (
                <button key={v} type="button" onClick={() => set('gender', v)}
                  className={`flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all ${active ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                  <div className={`p-2 rounded-lg ${active ? 'bg-green-500' : 'bg-gray-100'}`}><Ic className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500'}`} /></div>
                  <span className={`text-sm font-semibold ${active ? 'text-green-700' : 'text-gray-700'}`}>{label}</span>
                  {active && <Check className="w-4 h-4 text-green-500" />}
                </button>
              );
            })}
          </div>
        </div>
        {/* Age, Height, Weight */}
        <div className="grid grid-cols-3 gap-3">
          <NumField field="age" label="Age *" unit="yrs" placeholder="25" min={10} max={100} />
          <NumField field="height" label="Height *" unit="cm" placeholder="170" min={50} max={250} />
          <NumField field="weight" label="Weight *" unit="kg" placeholder="70" min={20} max={300} />
        </div>
        {/* Target weight */}
        <div>
          <label className="text-sm font-semibold text-gray-600 mb-1.5 block flex items-center gap-2"><Target className="w-4 h-4 text-gray-400" /> Target Weight (optional)</label>
          <div className="relative">
            <input type="number" value={formData.targetWeight} onChange={e => set('targetWeight', e.target.value)} placeholder="e.g. 65"
              className="w-full py-3 px-4 pr-14 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all text-gray-700 font-medium text-center" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">kg</span>
          </div>
        </div>
      </div>
    );

    if (id === 'activityLevel') return (
      <div className="space-y-3">
        <OptionBtn field="activityLevel" value="sedentary" label="Sedentary" icon={LayoutList} description="Desk job, little or no exercise" />
        <OptionBtn field="activityLevel" value="lightly_active" label="Lightly Active" icon={Activity} description="Light exercise 1–3 days/week" />
        <OptionBtn field="activityLevel" value="moderately_active" label="Moderately Active" icon={Zap} description="Moderate exercise 3–5 days/week" />
        <OptionBtn field="activityLevel" value="very_active" label="Very Active" icon={Dumbbell} description="Hard exercise 6–7 days/week" />
        <OptionBtn field="activityLevel" value="extra_active" label="Extra Active" icon={Star} description="Athlete or very physical job" />
      </div>
    );

    if (id === 'diet') return (
      <div className="space-y-3">
        <OptionBtn field="dietaryPreference" value="vegetarian" label="Vegetarian" icon={Leaf} description="No meat or seafood" />
        <OptionBtn field="dietaryPreference" value="vegan" label="Vegan" icon={Apple} description="No animal products at all" />
        <OptionBtn field="dietaryPreference" value="nonveg" label="Non-Vegetarian" icon={Utensils} description="Meat, poultry & seafood included" />
        <OptionBtn field="dietaryPreference" value="eggetarian" label="Eggetarian" icon={Users} description="Vegetarian + eggs" />
        <OptionBtn field="dietaryPreference" value="pescatarian" label="Pescatarian" icon={Fish} description="Vegetarian + seafood" />
        <OptionBtn field="dietaryPreference" value="flexitarian" label="Flexitarian" icon={Leaf} description="Mostly plant-based, occasional meat" />
      </div>
    );

    if (id === 'goals') return (
      <div>
        <p className="text-sm text-gray-500 mb-4">Select all that apply</p>
        <div className="grid grid-cols-2 gap-3">
          <MultiBtn field="goals" value="Lose Weight" label="Lose Weight" icon={TrendingDown} />
          <MultiBtn field="goals" value="Build Muscle" label="Build Muscle" icon={Dumbbell} />
          <MultiBtn field="goals" value="Improve Energy" label="Improve Energy" icon={Zap} />
          <MultiBtn field="goals" value="Manage Blood Sugar" label="Blood Sugar" icon={Heart} />
          <MultiBtn field="goals" value="Improve Digestion" label="Improve Digestion" icon={Leaf} />
          <MultiBtn field="goals" value="Eat More Whole Foods" label="Whole Foods" icon={Apple} />
          <MultiBtn field="goals" value="Stay Hydrated" label="Stay Hydrated" icon={Droplets} />
          <MultiBtn field="goals" value="Reduce Stress" label="Reduce Stress" icon={Brain} />
        </div>
      </div>
    );

    if (id === 'health') return (
      <div>
        <p className="text-sm text-gray-500 mb-4">Select all that apply — or skip</p>
        <div className="grid grid-cols-2 gap-3">
          <MultiBtn field="healthConditions" value="Diabetes" label="Diabetes" icon={Shield} />
          <MultiBtn field="healthConditions" value="Hypertension" label="Hypertension" icon={Heart} />
          <MultiBtn field="healthConditions" value="Kidney Disease" label="Kidney Disease" icon={Shield} />
          <MultiBtn field="healthConditions" value="Heart Disease" label="Heart Disease" icon={Heart} />
          <MultiBtn field="healthConditions" value="Thyroid Issues" label="Thyroid Issues" icon={Activity} />
          <MultiBtn field="healthConditions" value="PCOS" label="PCOS" icon={Users} />
          <MultiBtn field="healthConditions" value="High Cholesterol" label="High Cholesterol" icon={Activity} />
          <MultiBtn field="healthConditions" value="None" label="None of these" icon={Check} />
        </div>
      </div>
    );

    if (id === 'allergies') return (
      <div>
        <p className="text-sm text-gray-500 mb-4">Select all that apply — or skip</p>
        <div className="grid grid-cols-2 gap-3">
          <MultiBtn field="allergies" value="Peanuts" label="Peanuts" icon={AlertTriangle} />
          <MultiBtn field="allergies" value="Eggs" label="Eggs" icon={AlertTriangle} />
          <MultiBtn field="allergies" value="Milk / Dairy" label="Milk / Dairy" icon={Milk} />
          <MultiBtn field="allergies" value="Shellfish" label="Shellfish" icon={Fish} />
          <MultiBtn field="allergies" value="Soy" label="Soy" icon={Leaf} />
          <MultiBtn field="allergies" value="Wheat / Gluten" label="Wheat / Gluten" icon={Wheat} />
          <MultiBtn field="allergies" value="Tree Nuts" label="Tree Nuts" icon={AlertTriangle} />
          <MultiBtn field="allergies" value="None" label="None of these" icon={Check} />
        </div>
      </div>
    );

    if (id === 'budget') return (
      <div>
        <p className="text-sm text-gray-500 mb-4">Your weekly grocery/food budget in ₹</p>
        <div className="relative mb-4">
          <input type="number" value={formData.budget} onChange={e => set('budget', e.target.value)}
            placeholder="e.g. 700"
            className="w-full text-center text-4xl font-bold py-6 px-6 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all bg-white text-gray-800 placeholder-gray-300"
            autoFocus />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-lg">₹/wk</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[300, 500, 700, 1000, 1500, 2000].map(b => (
            <button key={b} type="button" onClick={() => set('budget', String(b))}
              className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${formData.budget === String(b) ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
              ₹{b}
            </button>
          ))}
        </div>
      </div>
    );

    return null;
  };

  const isLast = step === total - 1;
  const isOptional = ['goals', 'health', 'allergies'].includes(currentStep.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col items-center py-8 px-4">

      {/* Progress bar */}
      <div className="w-full max-w-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Step {step + 1} of {total}</span>
          <span className="text-sm font-semibold text-green-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={step} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="bg-white rounded-3xl shadow-xl p-8">

            {/* Step Header */}
            <div className="flex items-center gap-4 mb-7">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${currentStep.color} text-white shadow-lg flex-shrink-0`}>
                <StepIcon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">{currentStep.title}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{currentStep.subtitle}</p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl flex gap-2 items-start">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Content */}
            <div className="max-h-[52vh] overflow-y-auto pr-1">
              {renderContent()}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-7">
              {step > 0 && (
                <button type="button" onClick={goPrev} className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              {!isLast ? (
                <button type="button" onClick={goNext} disabled={!canNext() && !isOptional}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-40">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50">
                  {isLoading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</> : <><Zap className="w-4 h-4" /> Complete Profile</>}
                </button>
              )}
            </div>

            {isOptional && (
              <button type="button" onClick={goNext} className="w-full mt-2.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                Skip this step →
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-5">
        {STEPS.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-green-500' : i < step ? 'w-2 bg-green-300' : 'w-2 bg-gray-200'}`} />
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-400">Your data is stored securely and never shared.</p>
    </div>
  );
}