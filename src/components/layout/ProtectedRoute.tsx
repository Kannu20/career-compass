// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { motion } from "framer-motion";

// export default function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.replace("/auth/login");
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1 }}
//           className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       {children}
//     </motion.div>
//   );
// }
