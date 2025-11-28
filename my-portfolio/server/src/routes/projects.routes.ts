import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/projects.controller";

import {
  getProjectImages,
  addProjectImage,
  deleteProjectImage
} from "../controllers/projectImages.controller";

import { verifyToken } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

// PUBLIC ROUTES
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// ADMIN ROUTES
router.post("/", verifyToken, createProject);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);

// IMAGES ROUTES (THE IMPORTANT PART)
router.get("/:projectId/images", verifyToken, getProjectImages);

router.post(
  "/:projectId/images",
  verifyToken,
  upload.single("file"),
  addProjectImage
);

router.delete(
  "/:projectId/images/:imageId",
  verifyToken,
  deleteProjectImage
);

export default router;
