"use client";

import { checkLoginStatus } from "@/services/authService";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyUserSession = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        try {
          const data = await checkLoginStatus();
          if (data && data.user) {
            setUser(data.user);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Failed to verify user session:", error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUserSession();
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    localStorage.setItem("authToken", authToken);
    // Set cookie for middleware (expires in 1 day)
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `authToken=${authToken};path=/;expires=${expires};SameSite=Lax`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    // Remove cookie for middleware
    document.cookie =
      "authToken=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax";
    router.push("/login");
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
