"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const students = [
  {
    id: "1",
    name: "Amit Sharma",
    focus: "DSA",
    readiness: 70,
    status: "On Track",
  },
  {
    id: "2",
    name: "Neha Verma",
    focus: "Web Development",
    readiness: 55,
    status: "Needs Attention",
  },
  {
    id: "3",
    name: "Rohit Singh",
    focus: "Machine Learning",
    readiness: 80,
    status: "Excellent",
  },
];

export default function MentorStudentsPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold">Assigned Students</h1>
        <p className="text-sm text-gray-400">
          Monitor student readiness and take action.
        </p>
      </div>

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border border-white/10 rounded-xl bg-white/5 overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="text-left px-4 py-3">Student</th>
              <th className="text-left px-4 py-3">Focus Skill</th>
              <th className="text-left px-4 py-3">Readiness</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3 text-gray-300">{s.focus}</td>
                <td className="px-4 py-3">{s.readiness}%</td>
                <td className="px-4 py-3">
                  <StatusBadge status={s.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/dashboard/mentor/students/${s.id}`}
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

/* ---------- SMALL HELPER ---------- */

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "On Track": "bg-blue-500/15 text-blue-400",
    "Needs Attention": "bg-yellow-500/15 text-yellow-400",
    "Excellent": "bg-green-500/15 text-green-400",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs ${
        styles[status] || "bg-white/10 text-gray-300"
      }`}
    >
      {status}
    </span>
  );
}
