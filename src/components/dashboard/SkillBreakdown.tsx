"use client";

import SkillCard from "./SkillCard";

const skills = [
  { title: "DSA", score: 65 },
  { title: "Core CS", score: 70 },
  { title: "Projects", score: 80 },
  { title: "Resume", score: 75 },
];

export default function SkillBreakdown() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {skills.map((s) => (
        <SkillCard key={s.title} title={s.title} score={s.score} />
      ))}
    </div>
  );
}
