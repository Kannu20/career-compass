"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
    </motion.div>
  );
}
