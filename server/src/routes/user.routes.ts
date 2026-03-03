import { Request,Router } from "express";
import { authMiddleware} from "../middlewares/auth.middleware";
import User from "../models/User.model";

const router = Router();

/**
 * @route GET /api/user/me
 * @desc Get logged-in user data
 */
router.get("/me", authMiddleware, async (req: Request, res) => {
  try {
    const user = await User.findById(req.user?.userId).select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
});

export default router;
