import { Outlet, Link, useLocation } from 'react-router';
import { Home, User, LayoutDashboard, ChefHat, Scale, BookOpen, Menu, X, Calculator, Leaf, ArrowRightLeft, Heart, Pill, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MealTimeNotifications } from '../components/MealTimeNotifications';

export function RootLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLanding = location.pathname === '/';

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('nutriwise-user');
    setIsLoggedIn(!!userData);
  }, [location.pathname]);

  useEffect(() => {
    // Close more menu on route change
    setShowMoreMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    // Close more menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showMoreMenu && !target.closest('.more-menu-container')) {
        setShowMoreMenu(false);
      }
    };

    if (showMoreMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMoreMenu]);

  const handleLogout = () => {
    localStorage.removeItem('nutriwise-user');
    localStorage.removeItem('nutriwise-profile');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Recipes', href: '/recipes', icon: ChefHat },
    { name: 'More', icon: Menu, isDropdown: true },
  ];

  const moreMenuItems = [
    { name: 'Food Analyzer', href: '/analyzer', icon: Calculator },
    { name: 'Comparison', href: '/comparison', icon: Scale },
    { name: 'Food Swaps', href: '/swaps', icon: ArrowRightLeft },
    { name: 'Seasonal Foods', href: '/seasonal', icon: Leaf },
    { name: 'Health Guide', href: '/health', icon: Heart },
    { name: 'Vitamin Sources', href: '/vitamins', icon: Pill },
    { name: 'Nutrition Tips', href: '/tips', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Meal Time Notifications */}
      {isLoggedIn && <MealTimeNotifications />}

      {/* Navigation with Green Vegetable Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50 relative">
        {/* Background vegetable image with low opacity */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1741515042603-70545daeb0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmcmVzaCUyMGdyZWVuJTIwdmVnZXRhYmxlcyUyMGxlYWZ5JTIwaGVhbHRoeXxlbnwxfHx8fDE3NzU0ODA3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  NutriWise
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                if (item.isDropdown) {
                  return (
                    <div key={item.name} className="relative more-menu-container">
                      <button
                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                          showMoreMenu
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </button>
                      {showMoreMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-[9999]">
                          {moreMenuItems.map((moreItem) => {
                            const MoreIcon = moreItem.icon;
                            const isActive = location.pathname === moreItem.href;
                            return (
                              <Link
                                key={moreItem.name}
                                to={moreItem.href}
                                onClick={() => setShowMoreMenu(false)}
                                className={`flex items-center space-x-3 px-4 py-3 transition-all ${
                                  isActive
                                    ? 'bg-green-50 text-green-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <MoreIcon className="w-4 h-4" />
                                <span>{moreItem.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="ml-4 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="ml-4 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-green-50"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-green-100 bg-white">
            <div className="px-4 py-2 space-y-1">
              {navigation.filter(item => !item.isDropdown).map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-green-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-2 pb-1 border-t border-gray-100 mt-2">
                <div className="text-xs font-semibold text-gray-500 px-4 py-2">MORE FEATURES</div>
                {moreMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:bg-green-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg mt-2"
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg mt-2"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ChefHat className="w-8 h-8" />
              <span className="text-2xl font-bold">NutriWise</span>
            </div>
            <p className="text-green-100 mb-4">
              Smart Meal Planning for Budget-Conscious Students
            </p>
            <p className="text-green-200 text-sm">
              Eat healthy, save money, learn to cook.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}