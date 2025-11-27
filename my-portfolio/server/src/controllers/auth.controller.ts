import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { safeRows } from "../utils/dbHelpers";

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
}

/* ============================================================
   REGISTER ADMIN (run once, or remove after first use)
============================================================ */
export const registerAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({
      error: "Name, email, and password (min 6 chars) required.",
    });
  }

  try {
    // Check if admin exists
    const checkQuery = await pool.query<UserRow[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const users = safeRows<UserRow>(checkQuery);

    if (users.length > 0) {
      return res.status(400).json({ error: "Admin already registered." });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert admin
    const insertResult = await pool.query<ResultSetHeader>(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES (?, ?, ?, 'admin')`,
      [name, email, passwordHash]
    );

    const info = insertResult[0] as ResultSetHeader;

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully.",
      userId: info.insertId,
    });
  } catch {
    return res.status(500).json({ error: "Failed to register admin." });
  }
};

/* ============================================================
   LOGIN
============================================================ */
export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Fetch user
    const userQuery = await pool.query<UserRow[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const users = safeRows<UserRow>(userQuery);
    const [user] = users;

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Compare password
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch {
    return res.status(500).json({ error: "Failed to log in." });
  }
};
