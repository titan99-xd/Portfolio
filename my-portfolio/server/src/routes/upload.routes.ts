import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { uploadImage } from "../controllers/upload.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

// admin only
router.post("/", verifyToken, upload.single("image"), uploadImage);

export default router;
