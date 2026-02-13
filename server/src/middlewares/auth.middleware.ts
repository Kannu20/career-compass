// src/middlewares/auth.middleware.ts
import { Response, NextFunction } from "express";
import User from "../models/User.model";
import { verifyToken, JwtPayload } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Authorization token missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    // 🔥 TOKEN VERSION CHECK
    if (decoded.tokenVersion !== user.tokenVersion) {
      return res.status(401).json({
        status: "error",
        message: "Session expired. Please login again.",
      });
    }

    req.user = decoded;
    next();

  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      status: "error",
      message: "Unauthorized access",
    });
  }
};
