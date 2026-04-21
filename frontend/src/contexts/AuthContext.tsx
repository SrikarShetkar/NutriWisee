import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { username: string; email: string; password: string; confirmPassword: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app start
    const storedToken = localStorage.getItem('nutriwise-token');
    const storedUser = localStorage.getItem('nutriwise-user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ email, password });

      const userData = {
        id: response.userId,
        username: email.split('@')[0], // Temporary username
        email: email,
      };

      setUser(userData);
      setToken(response.token);

      // Store in localStorage
      localStorage.setItem('nutriwise-token', response.token);
      localStorage.setItem('nutriwise-user', JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: { username: string; email: string; password: string; confirmPassword: string }) => {
    try {
      const response = await apiService.register(userData);

      const userInfo = {
        id: response.userId,
        username: userData.username,
        email: userData.email,
      };

      setUser(userInfo);
      setToken(response.token);

      // Store in localStorage
      localStorage.setItem('nutriwise-token', response.token);
      localStorage.setItem('nutriwise-user', JSON.stringify(userInfo));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    // Clear localStorage
    localStorage.removeItem('nutriwise-token');
    localStorage.removeItem('nutriwise-user');
    localStorage.removeItem('nutriwise-profile');
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
