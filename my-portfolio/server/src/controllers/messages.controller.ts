import { Request, Response } from "express";
import pool from "../db/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

/* ---------- TYPES ---------- */
interface MessageRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

/* ============================================================
   CREATE MESSAGE (Public)
============================================================ */
export const createMessage = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    await pool.query<ResultSetHeader>(
      `
      INSERT INTO messages (name, email, subject, message)
      VALUES (?, ?, ?, ?)
      `,
      [name, email, subject ?? null, message]
    );

    return res.status(201).json({ success: true, message: "Message saved." });
  } catch (err) {
    console.error("createMessage error:", err);
    return res.status(500).json({ error: "Failed to save message." });
  }
};

/* ============================================================
   GET ALL MESSAGES (Admin)
============================================================ */
export const getMessages = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<MessageRow[]>(
      `SELECT * FROM messages ORDER BY created_at DESC`
    );

    return res.json(rows);
  } catch (err) {
    console.error("getMessages error:", err);
    return res.status(500).json({ error: "Failed to fetch messages." });
  }
};

/* ============================================================
   DELETE MESSAGE (Admin)
============================================================ */
export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM messages WHERE id = ?", [id]);
    return res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    console.error("deleteMessage error:", err);
    return res.status(500).json({ error: "Failed to delete message." });
  }
};