import { Router } from "express";
import { getAllTags, createTag, deleteTag } from "../controllers/tag.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

// Public route
router.get("/", getAllTags);

// Admin-only routes
router.post("/", verifyToken, createTag);
router.delete("/:id", verifyToken, deleteTag);

export default router;
