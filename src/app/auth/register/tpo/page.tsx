"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Building2,
  Phone,
  Briefcase,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import api from "@/lib/api";

export default function TPORegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    designation: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, college, designation, phone } = form;

    if (!name || !email || !password || !college || !designation || !phone) {
      setError("All fields are mandatory for TPO registration");
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

      // 3️⃣ SEND TOKEN + TPO DATA TO BACKEND
      await api.post("/api/auth/firebase", {
        firebaseToken,
        name,
        requestedRole: "tpo", // ⚠️ lowercase (important)
        college,
        designation,
        phone,
      });

      // 4️⃣ SHOW SUCCESS
      setSuccess(
        "TPO registration submitted successfully. Admin verification is required."
      );

      // 5️⃣ REDIRECT TO APPROVAL PAGE
      setTimeout(() => {
        router.replace("/approval-pending");
      }, 1800);

    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already registered");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters");
      } else {
        setError(err.message || "TPO registration failed");
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
          <div className="h-12 w-12 rounded-full bg-orange-600/20 flex items-center justify-center">
            <ShieldCheck className="text-orange-500" />
          </div>
          <h1 className="text-2xl font-semibold text-white">
            TPO Registration
          </h1>
          <p className="text-sm text-slate-400 text-center">
            Official Training & Placement Officer registration.
            Admin verification required.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-4 text-sm text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2">
            {success}
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
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-orange-600 outline-none"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="email"
              name="email"
              placeholder="Official Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-orange-600 outline-none"
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
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-orange-600 outline-none"
            />
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              name="college"
              placeholder="College / University Name"
              value={form.college}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-orange-600 outline-none"
            />
          </div>

          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              name="designation"
              placeholder="Designation (TPO / Placement Head)"
              value={form.designation}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-orange-600 outline-none"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Official Contact Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-orange-600 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition text-white py-2 font-medium disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Apply as TPO
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-orange-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

