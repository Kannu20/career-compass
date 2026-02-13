import { Request, Response } from "express";
import User from "../models/User.model";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import admin from "../config/firebase";

/**
 * =========================
 * FIREBASE AUTH (GOOGLE)
 * =========================
 */
export const firebaseAuth = async (req: Request, res: Response) => {
  try {
    const { firebaseToken, name, requestedRole, expertise, experience, linkedin } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({ message: "Token missing" });
    }

    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    let user = await User.findOne({ email: decoded.email });

    // 🔥 CASE 1: New user
    if (!user) {
      const isPrivileged =
        requestedRole === "mentor" || requestedRole === "tpo";

      user = await User.create({
        name: name || decoded.name || "User",
        email: decoded.email,
        provider: "google",
        firebaseUid: decoded.uid,

        role: "student",
        requestedRole: isPrivileged ? requestedRole : null,
        roleStatus: isPrivileged ? "pending" : "approved",

        expertise,
        experience,
        linkedin,
      });
    }

    // 🔥 CASE 2: Existing user trying to re-apply
    if (
      user &&
      requestedRole &&
      user.role === "student" &&
      user.roleStatus === "approved"
    ) {
      user.requestedRole = requestedRole;
      user.roleStatus = "pending";
      await user.save();
    }

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
      roleStatus: user.roleStatus,
      emailVerified: user.emailVerified,
      tokenVersion: user.tokenVersion,
    });

    return res.status(200).json({
      status: "success",
      message:
        user.roleStatus === "pending"
          ? "Application submitted for admin approval"
          : "Authentication successful",
      data: { token, user },
    });

  } catch (error) {
    console.error("Firebase auth error:", error);
    return res.status(401).json({
      status: "error",
      message: "Firebase authentication failed",
    });
  }
};

/**
 * =========================
 * REGISTER (EMAIL/PASSWORD)
 * =========================
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, requestedRole, branch, year } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email is already registered",
      });
    }

    const passwordHash = await hashPassword(password);

    const isPrivileged =
      requestedRole === "mentor" || requestedRole === "tpo";

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: "student",
      requestedRole: isPrivileged ? requestedRole : null,
      roleStatus: isPrivileged ? "pending" : "approved",
      branch,
      year,
      provider: "local",
    });

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
      roleStatus: user.roleStatus,
      emailVerified: user.emailVerified,
      tokenVersion: user.tokenVersion,
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while registering",
    });
  }
};

/**
 * =========================
 * LOGIN (EMAIL/PASSWORD)
 * =========================
 */
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         status: "error",
//         message: "Email and password are required",
//       });
//     }

//     const user = await User.findOne({ email: email.toLowerCase() });

//     // if (!user || user.provider === "google") {
//     //   return res.status(401).json({
//     //     status: "error",
//     //     message: "Invalid login method",
//     //   });
//     // }
//     if (!user) {
//       return res.status(401).json({
//         status: "error",
//         message: "Invalid email or password",
//       });
//     }

//     if (!user.isLocal()) {
//       return res.status(401).json({
//         status: "error",
//         message: "Please login using Google",
//       });
//     }

//     const isMatch = await comparePassword(password, user.passwordHash!);
//     if (!isMatch) {
//       return res.status(401).json({
//         status: "error",
//         message: "Invalid email or password",
//       });
//     }

//     const token = generateToken({
//       userId: user._id.toString(),
//       role: user.role,
//       roleStatus: user.roleStatus,
//     });

//     return res.status(200).json({
//       status: "success",
//       message: "Login successful",
//       data: { token, user },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({
//       status: "error",
//       message: "Internal server error while logging in",
//     });
//   }
// };

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // ✅ FIX 1: user existence
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // ✅ FIX 2: provider check
    if (user.provider !== "local") {
      return res.status(401).json({
        status: "error",
        message: "Use Google login for this account",
      });
    }

    // ✅ FIX 3: passwordHash existence
    if (!user.passwordHash) {
      return res.status(500).json({
        status: "error",
        message: "Password not set for this user",
      });
    }

    const isMatch = await comparePassword(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
      roleStatus: user.roleStatus,
      emailVerified: user.emailVerified,
      tokenVersion: user.tokenVersion,
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { token, user },
    });
  } catch (error) {
    console.error("🔥 LOGIN CRASH:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while logging in",
    });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const passwordHash = await hashPassword(password);

  const adminUser = await User.create({
    email,
    passwordHash,
    role: "admin",
    roleStatus: "approved",
    provider: "local",
  });

  res.status(201).json({
    message: "Admin created",
    data: adminUser,
  });
};
