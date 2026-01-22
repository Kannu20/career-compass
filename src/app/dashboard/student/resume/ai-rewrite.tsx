"use client";

import { motion } from "framer-motion";
import { Sparkles, Check, X } from "lucide-react";
import { useState } from "react";

const originalBullets = [
  "Worked on a web application using React.",
  "Handled backend APIs.",
  "Used MongoDB database.",
];

export default function AIResumeRewrite() {
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrittenBullets, setRewrittenBullets] = useState<string[] | null>(
    null
  );

  const handleRewrite = async () => {
    setIsRewriting(true);
    setRewrittenBullets(null);

    // Simulate AI delay
    await new Promise((r) => setTimeout(r, 2000));

    // Mock AI output (ATS-friendly)
    setRewrittenBullets([
      "Developed a scalable web application using React, improving UI responsiveness and performance.",
      "Designed and implemented RESTful backend APIs to support core business workflows.",
      "Integrated MongoDB for efficient data storage and retrieval with optimized queries.",
    ]);

    setIsRewriting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border border-white/10 rounded-xl bg-white/5 p-6 space-y-6"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="font-medium flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-400" />
          AI Resume Rewrite
        </h2>

        <button
          onClick={handleRewrite}
          disabled={isRewriting}
          className={`text-sm px-4 py-1.5 rounded-lg transition
            ${
              isRewriting
                ? "bg-white/10 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
        >
          {isRewriting ? "Rewriting..." : "Rewrite with AI"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BEFORE */}
        <div>
          <p className="text-xs text-gray-400 mb-2">Before (Original)</p>
          <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
            {originalBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        {/* AFTER */}
        <div>
          <p className="text-xs text-gray-400 mb-2">After (AI Optimized)</p>

          {isRewriting && (
            <p className="text-sm text-gray-400">
              AI is optimizing your bullets for ATS...
            </p>
          )}

          {!isRewriting && rewrittenBullets && (
            <ul className="text-sm text-gray-300 space-y-3">
              {rewrittenBullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start justify-between gap-3"
                >
                  <span>{b}</span>

                  <div className="flex gap-2">
                    <button
                      title="Accept"
                      className="text-green-400 hover:text-green-300 transition"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      title="Reject"
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!isRewriting && !rewrittenBullets && (
            <p className="text-sm text-gray-400">
              Click “Rewrite with AI” to see optimized bullets.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
