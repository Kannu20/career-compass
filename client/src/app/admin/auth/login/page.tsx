"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Mail, Lock, Loader2 } from "lucide-react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import api from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 EMAIL / PASSWORD LOGIN
  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const cred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseToken = await cred.user.getIdToken(true);

      const res = await api.post("/api/auth/firebase", {
        firebaseToken,
      });

      const { user, token } = res.data.data;

      if (user.role !== "admin") {
        throw new Error("Unauthorized admin access");
      }

      localStorage.setItem("token", token);
      router.replace("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setError("");

    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const firebaseToken = await result.user.getIdToken(true);

      const res = await api.post("/api/auth/firebase", {
        firebaseToken,
      });

      const { user, token } = res.data.data;

      if (user.role !== "admin") {
        throw new Error("Unauthorized admin access");
      }

      localStorage.setItem("token", token);
      router.replace("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Google admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-white">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-indigo-600/20 flex items-center justify-center">
            <Shield />
          </div>
          <h1 className="text-2xl font-bold mt-3">Admin Login</h1>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded px-3 py-2 text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded bg-black/40 border border-white/20"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 px-3 py-2 rounded bg-black/40 border border-white/20"
        />

        {/* Login */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-semibold mb-4"
        >
          {loading && <Loader2 className="animate-spin h-4 w-4" />}
          Login as Admin
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an admin account?{" "}
          <span
            onClick={() => router.push("/admin/auth/register")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
