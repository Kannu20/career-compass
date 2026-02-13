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
