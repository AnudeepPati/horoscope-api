import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { AppDataSource } from "./database/connection";
import authRoutes from "./routes/authRoutes";
import horoscopeRoutes from "./routes/horoscopeRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/horoscope", horoscopeRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

async function startServer() {
  try {
    // TODO: instead of console.log use logger module for logs in production
    await AppDataSource.initialize();
    console.log("Database connected.....");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}....`);
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
}

startServer();
