import { Request, Response } from "express";
import pool from "../db/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { safeRows } from "../utils/dbHelpers";

interface TagRow extends RowDataPacket {
  id: number;
  name: string;
}

/* ============================================================
   GET ALL TAGS
============================================================ */
export const getAllTags = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query<TagRow[]>(
      "SELECT * FROM tags ORDER BY name ASC"
    );

    const rows = safeRows<TagRow>(result);
    return res.json(rows);
  } catch {
    return res.status(500).json({ error: "Failed to fetch tags" });
  }
};

/* ============================================================
   CREATE TAG
============================================================ */
export const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: "Tag name is required." });
  }

  try {
    const insert = await pool.query<ResultSetHeader>(
      "INSERT INTO tags (name) VALUES (?)",
      [name]
    );

    const info = insert[0] as ResultSetHeader;

    return res.status(201).json({
      success: true,
      id: info.insertId,
      name,
    });
  } catch {
    return res.status(400).json({
      error: "Tag already exists.",
    });
  }
};

/* ============================================================
   DELETE TAG
============================================================ */
export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid tag ID." });
  }

  try {
    await pool.query("DELETE FROM tags WHERE id = ?", [id]);

    return res.json({
      success: true,
      message: "Tag deleted",
    });
  } catch {
    return res.status(500).json({ error: "Failed to delete tag" });
  }
};
