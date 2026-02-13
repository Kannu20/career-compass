"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Users,
  Clock,
  GraduationCap,
  Building2,
} from "lucide-react";

type Stats = {
  totalUsers: number;
  pendingApprovals: number;
  mentors: number;
  tpos: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const approvalData = (stats: Stats) => [
    {
      name: "Approved",
      count:
        stats.totalUsers - stats.pendingApprovals,
    },
    {
      name: "Pending",
      count: stats.pendingApprovals,
    },
  ];

  const ROLE_COLORS = {
    students: "#6366F1", // indigo
    mentors: "#10B981",  // emerald
    tpos: "#06B6D4",     // cyan
  };
  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/stats");
      setStats(res.data.data);
    } catch (err) {
      console.error("Failed to load admin stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("TOKEN:", localStorage.getItem("token"));
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-white/10 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <p className="text-red-400">
        Failed to load dashboard stats
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Platform overview & moderation control
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users />}
          color="bg-indigo-600"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon={<Clock />}
          color="bg-orange-600"
        />
        <StatCard
          title="Mentors Approved"
          value={stats.mentors}
          icon={<GraduationCap />}
          color="bg-emerald-600"
        />
        <StatCard
          title="TPOs Approved"
          value={stats.tpos}
          icon={<Building2 />}
          color="bg-cyan-600"
        />
      </div>

      {/* Approval Status Overview */}
      <div className="rounded-xl bg-white/10 border border-white/20 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Approval Status Overview
        </h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={approvalData(stats)}>
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
              />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  background: "#020617",
                  border: "1px solid #1e293b",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
                fill="#6366F1"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


      {/* User Role Distribution */}
      <div className="rounded-xl bg-white/10 border border-white/20 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          User Role Distribution
        </h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  {
                    name: "Students",
                    value:
                      stats.totalUsers -
                      (stats.mentors + stats.tpos),
                  },
                  { name: "Mentors", value: stats.mentors },
                  { name: "TPOs", value: stats.tpos },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                <Cell fill={ROLE_COLORS.students} />
                <Cell fill={ROLE_COLORS.mentors} />
                <Cell fill={ROLE_COLORS.tpos} />
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#767a8cff",
                  border: "1px solid #1e293b",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-white/10 border border-white/20 p-5 flex items-center gap-4">
      <div
        className={`h-12 w-12 flex items-center justify-center rounded-lg text-white ${color}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
