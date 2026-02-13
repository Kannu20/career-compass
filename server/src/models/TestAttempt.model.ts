// import { Schema, model, models, Document } from "mongoose";

// export interface IResult extends Document {
//     userId: Schema.Types.ObjectId;
//     testId: Schema.Types.ObjectId;
//     score: number;
//     total: number;
//     category: string;
//     startedAt?: Date;
//     submittedAt?: Date;
//     timeTaken?: number; // seconds
// }

// const ResultSchema = new Schema<IResult>(
//     {
//         userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//         testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
//         score: { type: Number, required: true },
//         total: { type: Number, required: true },
//         category: { type: String, required: true },
//         startedAt: { type: Date },
//         submittedAt: { type: Date },
//         timeTaken: { type: Number } // seconds
//     },
//     { timestamps: true }
// );

// export default models.Result || model<IResult>("Result", ResultSchema);

import { Schema, model, models, Document } from "mongoose";

export type SkillType = "dsa" | "core" | "projects" | "resume";

export interface ITestAttempt extends Document {
  userId: Schema.Types.ObjectId;
  testId: Schema.Types.ObjectId;

  skill: SkillType;

  score: number;
  total: number;
  percentage: number;

  startedAt?: Date;
  submittedAt?: Date;
  timeTaken?: number; // seconds
}

const TestAttemptSchema = new Schema<ITestAttempt>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testId: {
      type: Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },

    skill: {
      type: String,
      enum: ["dsa", "core", "projects", "resume"],
      required: true,
    },

    score: { type: Number, required: true },
    total: { type: Number, required: true },
    percentage: { type: Number, required: true },

    startedAt: { type: Date },
    submittedAt: { type: Date },
    timeTaken: { type: Number },
  },
  { timestamps: true }
);

export default models.TestAttempt ||
  model<ITestAttempt>("TestAttempt", TestAttemptSchema);
