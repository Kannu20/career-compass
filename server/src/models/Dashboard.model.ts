import mongoose, { Schema, Document } from "mongoose";

export interface IDashboard extends Document {
  userId: mongoose.Types.ObjectId;
  overallScore: number;
  skills: {
    dsa: number;
    core: number;
    projects: number;
    resume: number;
  };
  updatedAt: Date;
}

const DashboardSchema = new Schema<IDashboard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    overallScore: {
      type: Number,
      required: true,
    },
    skills: {
      dsa: { type: Number, required: true },
      core: { type: Number, required: true },
      projects: { type: Number, required: true },
      resume: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDashboard>("Dashboard", DashboardSchema);
