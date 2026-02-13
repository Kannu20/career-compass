// src/routes/auth.routes.ts
import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { firebaseAuth } from "../controllers/auth.controller";

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 */
router.post("/register", register);
router.post("/firebase", firebaseAuth);

/**
 * @route POST /api/auth/login
 * @desc Login user and return token
 */
router.post("/login", login);

export default router;
