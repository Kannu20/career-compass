"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function CreateDrivePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    company: "",
    role: "",
    batch: "",
    minCGPA: "",
    status: "Upcoming",
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== "tpo")) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 🔥 API CALL LATER
    console.log("Create Drive:", form);

    router.push("/dashboard/tpo/drives");
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-slate-900 to-black text-white">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Create Placement Drive 💼
        </h1>
        <p className="text-slate-400">
          Define company, eligibility & schedule
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-6 bg-white/5 border border-slate-700 rounded-xl p-6"
      >

        {/* COMPANY */}
        <div>
          <label className="block text-sm mb-1 text-slate-300">
            Company Name
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            placeholder="e.g. Infosys"
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 outline-none"
          />
        </div>

        {/* ROLE */}
        <div>
          <label className="block text-sm mb-1 text-slate-300">
            Job Role
          </label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            placeholder="e.g. Software Engineer"
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 outline-none"
          />
        </div>

        {/* BATCH */}
        <div>
          <label className="block text-sm mb-1 text-slate-300">
            Eligible Batch
          </label>
          <select
            name="batch"
            value={form.batch}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
          >
            <option value="">Select Batch</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>

        {/* MIN CGPA */}
        <div>
          <label className="block text-sm mb-1 text-slate-300">
            Minimum CGPA
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            name="minCGPA"
            value={form.minCGPA}
            onChange={handleChange}
            required
            placeholder="e.g. 7.0"
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 outline-none"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="block text-sm mb-1 text-slate-300">
            Drive Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            <Save size={16} />
            Create Drive
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard/tpo/drives")}
            className="px-6 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
