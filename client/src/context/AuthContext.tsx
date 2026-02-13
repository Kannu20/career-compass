"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { setToken, getToken, removeToken } from "@/lib/auth";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "mentor" | "tpo" | "admin";
  roleStatus?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔥 AUTH BOOTSTRAP (ON APP LOAD)
  useEffect(() => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    // 🔥 SYNC AXIOS HEADER
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api
      .get("/api/user/me")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        removeToken();
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🔥 CENTRAL REDIRECT LOGIC (ONLY PLACE)
  useEffect(() => {
    if (loading || !user) return;

    if (user.roleStatus === "pending") {
      router.replace("/approval-pending");
      return;
    }

    if (user.role === "student") {
      router.replace("/dashboard/student");
    } else if (user.role === "mentor") {
      router.replace("/dashboard/mentor");
    } else if (user.role === "tpo") {
      router.replace("/dashboard/tpo");
    } else if (user.role === "admin") {
      router.replace("/admin/dashboard");
    }
  }, [user, loading, router]);

  // 🔥 LOGIN
  const login = async (email: string, password: string) => {
    const res = await api.post("/api/auth/login", { email, password });
    const { token, user } = res.data.data;

    setToken(token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);
  };

  // 🔥 LOGOUT (FULL RESET)
  const logout = () => {
    removeToken();
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
