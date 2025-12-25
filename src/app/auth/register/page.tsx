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

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const roles = [
  {
    key: "student",
    label: "🎓 Student",
    desc: "Access placement readiness dashboard",
  },
  {
    key: "mentor",
    label: "🧑‍🏫 Apply as Mentor",
    desc: "Guide students after approval",
  },
  {
    key: "tpo",
    label: "🏢 Apply as TPO",
    desc: "Manage college placement data",
  },
];

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    requestedRole: null as "mentor" | "tpo" | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        requestedRole: form.requestedRole, // mentor | tpo | null
      });

    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[400px] bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Create Account 🚀
        </h1>
        <p className="text-sm text-gray-400 text-center mb-5">
          Choose your role to get started
        </p>

        {error && (
          <motion.p
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-red-400 text-sm mb-3 text-center"
          >
            {error}
          </motion.p>
        )}

        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 rounded bg-black/40 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 rounded bg-black/40 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded bg-black/40 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* ROLE SELECTION */}
        <div className="mb-6">
          <p className="text-sm text-gray-300 mb-2">Register as</p>

          <div className="space-y-2">
            {roles.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    requestedRole: r.key === "student" ? null : (r.key as any),
                  })
                }
                className={`w-full text-left px-4 py-3 rounded-lg border transition
          ${form.requestedRole === r.key ||
                    (r.key === "student" && form.requestedRole === null)
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                  }`}
              >
                <div className="font-semibold">{r.label}</div>
                <div className="text-xs text-gray-300">{r.desc}</div>
              </button>
            ))}
          </div>
        </div>


        {/* Register Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          onClick={handleRegister}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {loading ? "Creating Account..." : "Register"}
        </motion.button>

        <p className="text-xs text-gray-400 mt-3 text-center">
          Mentor and TPO roles require approval before activation.
        </p>

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
