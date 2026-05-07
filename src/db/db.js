import mongoose from "mongoose";
import { DB_URI, DB_NAME, NODE_ENV } from "../constants.js";

const connectionOptions = {
  dbName: DB_NAME,
  autoIndex: NODE_ENV !== "production",
  maxPoolSize: 20,
  minPoolSize: 5,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 10000,
  family: 4,
};

const registerMongooseListeners = () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });
};

export const connectDB = async () => {
  if (!DB_URI) {
    throw new Error("Missing required environment variable: MONGODB_URI");
  }

  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  registerMongooseListeners();

  try {
    await mongoose.connect(DB_URI, connectionOptions);
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export const closeDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close(false);
    console.log("MongoDB connection closed");
  }
};

