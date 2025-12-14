"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './use-toast';

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, fullName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    } finally {
        setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    // This is a mock login. In a real app, you'd call a backend.
    if (email && pass) {
        const mockUser: User = {
            uid: 'mock-uid-' + Date.now(),
            email: email,
            displayName: 'Mock User',
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
    } else {
        throw new Error('Invalid email or password');
    }
  };

  const signup = async (email: string, pass: string, fullName: string) => {
     // This is a mock signup.
     if (email && pass && fullName) {
        const mockUser: User = {
            uid: 'mock-uid-' + Date.now(),
            email: email,
            displayName: fullName,
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
    } else {
        throw new Error('Please fill out all fields.');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/login');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
