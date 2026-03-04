// src/app.ts
import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import testRoutes from "./routes/test.routes";
import prsRoutes from "./routes/prs.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import testAttemptRoutes from "./routes/testAttempt.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import adminRoutes from "./routes/admin.routes";
const app: Application = express();

/* =====================
   BODY PARSERS (FIRST)
===================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =====================
   CORS
===================== */


// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://career-compass-plum-five.vercel.app"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://career-compass-plum-five.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));


/* =====================
   LOGGER
===================== */
app.use(morgan("dev"));


/* =====================
   ROUTES
===================== */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/prs", prsRoutes);
app.use("/api/test-attempts", testAttemptRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

/* =====================
   HEALTH CHECK
===================== */
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "CareerCompass API is running ✅",
  });
});

/* =====================
   ROOT
===================== */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "CareerCompass backend is up and running 🚀",
  });
});

/* =====================
   404 (LAST)
===================== */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

export default app;
