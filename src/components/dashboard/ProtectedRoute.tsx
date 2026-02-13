// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function ProtectedRoute({
//   children,
//   allowedRoles,
// }: {
//   children: React.ReactNode;
//   allowedRoles: string[];
// }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (!user) {
//         router.replace("/auth/login");
//         return;
//       }

//       if (!allowedRoles.includes(user.role)) {
//         router.replace("/unauthorized");
//         return;
//       }

//       if (user.role !== "student" && user.roleStatus !== "approved") {
//         router.replace("/pending-approval");
//         return;
//       }
//     }
//   }, [user, loading]);

//   if (loading) return null;

//   return <>{children}</>;
// }
