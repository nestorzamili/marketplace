'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    try {
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('auth_user');
    }
    setIsLoading(false);
  }, []);

  const signUp = async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUsers = getStoredUsers();
      const userExists = existingUsers.some(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );

      if (userExists) {
        return { success: false, message: 'Email sudah terdaftar' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date().toISOString(),
      };

      // Store user credentials (in real app, password would be hashed)
      const userData = { ...newUser, password };
      const updatedUsers = [...existingUsers, userData];
      localStorage.setItem('users_db', JSON.stringify(updatedUsers));

      // Set as current user
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));

      return { success: true, message: 'Pendaftaran berhasil' };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, message: 'Terjadi kesalahan saat mendaftar' };
    }
  };

  const signIn = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingUsers = getStoredUsers();
      const foundUser: StoredUser | undefined = existingUsers.find(
        (u: StoredUser) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );

      if (!foundUser) {
        return { success: false, message: 'Email atau kata sandi salah' };
      }

      // Remove password from user object before storing
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));

      return { success: true, message: 'Berhasil masuk' };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, message: 'Terjadi kesalahan saat masuk' };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const getStoredUsers = (): StoredUser[] => {
    try {
      const stored = localStorage.getItem('users_db');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
