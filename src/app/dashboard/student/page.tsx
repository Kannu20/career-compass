// "use client";

// import ProtectedRoute from "@/components/dashboard/ProtectedRoute";
// import { motion } from "framer-motion";

// export default function StudentDashboard() {
//   return (
//     <ProtectedRoute allowedRoles={["student"]}>
//       <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-8">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl font-bold mb-6"
//         >
//           🎓 Student Dashboard
//         </motion.h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card title="Placement Readiness" desc="Track your overall score" />
//           <Card title="Skill Analysis" desc="DSA, Core CS, Projects" />
//           <Card title="Next Steps" desc="Actionable improvement plan" />
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// function Card({ title, desc }: { title: string; desc: string }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
//     >
//       <h2 className="text-lg font-semibold mb-2">{title}</h2>
//       <p className="text-gray-400 text-sm">{desc}</p>
//     </motion.div>
//   );
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
