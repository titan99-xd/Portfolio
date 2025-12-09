import { Router } from "express";
import {
  createMessage,
  getMessages,
  deleteMessage
} from "../controllers/messages.controller";

import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

// Public
router.post("/", createMessage);

// Admin
router.get("/", verifyToken, getMessages);
router.delete("/:id", verifyToken, deleteMessage);

export default router;