import { Request, Response, NextFunction } from "express";
// import { AuthRequest } from "./auth.middleware";

export const requireVerifiedEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!req.user.emailVerified) {
    return res.status(403).json({
      message: "Please verify your email to continue",
    });
  }

  next();
};
