"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  skills: {
    dsa: number;
    core: number;
    projects: number;
    resume: number;
  };
}

export default function SkillBarChart({ skills }: Props) {
  const data = [
    { name: "DSA", value: skills.dsa },
    { name: "Core CS", value: skills.core },
    { name: "Projects", value: skills.projects },
    { name: "Resume", value: skills.resume },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-white h-[300px]">
      <h3 className="text-lg font-semibold mb-4">Skill Comparison</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
