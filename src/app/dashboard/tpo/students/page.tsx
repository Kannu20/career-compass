"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Filter, Eye, CheckCircle } from "lucide-react";

/* TEMP MOCK DATA – later replace with API */
const students = [
  {
    id: "1",
    name: "Amit Sharma",
    branch: "CSE",
    year: "2025",
    cgpa: 8.2,
    eligible: true,
  },
  {
    id: "2",
    name: "Neha Verma",
    branch: "IT",
    year: "2025",
    cgpa: 6.9,
    eligible: false,
  },
  {
    id: "3",
    name: "Rohit Singh",
    branch: "ECE",
    year: "2024",
    cgpa: 7.8,
    eligible: true,
  },
];

export default function TPOStudentsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("all");
  const [year, setYear] = useState("all");

  useEffect(() => {
    if (!loading && (!user || user.role !== "tpo")) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading students...
      </div>
    );
  }

  if (!user) return null;

  const filteredStudents = students.filter((s) => {
    return (
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (branch === "all" || s.branch === branch) &&
      (year === "all" || s.year === year)
    );
  });

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-slate-900 to-black text-white">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Student Management 🎓</h1>
        <p className="text-slate-400">
          Filter, evaluate & shortlist students for placements
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm outline-none"
          />
        </div>

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm"
        >
          <option value="all">All Branches</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm"
        >
          <option value="all">All Years</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-white/5">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3">Branch</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">CGPA</th>
              <th className="px-4 py-3">Eligible</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr
                key={s.id}
                className="border-t border-slate-700 hover:bg-slate-800/50"
              >
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3 text-center">{s.branch}</td>
                <td className="px-4 py-3 text-center">{s.year}</td>
                <td className="px-4 py-3 text-center">{s.cgpa}</td>
                <td className="px-4 py-3 text-center">
                  {s.eligible ? (
                    <span className="text-green-400">Yes</span>
                  ) : (
                    <span className="text-red-400">No</span>
                  )}
                </td>
                <td className="px-4 py-3 flex gap-3 justify-center">
                  <button
                    onClick={() => router.push(`/tpo/students/${s.id}`)}
                    className="text-slate-300 hover:text-white"
                  >
                    <Eye size={16} />
                  </button>

                  {s.eligible && (
                    <button className="text-green-400 hover:text-green-300">
                      <CheckCircle size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-slate-400"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
