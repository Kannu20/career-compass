"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const mockQuestions = [
  {
    id: 1,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correct: 1,
  },
  {
    id: 2,
    question: "Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1,
  },
];

export default function TestAttemptPage() {
  const { testId } = useParams();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60 * 10); // 10 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const question = mockQuestions[current];

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Test: {String(testId).toUpperCase()}
        </h1>
        <span className="text-red-400 font-semibold">
          ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </span>
      </div>

      {/* Question */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
      >
        <h2 className="text-lg font-semibold mb-4">
          Q{current + 1}. {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                const newAns = [...answers];
                newAns[current] = idx;
                setAnswers(newAns);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                answers[current] === idx
                  ? "bg-indigo-600 border-indigo-600"
                  : "border-white/20 hover:bg-white/10"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
          className="px-4 py-2 bg-white/10 rounded disabled:opacity-40"
        >
          Previous
        </button>

        {current < mockQuestions.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="px-4 py-2 bg-indigo-600 rounded"
          >
            Next
          </button>
        ) : (
          <button className="px-4 py-2 bg-green-600 rounded">
            Submit Test
          </button>
        )}
      </div>
    </div>
  );
}
