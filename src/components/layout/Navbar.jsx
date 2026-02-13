"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between bg-black/40 backdrop-blur-lg border-b border-white/10">
      <h1 className="text-xl font-bold text-white">CareerCompass</h1>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition"
        >
          <span>{user?.name}</span>
          <span className="text-xs text-gray-400">({user?.role})</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-40 bg-gray-900 border border-white/10 rounded-lg shadow-lg overflow-hidden"
            >
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-400 hover:bg-white/10 transition"
              >
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
