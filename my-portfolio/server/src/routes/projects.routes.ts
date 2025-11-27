import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

// Public
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Admin-only
router.post("/", verifyToken, createProject);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);

export default router;
