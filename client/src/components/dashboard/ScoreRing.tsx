"use client";

import { motion } from "framer-motion";

export default function ScoreRing({ score }: { score: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-40 h-40">
      <svg width="160" height="160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#1f2937"
          strokeWidth="10"
          fill="none"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#6366f1"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1 }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
        {score}%
      </div>
    </div>
  );
}
