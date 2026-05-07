import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = Number(process.env.PORT) || 8080;
export const DB_URI = process.env.MONGODB_URI;
export const DB_NAME = process.env.MONGODB_DB_NAME || "ytbackend";
