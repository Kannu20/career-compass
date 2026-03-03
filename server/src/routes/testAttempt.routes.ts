import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getMyResults } from "../controllers/testAttempt.controller";

const router = Router();

router.get("/me", authMiddleware, getMyResults as any);

export default router;
