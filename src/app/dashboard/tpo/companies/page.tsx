"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PlusCircle, Eye } from "lucide-react";

/* TEMP MOCK DATA – API se replace hoga */
const companies = [
  {
    id: "1",
    name: "Infosys",
    type: "Service",
    domain: "IT Services",
    location: "Bangalore",
    status: "Active",
  },
  {
    id: "2",
    name: "TCS",
    type: "Service",
    domain: "Consulting",
    location: "Mumbai",
    status: "Active",
  },
  {
    id: "3",
    name: "Amazon",
    type: "Product",
    domain: "E-Commerce",
    location: "Hyderabad",
    status: "Inactive",
  },
];

export default function TPOCompaniesPage() {
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
        Loading companies...
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
            Companies 🏢
          </h1>
          <p className="text-slate-400">
            Manage partner companies for placements
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/tpo/companies/create")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-sm"
        >
          <PlusCircle size={16} />
          Add Company
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-white/5">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Domain</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((c) => (
              <tr
                key={c.id}
                className="border-t border-slate-700 hover:bg-slate-800/50"
              >
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3 text-center">{c.type}</td>
                <td className="px-4 py-3 text-center">{c.domain}</td>
                <td className="px-4 py-3 text-center">{c.location}</td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() =>
                      router.push(`/tpo/companies/${c.id}`)
                    }
                    className="text-slate-300 hover:text-white"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {companies.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-slate-400"
                >
                  No companies added yet
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
    status === "Active"
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
