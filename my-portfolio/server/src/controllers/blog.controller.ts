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
   GET ALL POSTS — PAGINATION + TAG FILTER
   /api/blog?page=1&limit=6&tag=react
============================================================ */
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const tag = req.query.tag ? String(req.query.tag).toLowerCase() : null;

    const offset = (page - 1) * limit;

    let postsQuery = `
      SELECT DISTINCT bp.*
      FROM blog_posts bp
    `;

    let countQuery = `
      SELECT COUNT(DISTINCT bp.id) AS total
      FROM blog_posts bp
    `;

    const params: (string | number)[] = [];
    const countParams: (string | number)[] = [];

    // ---------- If tag filter exists ----------
    if (tag) {
      postsQuery += `
        INNER JOIN post_tags pt ON pt.post_id = bp.id
        INNER JOIN tags t ON t.id = pt.tag_id
        WHERE t.name = ?
      `;

      countQuery += `
        INNER JOIN post_tags pt ON pt.post_id = bp.id
        INNER JOIN tags t ON t.id = pt.tag_id
        WHERE t.name = ?
      `;

      params.push(tag);
      countParams.push(tag);
    }

    // ---------- Ordering + pagination ----------
    postsQuery += `
      ORDER BY bp.created_at DESC
      LIMIT ? OFFSET ?
    `;

    params.push(limit, offset);

    // ---------- Execute ----------
    const posts = safeRows<BlogPost>(
      await pool.query(postsQuery, params)
    );

    const count = safeRows<CountRow>(
      await pool.query(countQuery, countParams)
    )[0]?.total || 0;

    return res.json({
      posts,
      page,
      totalPages: Math.ceil(count / limit),
      total: count,
      tag: tag ?? null,
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

  if (existingRows[0]) return existingRows[0].id;

  const newTag = await pool.query<ResultSetHeader>(
    "INSERT INTO tags (name) VALUES (?)",
    [tagName]
  );

  return (newTag[0] as ResultSetHeader).insertId;
}

/* ============================================================
   CREATE BLOG POST
============================================================ */
export const createPost = async (req: Request, res: Response) => {
  const { title, slug, content, cover_image, author_id, tags } = req.body;

  if (!title || !slug || !content) {
    return res.status(400).json({
      error: "Title, slug, and content are required.",
    });
  }

  try {
    const insert = await pool.query<ResultSetHeader>(
      `
      INSERT INTO blog_posts (title, slug, content, cover_image, author_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, slug, content, cover_image ?? null, author_id ?? null]
    );

    const postId = insert[0].insertId;

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
    await pool.query<ResultSetHeader>(
      `
      UPDATE blog_posts
      SET title = ?, slug = ?, content = ?, cover_image = ?, updated_at = NOW()
      WHERE id = ?
      `,
      [title, slug, content, cover_image ?? null, id]
    );

    await pool.query("DELETE FROM post_tags WHERE post_id = ?", [id]);

    if (Array.isArray(tags)) {
      for (const t of tags) {
        const name = t.toLowerCase().trim();
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
   DELETE POST
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