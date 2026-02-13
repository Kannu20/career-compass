"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  FileText,
  PlusCircle,
  Eye,
  Clock,
  BarChart3,
} from "lucide-react";

/* MOCK TEST DATA */
const tests = [
  {
    id: "t1",
    title: "DSA Weekly Assessment",
    skill: "DSA",
    duration: 60,
    totalMarks: 100,
    status: "Active",
  },
  {
    id: "t2",
    title: "Web Development Quiz",
    skill: "Web Dev",
    duration: 45,
    totalMarks: 50,
    status: "Draft",
  },
  {
    id: "t3",
    title: "ML Basics Test",
    skill: "ML",
    duration: 90,
    totalMarks: 100,
    status: "Closed",
  },
];

export default function MentorTestsPage() {
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
        Loading tests...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-slate-900 to-black text-white space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Tests 🧪
          </h1>
          <p className="text-slate-400">
            Manage and evaluate your assessments
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/mentor/tests/create")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-sm"
        >
          <PlusCircle size={16} />
          Create Test
        </button>
      </div>

      {/* TEST TABLE */}
      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-white/5">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3">Skill</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Marks</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tests.map((t) => (
              <tr
                key={t.id}
                className="border-t border-slate-700 hover:bg-slate-800/50"
              >
                <td className="px-4 py-3">{t.title}</td>
                <td className="px-4 py-3 text-center">{t.skill}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Clock size={14} />
                    {t.duration} min
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  {t.totalMarks}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-4 py-3 flex gap-3 justify-center">
                  <button
                    onClick={() =>
                      router.push(`/mentor/tests/${t.id}`)
                    }
                    className="text-slate-300 hover:text-white"
                    title="View Test"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    className="text-indigo-400 hover:text-indigo-300"
                    title="View Results"
                  >
                    <BarChart3 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {tests.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-slate-400"
                >
                  No tests created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Active"
      ? "bg-green-500/10 text-green-400"
      : status === "Draft"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-gray-500/10 text-gray-400";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}
    >
      {status}
    </span>
  );
}
