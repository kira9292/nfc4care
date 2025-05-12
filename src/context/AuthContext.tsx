import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Doctor } from '../types';

interface AuthContextType {
  currentDoctor: Doctor | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(null);

  // Mock login function - would connect to backend in production
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation - in production this would verify credentials with backend
        if (email === 'doctor@example.com' && password === 'password') {
          setCurrentDoctor({
            id: '1',
            name: 'Dr. Martin Dubois',
            email: email
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const logout = () => {
    setCurrentDoctor(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentDoctor,
        isAuthenticated: !!currentDoctor,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};