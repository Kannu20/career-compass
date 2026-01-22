// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     branch: "",
//     year: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     setError("");
//     setLoading(true);

//     try {
//       await api.post("/api/auth/register", {
//         name: form.name,
//         email: form.email,
//         password: form.password,
//         branch: form.branch,
//         year: Number(form.year),
//       });

//       // smooth redirect after success
//       router.replace("/auth/login");
//     } catch (err: any) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-gray-900">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 40 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="w-[380px] bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10"
//       >
//         {/* Heading */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="text-2xl font-bold text-white text-center mb-6"
//         >
//           Create Account 🚀
//         </motion.h1>

//         {/* Error */}
//         {error && (
//           <motion.p
//             initial={{ x: -10, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             className="text-red-400 text-sm mb-3 text-center"
//           >
//             {error}
//           </motion.p>
//         )}

//         {/* Inputs */}
//         <div className="space-y-3">
//           <input
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded bg-black/40 text-white outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded bg-black/40 text-white outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded bg-black/40 text-white outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <input
//             name="branch"
//             placeholder="Branch (e.g. CSE)"
//             value={form.branch}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded bg-black/40 text-white outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <input
//             name="year"
//             type="number"
//             placeholder="Year (e.g. 4)"
//             value={form.year}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded bg-black/40 text-white outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Register Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           disabled={loading}
//           onClick={handleRegister}
//           className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
//         >
//           {loading ? "Creating Account..." : "Register"}
//         </motion.button>

//         {/* Footer */}
//         <p className="text-sm text-gray-400 text-center mt-4">
//           Already have an account?{" "}
//           <span
//             onClick={() => router.push("/auth/login")}
//             className="text-indigo-400 cursor-pointer hover:underline"
//           >
//             Login
//           </span>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Users, Building2, ArrowRight } from "lucide-react";

type Role = "student" | "mentor" | "tpo";

export default function RegisterRolePage() {
  const [role, setRole] = useState<Role | null>(null);
  const router = useRouter();

  const roles = [
    {
      key: "student",
      title: "Student",
      desc: "Track placement readiness & career growth",
      icon: GraduationCap,
      color: "indigo",
    },
    {
      key: "mentor",
      title: "Mentor",
      desc: "Guide students with your expertise",
      icon: Users,
      color: "emerald",
    },
    {
      key: "tpo",
      title: "TPO",
      desc: "Manage placements & student performance",
      icon: Building2,
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black px-4">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-white mt-3">
            Choose Your Role
          </h1>
          <p className="text-slate-400 mt-2 mb-3">
            Select how you want to use CareerCompass
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((r) => {
            const Icon = r.icon;
            const active = role === r.key;

            return (
              <button
                key={r.key}
                onClick={() => setRole(r.key as Role)}
                className={`text-left rounded-2xl border p-6 transition
                  ${
                    active
                      ? `border-${r.color}-500 bg-${r.color}-500/10`
                      : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                  }`}
              >
                <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 mt-3 gap-3
                    ${
                      active
                        ? `bg-${r.color}-500 text-white`
                        : "bg-slate-800 text-slate-400"
                    }`}
                >
                  <Icon />
                </div>

                <h3 className="text-lg font-medium text-white">
                  {r.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {r.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className=" flex justify-center mt-10 px-2 py-5">
          <button
            disabled={!role}
            onClick={() => router.push(`/auth/register/${role}`)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed mt-3"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
