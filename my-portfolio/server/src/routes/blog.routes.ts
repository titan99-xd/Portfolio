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

// Public routes
router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);

// Admin-only routes
router.post("/", verifyToken, createPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
