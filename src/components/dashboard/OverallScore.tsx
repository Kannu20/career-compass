"use client";

import ScoreRing from "./ScoreRing";
import { motion } from "framer-motion";

export default function OverallScore({ score }: { score: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 flex items-center gap-6"
    >
      <ScoreRing score={score} />
      <div>
        <p className="text-gray-400">Overall Readiness</p>
        <p className="text-5xl font-bold text-indigo-400">
          {Math.round(score)}%
        </p>
      </div>
    </motion.div>
  );
}
