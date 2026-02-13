import { Schema, model, models, Document } from "mongoose";

export interface IQuestion extends Document {
  testId: Schema.Types.ObjectId;
  question: string;
  options: string[];
  correctOption: number;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    testId: {
      type: Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctOption: { type: Number, required: true },
  },
  { timestamps: true }
);

export default models.Question ||
  model<IQuestion>("Question", QuestionSchema);
