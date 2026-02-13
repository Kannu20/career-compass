import { Router } from "express";
import { getPlacementReadinessScore } from "../controllers/prs.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route GET /api/prs
 * @desc  Get Placement Readiness Score
 * @access Private
 */
router.get("/", authMiddleware, getPlacementReadinessScore);

export default router;
