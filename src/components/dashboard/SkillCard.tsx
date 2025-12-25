"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  score: number;
}

export default function SkillCard({ title, score }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg p-4 rounded-xl text-white shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="w-full bg-gray-700 h-2 rounded">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8 }}
          className="h-2 bg-indigo-500 rounded"
        />
      </div>
      <p className="text-sm text-gray-300 mt-2">{score}% complete</p>
    </motion.div>
  );
}
