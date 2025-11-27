import { Request, Response } from "express";
import pool from "../db/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { safeRows } from "../utils/dbHelpers";

interface ProjectRow extends RowDataPacket {
  id: number;
  title: string;
  description: string;
  link: string | null;
  thumbnail: string | null;
  created_at: string;
}

/* ============================================================
   GET ALL PROJECTS
============================================================ */
export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query<ProjectRow[]>(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    const rows = safeRows<ProjectRow>(result);
    return res.json(rows);
  } catch {
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
};

/* ============================================================
   GET PROJECT BY ID
============================================================ */
export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query<ProjectRow[]>(
      "SELECT * FROM projects WHERE id = ?",
      [id]
    );

    const rows = safeRows<ProjectRow>(result);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.json(rows[0]);
  } catch {
    return res.status(500).json({ error: "Failed to fetch project" });
  }
};

/* ============================================================
   CREATE PROJECT
============================================================ */
export const createProject = async (req: Request, res: Response) => {
  const { title, description, link, thumbnail } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      error: "Title and description are required.",
    });
  }

  try {
    const insertResult = await pool.query<ResultSetHeader>(
      `INSERT INTO projects (title, description, link, thumbnail)
       VALUES (?, ?, ?, ?)`,
      [title, description, link ?? null, thumbnail ?? null]
    );

    const info = insertResult[0] as ResultSetHeader;

    return res.status(201).json({
      success: true,
      projectId: info.insertId,
    });
  } catch {
    return res.status(500).json({ error: "Failed to create project" });
  }
};

/* ============================================================
   UPDATE PROJECT
============================================================ */
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, link, thumbnail } = req.body;

  try {
    await pool.query<ResultSetHeader>(
      `UPDATE projects
       SET title = ?, description = ?, link = ?, thumbnail = ?
       WHERE id = ?`,
      [title, description, link ?? null, thumbnail ?? null, id]
    );

    return res.json({ success: true, message: "Project updated" });
  } catch {
    return res.status(500).json({ error: "Failed to update project" });
  }
};

/* ============================================================
   DELETE PROJECT
============================================================ */
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM projects WHERE id = ?", [id]);

    return res.json({ success: true, message: "Project deleted" });
  } catch {
    return res.status(500).json({ error: "Failed to delete project" });
  }
};
