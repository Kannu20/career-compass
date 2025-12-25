// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import api from "@/lib/api";

// export default function LoginPage() {
//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();

//     const result = await signInWithPopup(auth, provider);
//     const firebaseToken = await result.user.getIdToken();

//     const res = await api.post("/api/auth/firebase", {
//       firebaseToken,
//     });

//     localStorage.setItem("token", res.data.token);
//     router.replace("/dashboard");
//   };
//   const { login } = useAuth();
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setError("");
//     setLoading(true);
//     try {
//       await login(email, password);
//       router.replace("/dashboard");
//     } catch (err: any) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-[380px]"
//       >
//         <h1 className="text-2xl font-bold text-white mb-6 text-center">
//           Login
//         </h1>

//         {error && (
//           <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
//         )}

//         <input
//           className="w-full mb-3 p-2 rounded bg-black/40 text-white outline-none"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="w-full mb-4 p-2 rounded bg-black/40 text-white outline-none"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-2 rounded font-semibold"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-sm text-gray-400 text-center mt-4">
//           Don’t have an account?{" "}
//           <span
//             onClick={() => router.push("/auth/register")}
//             className="text-indigo-400 cursor-pointer"
//           >
//             Register
//           </span>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import api from "@/lib/api";

export default function LoginPage() {
  // ✅ hooks FIRST
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseToken = await result.user.getIdToken();

      const res = await api.post("/api/auth/firebase", {
        firebaseToken,
      });

      localStorage.setItem("token", res.data.data.token);
      router.replace("/dashboard");
    } catch (err: any) {
      setError("Google login failed");
    }
  };

  // ✅ Normal Login
  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-[380px]"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          className="w-full mb-3 p-2 rounded bg-black/40 text-white outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 rounded bg-black/40 text-white outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded font-semibold mb-4"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* ✅ Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black py-2 rounded font-semibold mb-4"
        >
          Continue with Google
        </button>

        <p className="text-sm text-gray-400 text-center">
          Do not have an account?{" "}
          <span
            onClick={() => router.push("/auth/register")}
            className="text-indigo-400 cursor-pointer"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}
