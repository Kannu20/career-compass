import { Request, Response } from "express";
import User from "../models/User.model";

/**
 * =========================
 * ADMIN DASHBOARD STATS
 * =========================
 */
export const getAdminStats = async (_req: Request, res: Response) => {
  try {
    const [
      totalUsers,
      pendingApprovals,
      mentors,
      tpos,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({
        roleStatus: "pending",
        requestedRole: { $in: ["mentor", "tpo"] },
      }),
      User.countDocuments({
        role: "mentor",
        roleStatus: "approved",
      }),
      User.countDocuments({
        role: "tpo",
        roleStatus: "approved",
      }),
    ]);

    return res.status(200).json({
      status: "success",
      data: {
        totalUsers,
        pendingApprovals,
        mentors,
        tpos,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to load admin stats",
    });
  }
};

export const getPendingRequests = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({
      roleStatus: "pending",
      requestedRole: { $in: ["mentor", "tpo"] },
    }).select("name email requestedRole createdAt");

    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

// export const approveRequest = async (req: Request, res: Response) => {
//   try {
//   const { userId } = req.params;

//   const user = await User.findById(userId);
//   if (!user || !user.requestedRole) {
//     return res.status(404).json({ message: "Invalid request" });
//   }

//   user.role = user.requestedRole;
//   user.roleStatus = "approved";
//   user.requestedRole = null;

//   await user.save();

//   res.json({
//     status: "success",
//     message: "User approved successfully",
//   });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Server Error" });
//   }
// };

export const approveRequest = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user || !user.requestedRole) {
      return res.status(404).json({ message: "Invalid request" });
    }

    if (user.roleStatus !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    user.role = user.requestedRole;
    user.roleStatus = "approved";
    user.requestedRole = null;

    // 🔥 ADD THIS
    user.tokenVersion += 1;

    await user.save();

    res.status(200).json({
      status: "success",
      message: "User approved successfully",
    });
  } catch {
    res.status(500).json({ message: "Approval failed" });
  }
};

export const rejectRequest = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "student";
    user.roleStatus = "approved";
    user.requestedRole = null;

    await user.save();

    res.json({
      status: "success",
      message: "Request rejected",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

// POST /api/user/request-role
export const requestRole = async (req: any, res: Response) => {
  const { requestedRole, expertise, experience, linkedin } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role !== "student") {
    return res
      .status(400)
      .json({ message: "Only students can request mentor/TPO role" });
  }

  if (user.roleStatus === "pending") {
    return res
      .status(400)
      .json({ message: "Request already pending" });
  }

  user.requestedRole = requestedRole; // mentor | tpo
  user.roleStatus = "pending";

  user.profile = {
    expertise,
    experience,
    linkedin,
  };

  await user.save();

  res.json({
    status: "success",
    message: "Role request submitted",
  });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const { role, status, search } = req.query;

  const query: any = {};

  if (role) query.role = role;
  if (status) query.roleStatus = status;

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(query)
    .select("name email role roleStatus provider createdAt")
    .sort({ createdAt: -1 });

  res.json({
    status: "success",
    data: users,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role, roleStatus } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ Admin ko update mat hone do
    if (user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Cannot modify admin user" });
    }

    if (role) user.role = role;
    if (roleStatus) user.roleStatus = roleStatus;

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({
      message: "Failed to update user",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ Admin delete mat hone do
    if (user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Cannot delete admin user" });
    }

    await user.deleteOne();

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({
      message: "Failed to delete user",
    });
  }
};
