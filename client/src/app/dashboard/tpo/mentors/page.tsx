"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Link from "next/link";

const mentors = [
  {
    id: "m1",
    name: "Rakesh Kumar",
    students: 28,
    avgReadiness: 72,
    status: "Good",
  },
  {
    id: "m2",
    name: "Neha Singh",
    students: 34,
    avgReadiness: 61,
    status: "Needs Attention",
  },
  {
    id: "m3",
    name: "Amit Verma",
    students: 22,
    avgReadiness: 78,
    status: "Excellent",
  },
];

export default function TPOMentorsPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold">Mentor Performance</h1>
        <p className="text-sm text-gray-400">
          Monitor mentor effectiveness across batches.
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
              <th className="text-left px-4 py-3">Mentor</th>
              <th className="text-left px-4 py-3">Students</th>
              <th className="text-left px-4 py-3">Avg Readiness</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {mentors.map((m) => (
              <tr
                key={m.id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3">{m.name}</td>
                <td className="px-4 py-3">{m.students}</td>
                <td className="px-4 py-3">{m.avgReadiness}%</td>
                <td className="px-4 py-3">
                  <StatusBadge status={m.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/dashboard/tpo/mentors/${m.id}`}
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

/* ---------- HELPERS ---------- */

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Excellent: "bg-green-500/15 text-green-400",
    Good: "bg-blue-500/15 text-blue-400",
    "Needs Attention": "bg-yellow-500/15 text-yellow-400",
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
