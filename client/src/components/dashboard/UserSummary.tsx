"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

interface UserSummaryProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function UserSummary({ user }: UserSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-white"
    >
      <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name} 👋</h2>
      <p className="text-gray-300">Role: {user?.role}</p>
      <p className="text-gray-300">Email: {user?.email}</p>
    </motion.div>
  );
}
