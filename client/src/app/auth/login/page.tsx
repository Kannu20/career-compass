"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import api from "@/lib/api";
import { Loader2, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

//   const postLoginRedirect = (user: any) => {
//   if (user.roleStatus === "pending") {
//     router.replace("/approval-pending");
//     return;
//   }
//   postLoginRedirect(user);
  
// };

  const postLoginRedirect = (user: any) => {
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
};
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const firebaseToken = await cred.user.getIdToken(true);

      const res = await api.post("/api/auth/firebase", { firebaseToken });
      const { token, user } = res.data.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 🔥 LOGIN SUCCESS → REDIRECT HERE
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
      }

    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const firebaseToken = await result.user.getIdToken(true);
      const res = await api.post("/api/auth/firebase", { firebaseToken });

      const { token, user } = res.data.data;
      localStorage.setItem("token", token);

      postLoginRedirect(user);
    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white">
            Welcome Back
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Login to continue your CareerCompass journey
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-3 py-2 text-center">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white py-2 font-medium disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-xs text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full rounded-lg bg-white hover:bg-gray-200 transition text-black py-2 font-medium"
        >
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-sm text-slate-400 text-center mt-6">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/auth/register")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}
