import { Parser } from "json2csv";

export const exportUsersCSV = async (req, res) => {
  const users = await User.find().select(
    "name email role roleStatus createdAt"
  );

  const parser = new Parser();
  const csv = parser.parse(users);

  res.header("Content-Type", "text/csv");
  res.attachment("users.csv");
  return res.send(csv);
};
