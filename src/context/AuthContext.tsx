// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import api from "@/lib/api";
// import { setToken, removeToken, getToken } from "@/lib/auth";
// import { useRouter } from "next/navigation";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: "student" | "mentor" | "tpo";
//   roleStatus: "approved" | "pending";
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // 🔄 Load user on refresh
//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     api
//       .get("/api/user/me")
//       .then((res) => setUser(res.data.data))
//       .catch(() => removeToken())
//       .finally(() => setLoading(false));
//   }, []);



//   const login = async (email: string, password: string) => {
//     const res = await api.post("/api/auth/login", { email, password });
//     const { token, user } = res.data.data;

//     setToken(token);
//     setUser(user);

//      // 🔥 ROLE BASED REDIRECT
//   if (user.role === "student") {
//     window.location.href = "/dashboard/student";
//   } else if (user.role === "mentor") {
//     window.location.href = "/dashboard/mentor";
//   } else if (user.role === "tpo") {
//     window.location.href = "/dashboard/tpo";
//   }
//   };

//   const logout = () => {
//     removeToken();
//     setUser(null);
//     router.replace("/auth/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }
//   return ctx;
// };

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

  // 🔥 AUTH BOOTSTRAP (MOST IMPORTANT)
  useEffect(() => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/api/user/me")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        removeToken();
        setUser(null);
      })
      .finally(() => {
        setLoading(false); // 🔥 THIS WAS THE ISSUE
      });
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/api/auth/login", { email, password });
    const { token, user } = res.data.data;

    setToken(token);
    setUser(user);

    useEffect(() => {
  if (loading || !user) return;

  if (user.roleStatus === "pending") {
    router.replace("/approval-pending");
    return;
  }

  if (user.role === "student") {
    router.replace("/student/dashboard");
  } else if (user.role === "mentor") {
    router.replace("/mentor/dashboard");
  } else if (user.role === "tpo") {
    router.replace("/tpo/dashboard");
  } else if (user.role === "admin") {
    router.replace("/admin/dashboard");
  }
}, [user, loading]);

  };

  const logout = () => {
    removeToken();
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
