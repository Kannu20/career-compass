import { Parser } from "json2csv";
import { Request, Response } from "express";
import User from "../../models/User.model";
export const exportUsersCSV = async (req: Request, res: Response) => {
  const users = await User.find().select(
    "name email role roleStatus createdAt"
  );

  const parser = new Parser();
  const csv = parser.parse(users);

  res.header("Content-Type", "text/csv");
  res.attachment("users.csv");
  return res.send(csv);
};
