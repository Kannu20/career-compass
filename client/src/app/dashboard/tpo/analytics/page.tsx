"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Users,
  TrendingUp,
  Building2,
  GraduationCap,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

/* ---------------- MOCK DATA ---------------- */

const overview = {
  totalStudents: 1800,
  placedStudents: 1296,
  placementRate: "72%",
  avgPackage: "6.2 LPA",
};

const batchData = [
  { batch: "2024", placed: 420 },
  { batch: "2025", placed: 610 },
  { batch: "2026", placed: 266 },
];

const companyData = [
  { name: "TCS", hires: 180 },
  { name: "Infosys", hires: 150 },
  { name: "Accenture", hires: 95 },
  { name: "Amazon", hires: 60 },
];

const pieData = [
  { name: "Placed", value: 1296 },
  { name: "Unplaced", value: 504 },
];

const COLORS = ["#22c55e", "#ef4444"];

/* ---------------- PAGE ---------------- */

export default function TPOAnalyticsPage() {
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
        Loading analytics...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-slate-900 to-black text-white space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Placement Analytics 📊
        </h1>
        <p className="text-slate-400">
          Visual insights into placement performance
        </p>
      </div>

      {/* OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users />} title="Total Students" value={overview.totalStudents} />
        <StatCard icon={<GraduationCap />} title="Placed Students" value={overview.placedStudents} />
        <StatCard icon={<TrendingUp />} title="Placement Rate" value={overview.placementRate} highlight />
        <StatCard icon={<Building2 />} title="Avg Package" value={overview.avgPackage} />
      </div>

      {/* BAR CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Batch-wise */}
        <div className="p-6 rounded-xl bg-white/5 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4">
            Batch-wise Placements
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={batchData}>
              <XAxis dataKey="batch" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="placed" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Company-wise */}
        <div className="p-6 rounded-xl bg-white/5 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4">
            Top Hiring Companies
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hires" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="p-6 rounded-xl bg-white/5 border border-slate-700 max-w-xl">
        <h2 className="text-lg font-semibold mb-4">
          Placement Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------------- COMPONENT ---------------- */

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
