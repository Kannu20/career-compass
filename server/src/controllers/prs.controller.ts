// import { Response } from "express";
// import Result from "../models/Result.model";
// import { AuthRequest } from "../middlewares/auth.middleware";

// const WEIGHTS: Record<string, number> = {
//   coding: 40,
//   aptitude: 25,
//   cs_core: 25,
//   communication: 10,
// };

// export const getPlacementReadinessScore = async (
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

//     const results = await Result.find({ userId });

//     if (results.length === 0) {
//       return res.status(200).json({
//         status: "success",
//         data: {
//           prs: 0,
//           breakdown: {},
//         },
//       });
//     }

//     // Aggregate category-wise
//     const categoryMap: Record<
//       string,
//       { score: number; total: number }
//     > = {};

//     for (const r of results) {
//       if (!categoryMap[r.category]) {
//         categoryMap[r.category] = { score: 0, total: 0 };
//       }
//       categoryMap[r.category].score += r.score;
//       categoryMap[r.category].total += r.total;
//     }

//     let prs = 0;
//     const breakdown: Record<string, number> = {};

//     for (const category in WEIGHTS) {
//       const weight = WEIGHTS[category];
//       const data = categoryMap[category];

//       if (data && data.total > 0) {
//         const categoryScore = (data.score / data.total) * weight;
//         breakdown[category] = Number(categoryScore.toFixed(2));
//         prs += categoryScore;
//       } else {
//         breakdown[category] = 0;
//       }
//     }

//     return res.status(200).json({
//       status: "success",
//       data: {
//         prs: Number(prs.toFixed(2)),
//         breakdown,
//       },
//     });
//   } catch (error) {
//     console.error("PRS error:", error);
//     return res.status(500).json({
//       status: "error",
//       message: "Failed to calculate readiness score",
//     });
//   }
// };


import { Response } from "express";
import TestAttemptModel from "../models/TestAttempt.model";
import { AuthRequest } from "../middlewares/auth.middleware";

/**
 * Allowed categories (STRICT TYPE)
 */
type Category = "coding" | "aptitude" | "cs_core" | "communication";

/**
 * Category weightage
 */
const WEIGHTS: Record<Category, number> = {
  coding: 40,
  aptitude: 25,
  cs_core: 25,
  communication: 10,
};

export const getPlacementReadinessScore = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const results = await TestAttemptModel.find({ userId });

    if (results.length === 0) {
      return res.status(200).json({
        status: "success",
        data: {
          prs: 0,
          breakdown: {
            coding: 0,
            aptitude: 0,
            cs_core: 0,
            communication: 0,
          },
        },
      });
    }

    /**
     * Aggregate scores category-wise
     */
    const categoryMap: Partial<
      Record<Category, { score: number; total: number }>
    > = {};

    for (const r of results) {
      const category = r.category as Category;

      if (!categoryMap[category]) {
        categoryMap[category] = { score: 0, total: 0 };
      }

      categoryMap[category]!.score += r.score;
      categoryMap[category]!.total += r.total;
    }

    let prs = 0;
    const breakdown: Record<Category, number> = {
      coding: 0,
      aptitude: 0,
      cs_core: 0,
      communication: 0,
    };

    for (const category of Object.keys(WEIGHTS) as Category[]) {
      const weight = WEIGHTS[category];
      const data = categoryMap[category];

      if (data && data.total > 0) {
        const categoryScore = (data.score / data.total) * weight;
        breakdown[category] = Number(categoryScore.toFixed(2));
        prs += categoryScore;
      }
    }

    return res.status(200).json({
      status: "success",
      data: {
        prs: Number(prs.toFixed(2)),
        breakdown,
      },
    });
  } catch (error) {
    console.error("PRS error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to calculate readiness score",
    });
  }
};
