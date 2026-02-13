"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "firebase/auth";

import {
  User,
  Mail,
  Lock,
  Briefcase,
  Link2,
  Award,
  Loader2,
} from "lucide-react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import api from "@/lib/api";

export default function MentorRegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    expertise: "",
    experience: "",
    linkedin: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);


  // useEffect(() => {
  //       const checkStatus = async () => {
  //         try {
  //           const res = await api.get("/api/user/me");
  //           const user = res.data.data;

  //           if (user.roleStatus === "approved" && user.role === "mentor") {
  //             setSuccess(
  //               "Approved! Please logout and login again as Mentor."
  //             );
  //           }

  //           if (user.roleStatus === "rejected") {
  //             setError("Your request was rejected by admin.");
  //           }
  //         } catch { }
  //       };

  //       checkStatus();
  //     }, []);

  useEffect(() => {
  const checkStatus = async () => {
    try {
      const res = await api.get("/api/user/me");
      const user = res.data?.data;

      if (!user) return;

      // 🟡 PENDING
      if (user.roleStatus === "pending") {
        setPending(true);
        setSuccess("Your application is pending admin approval.");
      }

      // 🟢 APPROVED → AUTO LOGOUT
      if (
        user.roleStatus === "approved" &&
        (user.role === "mentor" || user.role === "tpo")
      ) {
        toast.success("Role approved! Please login again.");

        setTimeout(async () => {
          await signOut(auth);      // 🔐 Firebase logout
          localStorage.clear();    // optional but safe
          router.replace("/auth/login");
        }, 1800);
      }

      // 🔴 REJECTED
      if (user.roleStatus === "rejected") {
        setError("Your request was rejected by admin.");
        setPending(false);
      }
    } catch {
      // ignore
    }
  };

  checkStatus();
}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, expertise, experience, linkedin } = form;

    if (!name || !email || !password || !expertise || !experience) {
      setError("All required fields must be filled");
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

      // 3️⃣ SEND TOKEN + MENTOR DATA TO BACKEND
      const res = await api.post("/api/auth/firebase", {
        firebaseToken,
        name,
        requestedRole: "mentor", // ⚠️ lowercase (IMPORTANT)
        expertise,
        experience,
        linkedin,
      });

      

      // Mentor is always pending approval
      setSuccess(
        "Your mentor application has been submitted. Admin approval is required. Wait 24-48 hours."
      );

      // 4️⃣ Redirect to approval-pending (not login)
      // setTimeout(() => {
      //   router.replace("/approval-pending");
      // }, 1800);

    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already registered");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters");
      } else {
        setError(err.message || "Mentor registration failed");
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
          <div className="h-12 w-12 rounded-full bg-emerald-600/20 flex items-center justify-center">
            <Award className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-semibold text-white">
            Mentor Application
          </h1>
          <p className="text-sm text-slate-400 text-center">
            Apply as a mentor to guide students. Approval required.
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
          <div className="mb-4 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
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
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-emerald-600 outline-none"
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
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-emerald-600 outline-none"
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
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-emerald-600 outline-none"
            />
          </div>

          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              name="expertise"
              placeholder="Expertise (DSA, Web, CS, etc.)"
              value={form.expertise}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-emerald-600 outline-none"
            />
          </div>

          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <select
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-emerald-600 outline-none"
            >
              <option value="">Experience (years)</option>
              <option value="0-1">0–1 years</option>
              <option value="1-3">1–3 years</option>
              <option value="3-5">3–5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>

          <div className="relative">
            <Link2 className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn / Portfolio URL (optional)"
              value={form.linkedin}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-emerald-600 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || pending}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition text-white py-2 font-medium disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
             {pending ? "Approval Pending" : "Apply as Mentor"}
            Apply as Mentor
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-emerald-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
