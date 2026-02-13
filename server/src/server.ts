// src/server.ts
import dotenv from "dotenv";
dotenv.config(); // .env se values load karega

import app from "./app";
// ye function hum next step me src/config/db.ts me banayenge
import connectDb from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // ---------- DB Connect ----------
    await connectDb();
    console.log("✅ Connected to MongoDB");

    // ---------- Server Listen ----------
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
