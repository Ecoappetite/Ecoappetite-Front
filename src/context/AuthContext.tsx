import { createContext, useState, useEffect, ReactNode } from "react";
import { isAuthenticated, logout } from "../services/authService";

interface AuthContextType {
  isAuth: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
