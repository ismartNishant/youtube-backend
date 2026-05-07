import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/db.js";
import { PORT } from "./constants.js";

dotenv.config();

const app = express();

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
};

startServer();
