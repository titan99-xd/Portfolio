import { Request, Response } from "express";
import pool from "../db/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { safeRows } from "../utils/dbHelpers";

interface BlogPost extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  author_id: number | null;
  created_at: string;
  updated_at: string;
}

/* ============================================================
   GET ALL POSTS
============================================================ */
export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query<BlogPost[]>(
      "SELECT * FROM blog_posts ORDER BY created_at DESC"
    );

    const rows = safeRows<BlogPost>(result);
    return res.json(rows);
  } catch {
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
};

/* ============================================================
   GET POST BY SLUG
============================================================ */
export const getPostBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const result = await pool.query<BlogPost[]>(
      "SELECT * FROM blog_posts WHERE slug = ?",
      [slug]
    );

    const rows = safeRows<BlogPost>(result);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(rows[0]);
  } catch {
    return res.status(500).json({ error: "Failed to fetch post" });
  }
};

/* ============================================================
   CREATE BLOG POST (with tags)
============================================================ */
export const createPost = async (req: Request, res: Response) => {
  const { title, slug, content, cover_image, author_id, tags } = req.body;

  if (!title || !slug || !content) {
    return res.status(400).json({
      error: "Title, slug, and content are required.",
    });
  }

  try {
    // 1. Insert new post
    const insertResult = await pool.query<ResultSetHeader>(
      `INSERT INTO blog_posts (title, slug, content, cover_image, author_id)
       VALUES (?, ?, ?, ?, ?)`,
      [title, slug, content, cover_image ?? null, author_id ?? null]
    );

    const postInfo = insertResult[0] as ResultSetHeader;
    const postId = postInfo.insertId;

    // 2. Process tags
    if (Array.isArray(tags) && tags.length > 0) {
      for (const tag of tags) {
        // Check if tag exists
        const tagQuery = await pool.query<RowDataPacket[]>(
          "SELECT id FROM tags WHERE name = ?",
          [tag]
        );

        const tagRows = safeRows<RowDataPacket>(tagQuery);

        // FINAL FIX — destructure to avoid undefined warnings
        const [firstTag] = tagRows;

        let tagId: number;

        if (firstTag) {
          tagId = firstTag.id as number;
        } else {
          const newTagResult = await pool.query<ResultSetHeader>(
            "INSERT INTO tags (name) VALUES (?)",
            [tag]
          );

          const tagInfo = newTagResult[0] as ResultSetHeader;
          tagId = tagInfo.insertId;
        }

        // Insert into join table
        await pool.query(
          "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)",
          [postId, tagId]
        );
      }
    }

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      postId,
    });
  } catch {
    return res.status(500).json({ error: "Failed to create post" });
  }
};

/* ============================================================
   UPDATE BLOG POST
============================================================ */
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, slug, content, cover_image } = req.body;

  try {
    await pool.query<ResultSetHeader>(
      `UPDATE blog_posts
       SET title = ?, slug = ?, content = ?, cover_image = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, slug, content, cover_image ?? null, id]
    );

    return res.json({ success: true, message: "Post updated" });
  } catch {
    return res.status(500).json({ error: "Failed to update post" });
  }
};

/* ============================================================
   DELETE BLOG POST
============================================================ */
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM blog_posts WHERE id = ?", [id]);
    return res.json({ success: true, message: "Post deleted" });
  } catch {
    return res.status(500).json({ error: "Failed to delete post" });
  }
};
