import { Router } from "express";
import messagesRoutes from "./messages.routes";
import projectRoutes from "./project.routes";

const router = Router();

router.use("/messages", messagesRoutes);
router.use("/projects", projectRoutes);

export default router;
