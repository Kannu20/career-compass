// src/models/User.model.ts
import { Schema, model, models, Document } from "mongoose";
import mongoose from "mongoose";

export type UserRole = "student" | "tpo" | "mentor";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "student" | "mentor" | "tpo";
  branch?: string;
  year?: number;
  createdAt: Date;
  updatedAt: Date;
  requestedRole?: "mentor" | "tpo" | null;
  roleStatus?: "approved" | "pending" | "rejected";
  provider: "local" | "google";
  firebaseUid?: string;
  emailVerified: boolean;
  approvedBy?: Schema.Types.ObjectId | null;
  approvedAt?: Date | null;
  tokenVersion: { type: Number, default: 0 }

}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      required: true,
      default: "local",
    } as const,
    passwordHash: {
      type: String,
      // required: function () {
      //   return this.provider === "local";
      // },
    },

    firebaseUid: {
      type: String,
    },


    emailVerified: {
      type: Boolean,
      default: true,
    },


    role: {
      type: String,
      enum: ["student", "tpo", "mentor", "admin"],
      default: "student",
    },

    requestedRole: {
      type: String,
      enum: ["mentor", "tpo", null],
      default: null,
    },

    roleStatus: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "approved", // student auto-approved
    },

    tokenVersion: {
      type: Number,
      default: 0,
    },

    branch: {
      type: String,
      default: null,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    approvedAt: Date,
    year: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);


const User = models.User || model<IUser>("User", UserSchema);

export default User;
