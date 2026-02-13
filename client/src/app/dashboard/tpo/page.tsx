"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Users,
  Building2,
  BarChart3,
  Briefcase,
  GraduationCap,
  TrendingUp,
  PlusCircle,
} from "lucide-react";

export default function TPODashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "tpo")) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading TPO dashboard...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-slate-900 to-black text-white space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user.name} 👋
        </h1>
        <p className="text-slate-400">
          Central placement operations & insights
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex flex-wrap gap-4">
        <QuickAction
          icon={<PlusCircle />}
          label="Add Company"
          onClick={() => router.push("tpo/companies")}
        />
        <QuickAction
          icon={<Briefcase />}
          label="Create Drive"
          onClick={() => router.push("tpo/drives")}
        />
        <QuickAction
          icon={<GraduationCap />}
          label="Shortlist Students"
          onClick={() => router.push("tpo/students")}
        />
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users />} title="Eligible Students" value="1,240" />
        <StatCard icon={<Building2 />} title="Partner Companies" value="38" />
        <StatCard icon={<Briefcase />} title="Active Drives" value="12" />
        <StatCard icon={<TrendingUp />} title="Placement Rate" value="72%" highlight />
      </div>

      {/* MAIN SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* RECENT PLACEMENT ACTIVITY */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-slate-700 bg-white/5">
          <h2 className="text-xl font-semibold mb-4">
            Recent Placement Activity
          </h2>

          <ul className="space-y-3 text-sm text-slate-300">
            <li>🏢 Infosys drive created (Final Year)</li>
            <li>🎯 120 students shortlisted for TCS</li>
            <li>📊 Placement stats updated for 2024 batch</li>
            <li>📌 8 companies scheduled for next month</li>
          </ul>
        </div>

        {/* ACTION PANELS */}
        <div className="space-y-4">
          <ActionCard
            title="Student Management"
            desc="Eligibility, skills & shortlisting"
            btnText="Manage Students"
            onClick={() => router.push("tpo/students")}
          />

          <ActionCard
            title="Placement Analytics"
            desc="Batch-wise & company-wise stats"
            btnText="View Analytics"
            onClick={() => router.push("/dashboard/tpo/analytics")}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ icon, title, value, highlight = false }: any) {
  return (
    <div
      className={`p-6 rounded-xl border ${
        highlight
          ? "border-green-500/40 bg-green-500/10"
          : "border-slate-700 bg-white/5"
      }`}
    >
      <div className="flex items-center gap-3 text-slate-300">
        {icon}
        <span className="text-sm">{title}</span>
      </div>
      <div className="text-3xl font-bold mt-3">
        {value}
      </div>
    </div>
  );
}

function ActionCard({ title, desc, btnText, onClick }: any) {
  return (
    <div className="p-5 rounded-xl border border-slate-700 bg-white/5">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-slate-400 text-sm mb-3">{desc}</p>
      <button
        onClick={onClick}
        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white text-sm"
      >
        {btnText}
      </button>
    </div>
  );
}

function QuickAction({ icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm"
    >
      {icon}
      {label}
    </button>
  );
}
