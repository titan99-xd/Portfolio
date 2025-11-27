import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes/index";
import pool from "./db/db";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", apiRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

// Static folder for uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  pool.getConnection()
    .then(() => console.log("✅ MySQL connected successfully"))
    .catch(err => console.error("❌ MySQL connection failed:", err));
});