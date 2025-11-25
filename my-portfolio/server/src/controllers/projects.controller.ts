import { Request, Response } from "express";
import pool from "../db/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

// RowDataPacket type for SELECT:
interface Project extends RowDataPacket {
  id: number;
  title: string;
  description: string;
  link: string | null;
  thumbnail: string | null;
  created_at: string;
}

// -----------------------------------------------------
// GET ALL
// -----------------------------------------------------
export const getProjects = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<Project[]>(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    return res.json(rows);
  } catch {
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// -----------------------------------------------------
// GET BY ID
// -----------------------------------------------------
export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query<Project[]>(
      "SELECT * FROM projects WHERE id = ?",
      [id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.json(rows[0]);
  } catch {
    return res.status(500).json({ error: "Failed to fetch project" });
  }
};

// -----------------------------------------------------
// CREATE PROJECT
// -----------------------------------------------------
export const createProject = async (req: Request, res: Response) => {
  const { title, description, link, thumbnail } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required." });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO projects (title, description, link, thumbnail)
       VALUES (?, ?, ?, ?)`,
      [title, description, link ?? null, thumbnail ?? null]
    );

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      projectId: result.insertId, // ← NO ANY, CORRECT TYPE
    });
  } catch {
    return res.status(500).json({ error: "Failed to create project" });
  }
};
