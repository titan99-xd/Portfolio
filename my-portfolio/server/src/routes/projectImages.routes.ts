import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {upload} from "../middleware/upload.middleware";

import {
  getProjectImages,
  addProjectImage,
  deleteProjectImage
} from "../controllers/projectImages.controller";

const router = Router();

// Get all images for a project
router.get("/:projectId", getProjectImages);

// Upload & attach image to project (admin only)
router.post(
  "/:projectId",
  authenticateToken,
  upload.single("image"),
  addProjectImage
);

// Delete image (admin only)
router.delete(
  "/image/:imageId",
  authenticateToken,
  deleteProjectImage
);

export default router;
