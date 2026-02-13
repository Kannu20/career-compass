
import jwt from "jsonwebtoken";
import { UserRole } from "../models/User.model";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "7d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export interface JwtPayload {
  userId: string;
  // role: string;
  // roleStatus: string;
  // // emailVerified: boolean;
  role: "student" | "mentor" | "tpo" | "admin";
  roleStatus: "approved" | "pending" | "rejected";
  emailVerified: boolean;
  tokenVersion: number;
}

/**
 * Generate JWT token
 */
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
