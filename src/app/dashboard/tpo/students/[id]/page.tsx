"use client";

import { motion } from "framer-motion";
import AssignTask from "./assign-task";

export default function MentorStudentDetailPage() {
  // TEMP STATIC DATA (backend later)
  const student = {
    name: "Amit Sharma",
    email: "amit@gmail.com",
    readiness: 70,
    skills: {
      DSA: 65,
      "Core CS": 70,
      Projects: 75,
      Resume: 80,
    },
    weakAreas: ["DSA", "Operating Systems"],
    lastActive: "2 days ago",
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold">{student.name}</h1>
        <p className="text-sm text-gray-400">
          {student.email} · Last active {student.lastActive}
        </p>
      </div>

      {/* OVERALL READINESS */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border border-white/10 rounded-xl bg-white/5 p-6"
      >
        <p className="text-sm text-gray-400 mb-1">Overall Readiness</p>
        <p className="text-3xl font-semibold text-indigo-400">
          {student.readiness}%
        </p>
      </motion.div>

      {/* SKILL BREAKDOWN */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="border border-white/10 rounded-xl bg-white/5 p-6"
      >
        <h2 className="font-medium mb-4">Skill Breakdown</h2>

        <div className="space-y-3">
          {Object.entries(student.skills).map(([skill, value]) => (
            <div key={skill}>
              <div className="flex justify-between text-sm mb-1">
                <span>{skill}</span>
                <span className="text-gray-400">{value}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded">
                <div
                  className="h-2 rounded bg-indigo-500"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* WEAK AREAS */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border border-white/10 rounded-xl bg-white/5 p-6"
      >
        <h2 className="font-medium mb-3">Needs Attention</h2>

        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
          {student.weakAreas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      </motion.div>
      <AssignTask/>

    </div>
  );
}
