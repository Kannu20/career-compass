"use client";

import { motion } from "framer-motion";

const steps = [
  "Practice 2 DSA problems daily",
  "Revise OS & DBMS fundamentals",
  "Add 1 strong project to resume",
  "Update LinkedIn & GitHub",
];

export default function NextSteps() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/10 backdrop-blur-lg p-5 rounded-xl text-white"
    >
      <h3 className="text-lg font-semibold mb-3">Next Steps 🚀</h3>
      <ul className="space-y-2 text-gray-300">
        {steps.map((step, i) => (
          <motion.li
            key={i}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            • {step}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
