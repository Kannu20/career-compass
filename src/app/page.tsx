"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react"; // ✅ added

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">

      {/* 🔐 ADMIN BUTTON (TOP RIGHT) */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() =>
            window.open("/admin/auth/register", "_blank")
          }
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm font-medium border border-white/20 cursor-pointer"
        >
          <Shield size={16} />
          Admin
        </button>
      </div>

      {/* HERO */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          CareerCompass 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-2xl mb-8 text-lg"
        >
          Track your placement readiness, visualize your skills,
          and improve consistently with data-driven insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <button
            onClick={() =>
              window.open("/auth/login", "_blank")
            }

            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
          >
            Login
          </button>

          <button
            onClick={() =>
              window.open("/auth/register", "_blank")
            }

            className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition font-semibold"
          >
            Register
          </button>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16 bg-white/5 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "📊 Visual Skill Analytics",
            "🔥 Weekly Progress & Streaks",
            "🎯 Actionable Improvement Steps",
          ].map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-xl p-6 text-center"
            >
              <p className="text-lg font-semibold">{feature}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} CareerCompass. Built for growth.
      </footer>
    </div>
  );
}
