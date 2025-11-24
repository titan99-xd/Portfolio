import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/db";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  pool.getConnection()
    .then(() => console.log("✅ MySQL connected successfully"))
    .catch(err => console.error("❌ MySQL connection failed:", err));
});
