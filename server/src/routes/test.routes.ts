import { Router } from "express";
import {
  getAllTests,
  getTestQuestions,
  submitTest,
} from "../controllers/test.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route GET /api/tests
 * @access Private
 */
router.get("/", authMiddleware, getAllTests);

router.post("/:id/submit", authMiddleware, submitTest)
/**
 * @route GET /api/tests/:id
 * @access Private
 */
router.get("/:id", authMiddleware, getTestQuestions);

export default router;
