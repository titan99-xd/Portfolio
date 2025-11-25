import { Router } from "express";
import { createMessage } from "../controllers/messages.controller";

const router = Router();

router.post("/", createMessage);

export default router;
