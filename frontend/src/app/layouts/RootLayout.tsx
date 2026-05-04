import { Outlet, Link, useLocation } from 'react-router';
import { Home, User, LayoutDashboard, ChefHat, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MealTimeNotifications } from '../components/MealTimeNotifications';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../../contexts/AuthContext';

export function RootLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const isLanding = location.pathname === '/';
  const isAdminLogin = location.pathname === '/admin/login';

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Only show sidebar for authenticated users (not on landing/login pages)
  const showSidebar = isAuthenticated && !isLanding && !isAdminLogin;

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Recipes', href: '/recipes', icon: ChefHat },
  ];

  const adminLink = isAdmin
    ? { name: 'Admin Panel', href: '/admin/dashboard', icon: LayoutDashboard }
    : { name: 'Admin Login', href: '/admin/login', icon: LogIn };

  const navItems = !isAuthenticated || isAdmin ? [...navigation, adminLink] : navigation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Meal Time Notifications */}
      {isAuthenticated && <MealTimeNotifications />}

      <div className="flex">
        {/* Sidebar - Only show for authenticated users */}
        {showSidebar && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Navigation with Green Gradient Background */}
          <nav className={`${
            showSidebar ? '' : ''
          } sticky top-0 z-40 ${
            isLanding || isAdminLogin
              ? 'bg-white/80 backdrop-blur-md border-b border-green-100'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg'
          }`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
              showSidebar ? '' : 'max-w-full'
            }`}>
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link to="/" className="flex items-center space-x-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isLanding || isAdminLogin
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                        : 'bg-white/20'
                    }`}>
                      <ChefHat className={`w-6 h-6 ${
                        isLanding || isAdminLogin ? 'text-white' : 'text-white'
                      }`} />
                    </div>
                    <span className={`text-xl font-bold ${
                      isLanding || isAdminLogin
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'
                        : 'text-white'
                    }`}>
                      NutriWise
                    </span>
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                  {showSidebar && (
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Menu className="w-4 h-4" />
                      <span>{sidebarOpen ? 'Hide' : 'More'}</span>
                    </button>
                  )}
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                          isLanding || isAdminLogin
                            ? isActive
                              ? 'bg-green-100 text-green-700'
                              : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                          isLanding || isAdminLogin
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                          isLanding || isAdminLogin
                            ? 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        isLanding || isAdminLogin
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                  )}
                </div>

                {/* Mobile controls */}
                <div className="md:hidden flex items-center space-x-2">
                  {/* Hamburger for sidebar when on authenticated pages */}
                  {showSidebar && (
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="p-2 rounded-lg text-white/80 hover:bg-white/10"
                    >
                      {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                  )}
                  {/* Hamburger for main menu when on landing/login */}
                  {!showSidebar && (
                    <button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className={`p-2 rounded-lg ${
                        isLanding || isAdminLogin
                          ? 'text-gray-600 hover:bg-green-50'
                          : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && !showSidebar && (
              <div className={`md:hidden border-t ${
                isLanding || isAdminLogin
                  ? 'border-green-100 bg-white'
                  : 'border-green-300 bg-green-600'
              }`}>
                <div className={`px-4 py-2 space-y-1 ${
                  isLanding || isAdminLogin ? '' : ''
                }`}>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          isLanding || isAdminLogin
                            ? isActive
                              ? 'bg-green-100 text-green-700'
                              : 'text-gray-600 hover:bg-green-50'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          isLanding || isAdminLogin
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white mt-2'
                            : 'text-white/80 hover:text-white hover:bg-white/10 mt-2'
                        }`}
                      >
                        <User className="w-5 h-5" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          isLanding || isAdminLogin
                            ? 'text-gray-600 hover:bg-green-50 mt-2'
                            : 'text-white/80 hover:text-white hover:bg-white/10 mt-2'
                        }`}
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isLanding || isAdminLogin
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white mt-2'
                          : 'text-white/80 hover:text-white hover:bg-white/10 mt-2'
                      }`}
                    >
                      <LogIn className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </nav>

          {/* Main Content Area */}
          <main className="flex-1">
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
      </div>
    </div>
  );
}