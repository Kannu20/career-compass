"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, Users, RefreshCw } from "lucide-react";

/* MOCK DATA – API se replace hoga */
const drive = {
  company: "Amazon",
  role: "SDE Intern",
  batch: "2025",
  minCGPA: 7.5,
  status: "Ongoing",
};

const students = [
  {
    id: "1",
    name: "Amit Sharma",
    cgpa: 8.4,
    branch: "CSE",
    shortlisted: false,
  },
  {
    id: "2",
    name: "Neha Verma",
    cgpa: 7.8,
    branch: "IT",
    shortlisted: true,
  },
  {
    id: "3",
    name: "Rohit Singh",
    cgpa: 6.9,
    branch: "ECE",
    shortlisted: false,
  },
];

export default function DriveDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = useParams();

  const [status, setStatus] = useState(drive.status);
  const [data, setData] = useState(students);

  useEffect(() => {
    if (!loading && (!user || user.role !== "tpo")) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading drive details...
      </div>
    );
  }

  if (!user) return null;

  const toggleShortlist = (studentId: string) => {
    setData((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, shortlisted: !s.shortlisted }
          : s
      )
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-slate-900 to-black text-white space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          {drive.company} – {drive.role}
        </h1>
        <p className="text-slate-400">
          Batch {drive.batch} | Min CGPA {drive.minCGPA}
        </p>
      </div>

      {/* DRIVE STATUS */}
      <div className="flex items-center gap-4">
        <span className="text-slate-300 flex items-center gap-2">
          <RefreshCw size={16} />
          Drive Status
        </span>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* STUDENTS SECTION */}
      <div className="rounded-xl border border-slate-700 bg-white/5">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-700">
          <Users size={18} />
          <h2 className="text-lg font-semibold">
            Eligible Students
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3">Branch</th>
              <th className="px-4 py-3">CGPA</th>
              <th className="px-4 py-3">Shortlist</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s) => (
              <tr
                key={s.id}
                className="border-t border-slate-700 hover:bg-slate-800/50"
              >
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3 text-center">{s.branch}</td>
                <td className="px-4 py-3 text-center">{s.cgpa}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleShortlist(s.id)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                      s.shortlisted
                        ? "bg-green-500/10 text-green-400"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    <CheckCircle size={14} />
                    {s.shortlisted ? "Shortlisted" : "Shortlist"}
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-slate-400"
                >
                  No eligible students
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          onClick={() => console.log("Save changes")}
          className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>

        <button
          onClick={() => router.push("/dashboard/tpo/drives")}
          className="px-6 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 transition"
        >
          Back to Drives
        </button>
      </div>
    </div>
  );
}
