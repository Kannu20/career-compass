// "use client";

// import SkillCard from "./SkillCard";

// export default function SkillBreakdown() {
//   const skillsData = {
//     dsa: 65,
//     core: 70,
//     projects: 80,
//     resume: 75,
//   };

//   const skills = [
//     { title: "DSA", score: skillsData.dsa },
//     { title: "Core CS", score: skillsData.core },
//     { title: "Projects", score: skillsData.projects },
//     { title: "Resume", score: skillsData.resume },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       {skills.map((s) => (
//         <SkillCard key={s.title} title={s.title} score={s.score} />
//       ))}
//     </div>
//   );
// }

"use client";

import SkillCard from "./SkillCard";

type Props = {
  skills: {
    dsa: number;
    core: number;
    projects: number;
    resume: number;
  };
};

export default function SkillBreakdown({ skills }: Props) {
  const skillList = [
    { title: "DSA", score: skills.dsa },
    { title: "Core CS", score: skills.core },
    { title: "Projects", score: skills.projects },
    { title: "Resume", score: skills.resume },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {skillList.map((s) => (
        <SkillCard key={s.title} title={s.title} score={s.score} />
      ))}
    </div>
  );
}

