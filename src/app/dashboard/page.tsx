// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { motion } from "framer-motion";

// import ScoreRing from "@/components/dashboard/ScoreRing";
// import SkillCard from "@/components/dashboard/SkillCard";
// import NextSteps from "@/components/dashboard/NextSteps";
// import SkillBreakdown from "@/components/dashboard/SkillBreakdown";
// import UserSummary from "@/components/dashboard/UserSummary";
// import OverallScore from "@/components/dashboard/OverallScore";

// const stats = [
//     { label: "Coding", value: 72, color: "bg-indigo-500" },
//     { label: "Aptitude", value: 65, color: "bg-emerald-500" },
//     { label: "CS Core", value: 58, color: "bg-yellow-500" },
//     { label: "Communication", value: 80, color: "bg-pink-500" },
// ];
// export default function DashboardPage() {
//     const overallScore = stats.reduce((sum, s) => sum + s.value, 0) / stats.length;
//     const { user } = useAuth();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 text-white">
//             <motion.h1
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-3xl font-bold mb-4"
//             >
//                 Welcome, {user?.name} 👋
//             </motion.h1>

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg"
//             >
//                 <p className="text-gray-300">
//                     Role: <span className="text-white">{user?.role}</span>
//                 </p>
//                 <p className="text-gray-300 mt-2">
//                     Email: <span className="text-white">{user?.email}</span>
//                 </p>
//             </motion.div>
//             <div className="space-y-8 text-white">
//                 {/* Heading */}
//                 <motion.h1
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-3xl font-bold"
//                 >
//                     Placement Readiness Dashboard
//                 </motion.h1>

//                 {/* Overall Score Card */}
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.4 }}
//                     className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
//                 >
//                     <p className="text-gray-300 mb-2">Overall Readiness</p>
//                     <p className="text-5xl font-extrabold text-indigo-400">
//                         {Math.round(overallScore)}%
//                     </p>
//                 </motion.div>
//                 <div className="flex flex-col md:flex-row items-center gap-8">
//                     <ScoreRing score={overallScore} />

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
//                         <SkillCard title="DSA" score={65} />
//                         <SkillCard title="Core CS" score={70} />
//                         <SkillCard title="Projects" score={80} />
//                         <SkillCard title="Resume" score={75} />
//                     </div>
//                 </div>
//                 <UserSummary />
//                 <OverallScore score={overallScore} />
//                 <SkillBreakdown />

//                 {/* Next Steps */}
//                 <NextSteps />

//                 {/* Section Scores */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {stats.map((item, index) => (
//                         <motion.div
//                             key={item.label}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: index * 0.1 }}
//                             className="bg-white/10 backdrop-blur-lg rounded-xl p-5"
//                         >
//                             <div className="flex justify-between mb-2">
//                                 <span>{item.label}</span>
//                                 <span>{item.value}%</span>
//                             </div>

//                             {/* Progress Bar */}
//                             <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
//                                 <motion.div
//                                     initial={{ width: 0 }}
//                                     animate={{ width: `${item.value}%` }}
//                                     transition={{ duration: 0.8 }}
//                                     className={`h-full ${item.color}`}
//                                 />
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>

//         </div>
//     );
// }

"use client";

import UserSummary from "@/components/dashboard/UserSummary";
import OverallScore from "@/components/dashboard/OverallScore";
import SkillBreakdown from "@/components/dashboard/SkillBreakdown";
import NextSteps from "@/components/dashboard/NextSteps";
import SkillRadar from "@/components/dashboard/SkillRadar";
import SkillBarChart from "@/components/dashboard/SkillBarChart";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { data, loading } = useDashboard();

  if (loading) return <p className="text-white">Loading...</p>;
  if (!data) return null;

  return (
    <div className="space-y-10">
      <UserSummary />
      <OverallScore score={data.overallScore} />
      <SkillBreakdown skills={data.skills} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillRadar skills={data.skills} />
        <SkillBarChart skills={data.skills} />
      </div>

      <NextSteps />
    </div>
  );
}
