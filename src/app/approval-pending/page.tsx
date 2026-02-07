// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";
// import {
//   Loader2,
//   Clock,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// type Status = "pending" | "approved" | "rejected";

// export default function ApprovalPendingPage() {
//   const router = useRouter();
//   const [status, setStatus] = useState<Status | null>(null);
//   const [role, setRole] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchStatus = async () => {
//     try {
//       const res = await api.get("/api/user/me");
//       const { roleStatus, requestedRole, role } = res.data.data;

//       setStatus(roleStatus);
//       setRole(requestedRole || role);

//       // ✅ Auto redirect after approval
//       if (roleStatus === "approved") {
//         setTimeout(() => {
//           router.replace(`/dashboard/${role}`);
//         }, 1500);
//       }
//     } catch (err) {
//       console.error("Failed to fetch approval status", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStatus();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black px-4">
//       <div className="w-full max-w-md rounded-2xl bg-slate-900/70 backdrop-blur border border-slate-800 p-8 text-center">

//         {/* PENDING */}
//         {status === "pending" && (
//           <>
//             <Clock className="mx-auto h-12 w-12 text-orange-500 mb-4" />
//             <h1 className="text-2xl font-semibold text-white mb-2">
//               Approval Pending
//             </h1>
//             <p className="text-slate-400">
//               Your <span className="text-white">{role}</span> application is under
//               review by the admin.
//             </p>
//             <p className="text-sm text-slate-500 mt-3">
//               You’ll be redirected automatically once approved.
//             </p>
//           </>
//         )}

//         {/* APPROVED */}
//         {status === "approved" && (
//           <>
//             <CheckCircle className="mx-auto h-12 w-12 text-emerald-500 mb-4" />
//             <h1 className="text-2xl font-semibold text-white mb-2">
//               Approved 🎉
//             </h1>
//             <p className="text-slate-400">
//               Your request has been approved. Redirecting to dashboard…
//             </p>
//           </>
//         )}

//         {/* REJECTED */}
//         {status === "rejected" && (
//           <>
//             <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
//             <h1 className="text-2xl font-semibold text-white mb-2">
//               Request Rejected
//             </h1>
//             <p className="text-slate-400">
//               Unfortunately, your application was rejected.
//             </p>
//             <button
//               onClick={() => router.replace("/")}
//               className="mt-5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
//             >
//               Go Home
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import {
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

type Status = "pending" | "approved" | "rejected";

export default function ApprovalPendingPage() {
  const router = useRouter();

  const [status, setStatus] = useState<Status | null>(null);
  const [finalRole, setFinalRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await api.get("/api/user/me");
        const data = res.data?.data;

        if (!data?.roleStatus) {
          throw new Error("Invalid response");
        }

        const resolvedRole = data.requestedRole || data.role;

        setStatus(data.roleStatus);
        setFinalRole(resolvedRole);

        // ✅ SAFE REDIRECT
        if (data.roleStatus === "approved" && resolvedRole) {
          setTimeout(() => {
            router.replace(`/dashboard/${resolvedRole}`);
          }, 1500);
        }
      } catch (err) {
        console.error("Failed to fetch approval status", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [router]);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
      </div>
    );
  }

  /* ---------- ERROR ---------- */
  if (error || !status) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-center">
        <p className="text-slate-400">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/70 backdrop-blur border border-slate-800 p-8 text-center">

        {/* PENDING */}
        {status === "pending" && (
          <>
            <Clock className="mx-auto h-12 w-12 text-orange-500 mb-4" />
            <h1 className="text-2xl font-semibold text-white mb-2">
              Approval Pending
            </h1>
            <p className="text-slate-400">
              Your <span className="text-white">{finalRole}</span> request is
              under review.
            </p>
            <p className="text-sm text-slate-500 mt-3">
              You’ll be redirected automatically once approved.
            </p>
          </>
        )}

        {/* APPROVED */}
        {status === "approved" && (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-500 mb-4" />
            <h1 className="text-2xl font-semibold text-white mb-2">
              Approved
            </h1>
            <p className="text-slate-400">
              Redirecting you to your dashboard…
            </p>
          </>
        )}

        {/* REJECTED */}
        {status === "rejected" && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-semibold text-white mb-2">
              Request Rejected
            </h1>
            <p className="text-slate-400">
              Your application was not approved.
            </p>
            <button
              onClick={() => router.replace("/")}
              className="mt-5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Go Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
