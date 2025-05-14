import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import * as authService from "./auth";

interface userData {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  password?: string;
  refreshToken?: string;
  createdAt?: Date;
}

interface Props {
  children: React.ReactNode;
}

interface AuthResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  user: userData;
  message?: string;
}
interface AuthContextType {
  user: userData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  register: (userData: userData) => Promise<AuthResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<userData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user } = await authService.getProfile();
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    void checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    setUser(data.user);
    return data;
  };

  const register = async (userData: userData) => {
    const data = await authService.register(userData);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = { user, loading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
