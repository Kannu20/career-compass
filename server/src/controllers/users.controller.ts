
import { Response } from "express";
import User from "../models/User.model";

export const getMe = async (req: any, res: Response) => {
  const user = await User.findById(req.user.userId).select(
    "name email role roleStatus requestedRole"
  );

  res.json({
    status: "success",
    data: user,
  });
};