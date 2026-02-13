"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Users,
  ClipboardCheck,
  TrendingUp,
  MessageSquare,
  Eye,
  FileText,
  PlusCircle,
} from "lucide-react";

/* MOCK DATA */
const stats = {
  assignedStudents: 18,
  completedReviews: 42,
  avgProgress: "68%",
  testsCreated: 9,
};

const students = [
  {
    id: "1",
    name: "Amit Sharma",
    skill: "DSA",
    progress: "70%",
    status: "On Track",
  },
  {
    id: "2",
    name: "Neha Verma",
    skill: "Web Dev",
    progress: "55%",
    status: "Needs Attention",
  },
  {
    id: "3",
    name: "Rohit Singh",
    skill: "ML",
    progress: "80%",
    status: "Excellent",
  },
];

const recentTests = [
  { id: "t1", title: "DSA Weekly Test", avgScore: "62%" },
  { id: "t2", title: "Web Development Quiz", avgScore: "71%" },
  { id: "t3", title: "ML Basics Assessment", avgScore: "55%" },
];

export default function MentorDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "mentor")) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading mentor dashboard...
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
          Mentor students, evaluate skills & design assessments
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex flex-wrap gap-4">
        <QuickAction
          icon={<PlusCircle />}
          label="Create Test"
          onClick={() => router.push("/dashboard/mentor/tests/create")}
        />
        <QuickAction
          icon={<FileText />}
          label="View Tests"
          onClick={() => router.push("/dashboard/mentor/tests")}
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard icon={<Users />} title="Assigned Students" value={stats.assignedStudents} />
        <StatCard icon={<ClipboardCheck />} title="Reviews Completed" value={stats.completedReviews} />
        <StatCard icon={<TrendingUp />} title="Avg Progress" value={stats.avgProgress} highlight />
        <StatCard icon={<FileText />} title="Tests Created" value={stats.testsCreated} />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* STUDENTS */}
        <div className="lg:col-span-2 rounded-xl border border-slate-700 bg-white/5">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-xl font-semibold">
              Assigned Students
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3">Focus Skill</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-slate-700 hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3 text-center">{s.skill}</td>
                  <td className="px-4 py-3 text-center">{s.progress}</td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-4 py-3 flex gap-3 justify-center">
                    <button
                      onClick={() => router.push(`/mentor/students/${s.id}`)}
                      className="text-slate-300 hover:text-white"
                    >
                      <Eye size={16} />
                    </button>

                    <button className="text-indigo-400 hover:text-indigo-300">
                      <MessageSquare size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RECENT TESTS */}
        <div className="rounded-xl border border-slate-700 bg-white/5">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-xl font-semibold">
              Recent Tests
            </h2>
          </div>

          <ul className="divide-y divide-slate-700 text-sm">
            {recentTests.map((t) => (
              <li
                key={t.id}
                className="px-6 py-4 flex justify-between"
              >
                <span>{t.title}</span>
                <span className="text-slate-400">
                  Avg: {t.avgScore}
                </span>
              </li>
            ))}
          </ul>
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
          ? "border-indigo-500/40 bg-indigo-500/10"
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

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Excellent"
      ? "bg-green-500/10 text-green-400"
      : status === "On Track"
      ? "bg-blue-500/10 text-blue-400"
      : "bg-yellow-500/10 text-yellow-400";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}
    >
      {status}
    </span>
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
