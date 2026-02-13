"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const students = [
  {
    id: "s1",
    name: "Amit Sharma",
    branch: "CSE",
    readiness: 78,
    mentor: "Rakesh Kumar",
  },
  {
    id: "s2",
    name: "Neha Verma",
    branch: "IT",
    readiness: 65,
    mentor: "Neha Singh",
  },
  {
    id: "s3",
    name: "Rohit Singh",
    branch: "CSE",
    readiness: 82,
    mentor: "Amit Verma",
  },
];

const CUTOFF = 70;

export default function TPOShortlistPage() {
  const shortlisted = students.filter((s) => s.readiness >= CUTOFF);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold">Placement Shortlist</h1>
        <p className="text-sm text-gray-400">
          Students eligible based on readiness score.
        </p>
      </div>

      {/* CUTOFF INFO */}
      <div className="border border-white/10 rounded-lg bg-white/5 p-4 text-sm">
        <p>
          <span className="text-gray-400">Eligibility Cutoff:</span>{" "}
          <span className="text-indigo-400 font-medium">{CUTOFF}%</span>
        </p>
        <p className="text-gray-400 mt-1">
          Only students meeting or exceeding cutoff are shortlisted.
        </p>
      </div>

      {/* SHORTLIST TABLE */}
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
              <th className="text-left px-4 py-3">Branch</th>
              <th className="text-left px-4 py-3">Readiness</th>
              <th className="text-left px-4 py-3">Mentor</th>
              <th className="text-right px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {shortlisted.map((s) => (
              <tr
                key={s.id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3">{s.branch}</td>
                <td className="px-4 py-3">{s.readiness}%</td>
                <td className="px-4 py-3">{s.mentor}</td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                    <CheckCircle size={14} />
                    Shortlisted
                  </span>
                </td>
              </tr>
            ))}

            {shortlisted.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center px-4 py-6 text-gray-400"
                >
                  No students meet the cutoff criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
