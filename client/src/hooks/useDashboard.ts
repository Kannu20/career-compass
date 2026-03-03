import { useEffect, useState } from "react";
import api from "@/lib/api";

// interface DashboardData {
//   overallScore: number;
//   skills: {
//     dsa: number;
//     core: number;
//     projects: number;
//     resume: number;
//   };
// }
interface DashboardData {
  user: {
    name: string;
    email: string;
    role: string;
  };
  overallScore: number;
  skills: {
    dsa: number;
    core: number;
    projects: number;
    resume: number;
  };
  nextSteps: string[];
}

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/api/dashboard/student/overview");
        setData(res.data.data);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, loading };
};
