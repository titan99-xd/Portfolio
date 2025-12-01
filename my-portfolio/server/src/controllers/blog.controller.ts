import { Request, Response } from "express";
import pool from "../db/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { safeRows } from "../utils/dbHelpers";

/* ============================================================
   TYPES
============================================================ */
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

interface TagRow extends RowDataPacket {
  id: number;
  name: string;
}

interface CountRow extends RowDataPacket {
  total: number;
}

/* ============================================================
   GET ALL POSTS — PAGINATED
============================================================ */
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    // ---- Fetch posts ----
    const rows = safeRows<BlogPost>(
      await pool.query<BlogPost[]>(
        `
        SELECT * FROM blog_posts
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
        `,
        [limit, offset]
      )
    );

    // ---- Count total ----
    const countRows = safeRows<CountRow>(
      await pool.query<CountRow[]>("SELECT COUNT(*) AS total FROM blog_posts")
    );

    const total = countRows[0]?.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    return res.json({
      posts: rows,
      page,
      totalPages,
      total,
    });
  } catch (err) {
    console.error("getAllPosts error:", err);
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
};

/* ============================================================
   GET POST BY SLUG
============================================================ */
export const getPostBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const rows = safeRows<BlogPost>(
      await pool.query<BlogPost[]>(
        "SELECT * FROM blog_posts WHERE slug = ?",
        [slug]
      )
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error("getPostBySlug error:", err);
    return res.status(500).json({ error: "Failed to fetch post" });
  }
};

/* ============================================================
   HELPER — Resolve or Insert Tag
============================================================ */
async function resolveTagId(tagName: string): Promise<number> {
  const existingRows = safeRows<TagRow>(
    await pool.query<TagRow[]>(
      "SELECT id FROM tags WHERE name = ?",
      [tagName]
    )
  );

  const existing = existingRows[0];

  if (existing && existing.id) {
    return existing.id;
  }

  const newTag = await pool.query<ResultSetHeader>(
    "INSERT INTO tags (name) VALUES (?)",
    [tagName]
  );

  return (newTag[0] as ResultSetHeader).insertId;
}

/* ============================================================
   CREATE BLOG POST (tag names allowed)
============================================================ */
export const createPost = async (req: Request, res: Response) => {
  const { title, slug, content, cover_image, author_id, tags } = req.body;

  if (!title || !slug || !content) {
    return res.status(400).json({
      error: "Title, slug, and content are required.",
    });
  }

  try {
    // ---- Insert main post ----
    const insert = await pool.query<ResultSetHeader>(
      `
      INSERT INTO blog_posts (title, slug, content, cover_image, author_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, slug, content, cover_image ?? null, author_id ?? null]
    );

    const postId = (insert[0] as ResultSetHeader).insertId;

    // ---- Process tags ----
    if (Array.isArray(tags)) {
      for (const t of tags) {
        const name = String(t).trim().toLowerCase();
        if (!name) continue;

        const tagId = await resolveTagId(name);

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
      slug,
    });
  } catch (err) {
    console.error("createPost error:", err);
    return res.status(500).json({ error: "Failed to create post" });
  }
};

/* ============================================================
   UPDATE BLOG POST
============================================================ */
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, slug, content, cover_image, tags } = req.body;

  try {
    // ---- Update main post ----
    await pool.query<ResultSetHeader>(
      `
      UPDATE blog_posts
      SET title = ?, slug = ?, content = ?, cover_image = ?, updated_at = NOW()
      WHERE id = ?
      `,
      [title, slug, content, cover_image ?? null, id]
    );

    // ---- Remove old tags ----
    await pool.query("DELETE FROM post_tags WHERE post_id = ?", [id]);

    // ---- Insert new tags ----
    if (Array.isArray(tags)) {
      for (const t of tags) {
        const name = String(t).trim().toLowerCase();
        if (!name) continue;

        const tagId = await resolveTagId(name);

        await pool.query(
          "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)",
          [id, tagId]
        );
      }
    }

    return res.json({ success: true, message: "Post updated" });
  } catch (err) {
    console.error("updatePost error:", err);
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
  } catch (err) {
    console.error("deletePost error:", err);
    return res.status(500).json({ error: "Failed to delete post" });
  }
};