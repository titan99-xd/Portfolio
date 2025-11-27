import { Request, Response } from "express";
import pool from "../db/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { safeRows } from "../utils/dbHelpers";

/* ============================================================
   GET ALL IMAGES FOR A PROJECT
============================================================ */
export const getProjectImages = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  try {
    const result = await pool.query<RowDataPacket[]>(
      "SELECT * FROM project_images WHERE project_id = ? ORDER BY id ASC",
      [projectId]
    );

    const images = safeRows(result);
    return res.json(images);

  } catch {
    return res.status(500).json({ error: "Failed to load project images" });
  }
};

/* ============================================================
   ADD IMAGE TO PROJECT
============================================================ */
export const addProjectImage = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  // This comes from upload middleware: req.file.path → url
  const imageUrl = req.file?.path;

  if (!imageUrl) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  try {
    const [insert] = await pool.query<ResultSetHeader>(
      "INSERT INTO project_images (project_id, image_url) VALUES (?, ?)",
      [projectId, imageUrl]
    );

    return res.status(201).json({
      success: true,
      imageId: insert.insertId,
      imageUrl
    });

  } catch {
    return res.status(500).json({ error: "Failed to add image" });
  }
};

/* ============================================================
   DELETE IMAGE
============================================================ */
export const deleteProjectImage = async (req: Request, res: Response) => {
  const { imageId } = req.params;

  try {
    await pool.query("DELETE FROM project_images WHERE id = ?", [imageId]);

    return res.json({ success: true, message: "Image deleted" });

  } catch {
    return res.status(500).json({ error: "Failed to delete image" });
  }
};
