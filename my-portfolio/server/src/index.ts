import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes/index";
import pool from "./db/db";
import path from "path";

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Body parser
app.use(express.json());

// API Routes
app.use("/api", apiRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

// Static uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Start server
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  pool
    .getConnection()
    .then(() => console.log("✅ MySQL connected successfully"))
    .catch((err) => console.error("❌ MySQL connection failed:", err));
});