"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  School,
  Calendar,
  Loader2,
} from "lucide-react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import api from "@/lib/api";

export default function StudentRegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { name, email, password, branch, year } = form;

    if (!name || !email || !password || !branch || !year) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ CREATE USER IN FIREBASE
      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2️⃣ GET FIREBASE TOKEN
      const firebaseToken = await cred.user.getIdToken(true);

      // 3️⃣ SEND TOKEN + DATA TO BACKEND
      const res = await api.post("/api/auth/firebase", {
        firebaseToken,
        name,
        branch,
        year: Number(year),
      });

      const { token } = res.data.data;

      // 4️⃣ STORE JWT
      localStorage.setItem("token", token);

      // 5️⃣ REDIRECT
      router.replace("/dashboard/student");

    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already registered");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters");
      } else {
        setError(err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/70 backdrop-blur border border-slate-800 p-8 shadow-xl">

        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="h-12 w-12 rounded-full bg-indigo-600/20 flex items-center justify-center">
            <GraduationCap className="text-indigo-500" />
          </div>
          <h1 className="text-2xl font-semibold text-white">
            Student Registration
          </h1>
          <p className="text-sm text-slate-400 text-center">
            Create your student account to track placement readiness
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          <div className="relative">
            <School className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              name="branch"
              placeholder="Branch (e.g. CSE, IT, AI)"
              value={form.branch}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-indigo-600 outline-none"
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white py-2 font-medium disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create Student Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-indigo-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
