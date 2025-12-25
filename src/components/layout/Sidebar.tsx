"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const menu = [
  { label: "Readiness", path: "/dashboard" },
  { label: "Tests", path: "/dashboard/tests" },
  { label: "Profile", path: "/dashboard/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-black/40 backdrop-blur-lg border-r border-white/10 p-4 hidden md:block"
    >
      <h2 className="text-xl font-bold text-white mb-6">Menu</h2>

      <nav className="space-y-2">
        {menu.map((item) => {
          const active = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </motion.aside>
  );
}
