"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
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

export default function SkillRadar({ skills }: Props) {
  const data = [
    { subject: "DSA", value: skills.dsa },
    { subject: "Core CS", value: skills.core },
    { subject: "Projects", value: skills.projects },
    { subject: "Resume", value: skills.resume },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-white h-[300px]">
      <h3 className="text-lg font-semibold mb-4">Skill Radar</h3>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
