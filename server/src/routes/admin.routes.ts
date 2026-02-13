// import { Router } from "express";
// import User from "../models/User.model";
// import { authMiddleware } from "../middlewares/auth.middleware";
// import { requireAdmin } from "../middlewares/admin.middleware";
// import {
//   getPendingRequests,
//   approveRequest,
//   rejectRequest,
// } from "../controllers/admin.controller";

// const router = Router();

// /**
//  * GET pending mentor / tpo requests
//  */
// router.get(
//   "/pending-users",
//   authMiddleware,
//   requireAdmin,
//   getPendingRequests
// );

// /**
//  * APPROVE user
//  */
// router.post(
//   "/approve/:id",
//   authMiddleware,
//   requireAdmin,
//   approveRequest
// );

// /**
//  * REJECT user
//  */
// router.post(
//   "/reject/:id",
//   authMiddleware,
//   requireAdmin,
//   rejectRequest
// );

// export default router;

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";
import {
  getPendingRequests,
  approveRequest,
  rejectRequest,
  getAdminStats,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/admin.controller";

const router = Router();

router.get(
  "/stats",
  authMiddleware,
  adminOnly,
  getAdminStats
);

router.get(
  "/users",
  authMiddleware,
  adminOnly,
  getAllUsers
);

router.get(
  "/pending-requests",
  authMiddleware,
  adminOnly,
  getPendingRequests
);

router.post(
  "/approve/:userId",
  authMiddleware,
  adminOnly,
  approveRequest
);

router.post(
  "/reject/:userId",
  authMiddleware,
  adminOnly,
  rejectRequest
);

// UPDATE USER
router.patch(
  "/users/:id",
  authMiddleware,
  adminOnly,
  updateUser
);

// DELETE USER
router.delete(
  "/users/:id",
  authMiddleware,
  adminOnly,
  deleteUser
);

export default router;
