import { Router } from "express";
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from "../controllers/blog.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

// Public list
router.get("/", getAllPosts);

// Admin routes MUST be above slug route
router.post("/", verifyToken, createPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

// Public single post by slug (keep LAST)
router.get("/:slug", getPostBySlug);

export default router;