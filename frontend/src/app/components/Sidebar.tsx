import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  Calculator,
  Scale,
  ArrowRightLeft,
  Leaf,
  Heart,
  Pill,
  BookOpen,
  ChevronDown,
  ChevronUp,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const menuItems = [
    { name: 'Food Analyzer', href: '/analyzer', icon: Calculator },
    { name: 'Comparison', href: '/comparison', icon: Scale },
    { name: 'Food Swaps', href: '/swaps', icon: ArrowRightLeft },
    { name: 'Seasonal Suggestions', href: '/seasonal', icon: Leaf },
    { name: 'Health Guide', href: '/health', icon: Heart },
    { name: 'Vitamin Sources', href: '/vitamins', icon: Pill },
    { name: 'Nutrition Tips', href: '/tips', icon: BookOpen },
  ];

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-green-200 transform transition-transform duration-300 ease-in-out z-50 pt-16 flex flex-col shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-green-200">
          <span className="text-lg font-bold text-green-700">Menu</span>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => onClose?.()}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? 'bg-green-100 text-green-700 font-semibold'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-green-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
          {user && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-xs text-gray-600">Logged in as</p>
              <p className="text-sm font-semibold text-gray-700 truncate">
                {user.email}
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
