

import {Request, Response } from "express";
import TestAttemptModel from "../models/TestAttempt.model";
// import { AuthRequest } from "../middlewares/auth.middleware";

export const getMyResults = async (
  req: Request,
  res: Response
) => {
  const userId = req.user?.userId;

  const results = await TestAttemptModel.find({ userId })
    .populate("testId", "title category")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    status: "success",
    data: results,
  });
};
