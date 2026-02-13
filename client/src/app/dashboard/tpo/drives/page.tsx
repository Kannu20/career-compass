"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PlusCircle, Eye } from "lucide-react";

/* TEMP MOCK DATA – replace with API later */
const drives = [
  {
    id: "1",
    company: "TCS",
    role: "Software Engineer",
    batch: "2025",
    eligibleCount: 320,
    status: "Upcoming",
  },
  {
    id: "2",
    company: "Infosys",
    role: "System Engineer",
    batch: "2024",
    eligibleCount: 180,
    status: "Ongoing",
  },
  {
    id: "3",
    company: "Amazon",
    role: "SDE Intern",
    batch: "2025",
    eligibleCount: 75,
    status: "Closed",
  },
];

export default function TPODrivesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "tpo")) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading placement drives...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-slate-900 to-black text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Placement Drives 💼
          </h1>
          <p className="text-slate-400">
            Create, manage & track placement drives
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/tpo/drives/create")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-sm"
        >
          <PlusCircle size={16} />
          Create Drive
        </button>
      </div>

      {/* DRIVES TABLE */}
      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-white/5">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Batch</th>
              <th className="px-4 py-3">Eligible Students</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {drives.map((d) => (
              <tr
                key={d.id}
                className="border-t border-slate-700 hover:bg-slate-800/50"
              >
                <td className="px-4 py-3">{d.company}</td>
                <td className="px-4 py-3 text-center">{d.role}</td>
                <td className="px-4 py-3 text-center">{d.batch}</td>
                <td className="px-4 py-3 text-center">
                  {d.eligibleCount}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={d.status} />
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() =>
                      router.push(`dashboard/tpo/drives/${d.id}`)
                    }
                    className="text-slate-300 hover:text-white"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {drives.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-slate-400"
                >
                  No placement drives created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Upcoming"
      ? "bg-blue-500/10 text-blue-400"
      : status === "Ongoing"
      ? "bg-green-500/10 text-green-400"
      : "bg-gray-500/10 text-gray-400";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}
    >
      {status}
    </span>
  );
}
