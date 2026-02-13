import { Schema, model, models, Document } from "mongoose";

// export type TestCategory =
//   | "aptitude"
//   | "coding"
//   | "cs_core"
//   | "communication";

// export interface ITest extends Document {
//   title: string;
//   category: TestCategory;
//   totalMarks: number;
//   duration: number; // minutes
// }
export type SkillType = "dsa" | "core" | "projects" | "resume";

export interface ITest extends Document {
  title: string;
  skill: SkillType;
  totalMarks: number;
  duration: number; // minutes
}

const TestSchema = new Schema<ITest>(
  {
    title: { type: String, required: true },
    // category: {
    //   type: String,
    //   enum: ["aptitude", "coding", "cs_core", "communication"],
    //   required: true,
    // },
    skill: {
      type: String,
      enum: ["dsa", "core", "projects", "resume"],
      required: true,
    },
    totalMarks: { type: Number, required: true },
    duration: { type: Number, required: true },
  },
  { timestamps: true }
);

export default models.Test || model<ITest>("Test", TestSchema);
