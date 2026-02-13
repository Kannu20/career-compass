// import { Response } from "express";
// import Dashboard from "../models/Dashboard.model";
// import { AuthRequest } from "../middlewares/auth.middleware";

// export const getDashboardSummary = async (
//   req: AuthRequest,
//   res: Response
// ) => {
//   try {
//     const userId = req.user?.userId;

//     if (!userId) {
//       return res.status(401).json({
//         status: "error",
//         message: "Unauthorized",
//       });
//     }

//     let dashboard = await Dashboard.findOne({ userId });

//     // Create default dashboard if not exists
//     if (!dashboard) {
//       dashboard = await Dashboard.create({
//         userId,
//         overallScore: 72,
//         skills: {
//           dsa: 65,
//           core: 70,
//           projects: 80,
//           resume: 75,
//         },
//       });
//     }

//     return res.status(200).json({
//       status: "success",
//       data: dashboard,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: "error",
//       message: "Failed to load dashboard",
//     });
//   }
// };

import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Dashboard from "../models/Dashboard.model";
import User from "../models/User.model";
import TestAttempt from "../models/TestAttempt.model";

export const getStudentDashboard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    // 🔐 Auth check
    const userId = req.user?.userId;
    const role = req.user?.role;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (role !== "student") {
      return res.status(403).json({
        status: "error",
        message: "Access denied",
      });
    }

    // 👤 Fetch basic user info
    const user = await User.findById(userId).select("name email role");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // 📊 Fetch / create dashboard snapshot
    // let dashboard = await Dashboard.findOne({ userId });

    // if (!dashboard) {
    //   dashboard = await Dashboard.create({
    //     userId,
    //     overallScore: 72,
    //     skills: {
    //       dsa: 65,
    //       core: 74,
    //       projects: 80,
    //       resume: 75,
    //     },
    //   });
    // }
    // 🔥 Fetch all test attempts of student
    const attempts = await TestAttempt.find({ userId });

    // Default skills
    const skills = {
      dsa: 0,
      core: 0,
      projects: 0,
      resume: 0,
    };

    if (attempts.length > 0) {
      const skillMap: any = {
        dsa: [],
        core: [],
        projects: [],
        resume: [],
      };

      attempts.forEach((a) => {
        skillMap[a.skill].push(a.percentage);
      });

      // Calculate average per skill
      (Object.keys(skillMap) as (keyof typeof skillMap)[]).forEach((skill) => {
        if (skillMap[skill].length > 0) {
          const sum = skillMap[skill].reduce((a, b) => a + b, 0);
          skills[skill] = Math.round(sum / skillMap[skill].length);
        }
      });
    }

    // Overall score = average of non-zero skills
    const validSkills = Object.values(skills).filter((v) => v > 0);
    const overallScore =
      validSkills.length > 0
        ? Math.round(
          validSkills.reduce((a, b) => a + b, 0) / validSkills.length
        )
        : 0;

    // 🔁 Save snapshot (optional but good)
    let dashboard = await Dashboard.findOneAndUpdate(
      { userId },
      { skills, overallScore },
      { new: true, upsert: true }
    );


    // 🧠 Next steps (static for now – later dynamic)
    // const nextSteps = [
    //   "Practice 2 DSA problems daily",
    //   "Revise OS & DBMS fundamentals",
    //   "Add 1 strong project",
    //   "Update LinkedIn & GitHub profile",
    // ];
    const nextSteps = [];

    if (skills.dsa < 60) nextSteps.push("Practice DSA daily (arrays, strings)");
    if (skills.core < 60) nextSteps.push("Revise OS, DBMS, CN basics");
    if (skills.projects < 60) nextSteps.push("Build 1 strong project");
    if (skills.resume < 60) nextSteps.push("Improve resume structure & keywords");

    if (nextSteps.length === 0) {
      nextSteps.push("You're doing great! Focus on mock interviews 🚀");
    }


    // ✅ Final response (frontend-friendly)
    return res.status(200).json({
      status: "success",
      data: {
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        overallScore: dashboard.overallScore,
        skills: dashboard.skills,
        nextSteps,
        updatedAt: dashboard.updatedAt,
      },
    });
  } catch (error) {
    console.error("Student dashboard error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to load student dashboard",
    });
  }
};
