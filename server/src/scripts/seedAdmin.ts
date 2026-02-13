import mongoose from "mongoose";
import User from "../models/User.model";
import "dotenv/config";   // ✅ VERY IMPORTANT
import { hashPassword } from "../utils/hash";

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    const email = "admin@gmail.com";

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("❗ Admin already exists");
      process.exit(0);
    }

     const passwordHash = await hashPassword("123456");

    await User.create({
      name: "Admin",
      email,
      passwordHash,
      role: "admin",
      roleStatus: "approved",
      provider: "local",
    });

    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
