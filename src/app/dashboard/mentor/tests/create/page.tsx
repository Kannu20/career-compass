"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Save, ArrowLeft } from "lucide-react";

export default function CreateTestPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    skill: "",
    difficulty: "Easy",
    duration: "",
    totalMarks: "",
    status: "Draft",
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== "mentor")) {
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

    // 🔥 BACKEND API CALL LATER
    console.log("Create Test:", form);

    router.push("/dashboard/mentor/tests");
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-slate-900 to-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-slate-800"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            Create New Test 📝
          </h1>
          <p className="text-slate-400">
            Design a skill assessment for students
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-6 bg-white/5 border border-slate-700 rounded-xl p-6"
      >

        {/* TITLE */}
        <Input
          label="Test Title"
          name="title"
          placeholder="e.g. DSA Weekly Assessment"
          value={form.title}
          onChange={handleChange}
        />

        {/* SKILL */}
        <Select
          label="Skill / Subject"
          name="skill"
          value={form.skill}
          onChange={handleChange}
          options={["DSA", "Web Development", "Machine Learning", "Aptitude"]}
        />

        {/* DIFFICULTY */}
        <Select
          label="Difficulty Level"
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          options={["Easy", "Medium", "Hard"]}
        />

        {/* DURATION */}
        <Input
          label="Duration (minutes)"
          name="duration"
          type="number"
          placeholder="e.g. 60"
          value={form.duration}
          onChange={handleChange}
        />

        {/* MARKS */}
        <Input
          label="Total Marks"
          name="totalMarks"
          type="number"
          placeholder="e.g. 100"
          value={form.totalMarks}
          onChange={handleChange}
        />

        {/* STATUS */}
        <Select
          label="Test Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={["Draft", "Active"]}
        />

        {/* ACTIONS */}
        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            <Save size={16} />
            Save Test
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard/mentor")}
            className="px-6 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- REUSABLE INPUTS ---------------- */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm mb-1 text-slate-300">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 outline-none"
      />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="block text-sm mb-1 text-slate-300">
        {label}
      </label>
      <select
        {...props}
        required
        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
      >
        <option value="">Select</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
