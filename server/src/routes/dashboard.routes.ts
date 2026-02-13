// // import { Router } from "express";
// // import { authMiddleware } from "../middlewares/auth.middleware";
// // import { getDashboardSummary } from "../controllers/dashboard.controller";
// // import { requireRole } from "../middlewares/role.middleware";

// import { Router } from "express";
// import { authMiddleware } from "../middlewares/auth.middleware";
// import { requireRole } from "../middlewares/role.middleware";
// import { getStudentDashboard } from "../controllers/dashboard.controller";

// const router = Router();

// /**
//  * GET /api/dashboard/summary
//  */

// router.get(
//   "/student/overview",
//   authMiddleware,
//   requireRole(["student"]),
//   // (req, res) => {
//   //   res.json({ message: "Student dashboard data" });
//   // }
//   requireRole(["student"]),
//   getStudentDashboard
// );

// // Mentor dashboard
// router.get(
//   "/mentor",
//   authMiddleware,
//   requireRole(["mentor"]),
//   (req, res) => {
//     res.json({ message: "Mentor dashboard data" });
//   }
// );

// // TPO dashboard
// router.get(
//   "/tpo",
//   authMiddleware,
//   requireRole(["tpo"]),
//   (req, res) => {
//     res.json({ message: "TPO dashboard data" });
//   }
// );
// router.get("/summary", authMiddleware, getDashboardSummary);

// export default router;

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { getStudentDashboard } from "../controllers/dashboard.controller";

const router = Router();

/**
 * STUDENT DASHBOARD
 */
router.get(
  "/student/overview",
  authMiddleware,
  requireRole(["student"]),
  getStudentDashboard
);

export default router;
