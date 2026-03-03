import { Request, Response } from "express";
import Test from "../models/Test.model";
import Question from "../models/Question.model";
import mongoose from "mongoose";
import TestAttemptModel from "../models/TestAttempt.model";
// import { AuthRequest } from "../middlewares/auth.middleware";
/**
 * @route GET /api/tests
 * @desc  Get all available tests
 */
export const getAllTests = async (req: Request, res: Response) => {
    try {
        const tests = await Test.find().select("-__v");

        return res.status(200).json({
            status: "success",
            data: tests,
        });
    } catch (error) {
        console.error("Get tests error:", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch tests",
        });
    }
};

/**
 * @route GET /api/tests/:id
 * @desc  Get questions for a specific test
 */
export const getTestQuestions = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const test = await Test.findById(id);
        if (!test) {
            return res.status(404).json({
                status: "error",
                message: "Test not found",
            });
        }

        const questions = await Question.find({ testId: id }).select(
            "-correctOption -__v"
        );

        return res.status(200).json({
            status: "success",
            data: {
                test,
                questions,
            },
        });
    } catch (error) {
        console.error("Get test questions error:", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch test questions",
        });
    }
};

// export const submitTest = async (req: AuthRequest, res: Response) => {
//     try {
//         const testId = req.params.id;
//         const userId = req.user?.userId;
//         const { answers } = req.body;

//         // Basic checks
//         if (!userId) {
//             return res.status(401).json({
//                 status: "error",
//                 message: "Unauthorized",
//             });
//         }

//         if (!mongoose.Types.ObjectId.isValid(testId)) {
//             return res.status(400).json({
//                 status: "error",
//                 message: "Invalid test ID",
//             });
//         }

//         if (!Array.isArray(answers)) {
//             return res.status(400).json({
//                 status: "error",
//                 message: "Answers must be an array",
//             });
//         }

//         const test = await Test.findById(testId);
//         if (!test) {
//             return res.status(404).json({
//                 status: "error",
//                 message: "Test not found",
//             });
//         }
//         const alreadyAttempted = await Result.findOne({
//             userId,
//             testId,
//         });

//         if (alreadyAttempted) {
//             return res.status(400).json({
//                 status: "error",
//                 message: "You have already attempted this test",
//             });
//         }


//         // Fetch correct questions
//         const questions = await Question.find({ testId });

//         let score = 0;

//         // Map for quick lookup
//         const answerMap = new Map(
//             answers.map((a: any) => [a.questionId, a.selectedOption])
//         );

//         // Calculate score
//         for (const q of questions) {
//             const selected = answerMap.get(q._id.toString());
//             if (selected === q.correctOption) {
//                 score++;
//             }
//         }

//         // Save result
//         const result = await Result.create({
//             userId,
//             testId,
//             score,
//             total: questions.length,
//             category: test.category,
//         });

//         return res.status(200).json({
//             status: "success",
//             message: "Test submitted successfully",
//             data: {
//                 score,
//                 total: questions.length,
//                 category: test.category,
//             },
//         });
//     } catch (error) {
//         console.error("Submit test error:", error);
//         return res.status(500).json({
//             status: "error",
//             message: "Failed to submit test",
//         });
//     }
// };

// export const submitTest = async (req: AuthRequest, res: Response) => {
//   try {
//     const testId = req.params.id;
//     const userId = req.user?.userId;
//     const { answers } = req.body;

//     if (!testId) {
//       return res.status(400).json({
//         status: "error",
//         message: "Test ID is required",
//       });
//     }

//     if (!userId) {
//       return res.status(401).json({
//         status: "error",
//         message: "Unauthorized",
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(testId)) {
//       return res.status(400).json({
//         status: "error",
//         message: "Invalid test ID",
//       });
//     }

//     if (!Array.isArray(answers)) {
//       return res.status(400).json({
//         status: "error",
//         message: "Answers must be an array",
//       });
//     }

//     const test = await Test.findById(testId);
//     if (!test) {
//       return res.status(404).json({
//         status: "error",
//         message: "Test not found",
//       });
//     }

//     const alreadyAttempted = await TestAttemptModel.findOne({
//       userId,
//       testId,
//     });

//     if (alreadyAttempted) {
//       return res.status(400).json({
//         status: "error",
//         message: "You have already attempted this test",
//       });
//     }

//     const questions = await Question.find({ testId });

//     let score = 0;

//     const answerMap = new Map(
//       answers.map((a: any) => [a.questionId, a.selectedOption])
//     );

//     for (const q of questions) {
//       const selected = answerMap.get(q._id.toString());
//       if (selected === q.correctOption) {
//         score++;
//       }
//     }

//     await TestAttemptModel.create({
//       userId,
//       testId,
//       score,
//       total: questions.length,
//       skill: test.skill,
//     });

//     return res.status(200).json({
//       status: "success",
//       message: "Test submitted successfully",
//       data: {
//         score,
//         total: questions.length,
//         category: test.category,
//       },
//     });
//   } catch (error) {
//     console.error("Submit test error:", error);
//     return res.status(500).json({
//       status: "error",
//       message: "Failed to submit test",
//     });
//   }
// };


export const submitTest = async (req: Request, res: Response) => {
  try {
    const testId = req.params.id;
    const userId = req.user?.userId;
    const { answers } = req.body;

    if (!userId) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    if (!testId || !mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({ status: "error", message: "Invalid test ID" });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({ status: "error", message: "Answers must be an array" });
    }

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ status: "error", message: "Test not found" });
    }

    const alreadyAttempted = await TestAttemptModel.findOne({ userId, testId });
    if (alreadyAttempted) {
      return res.status(400).json({
        status: "error",
        message: "You have already attempted this test",
      });
    }

    const questions = await Question.find({ testId });

    let score = 0;
    const answerMap = new Map(
      answers.map((a: any) => [a.questionId, a.selectedOption])
    );

    for (const q of questions) {
      if (answerMap.get(q._id.toString()) === q.correctOption) {
        score++;
      }
    }

    const percentage = Math.round((score / questions.length) * 100);

    await TestAttemptModel.create({
      userId,
      testId,
      skill: test.skill,          // ✅ IMPORTANT
      score,
      total: questions.length,
      percentage,
      submittedAt: new Date(),
    });

    return res.status(200).json({
      status: "success",
      message: "Test submitted successfully",
      data: {
        score,
        total: questions.length,
        percentage,
        skill: test.skill,
      },
    });
  } catch (error) {
    console.error("Submit test error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to submit test",
    });
  }
};
