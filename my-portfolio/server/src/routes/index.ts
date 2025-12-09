import { Router } from "express";
import blogRoutes from "./blog.routes";
import tagRoutes from "./tag.routes";
import messagesRoutes from "./messages.routes";
import authRoutes from "./auth.routes";
import projectsRoutes from "./projects.routes";
import uploadRoutes from "./upload.routes";
import messageRoutes from "./messages.routes";




const router = Router();

router.use("/blog", blogRoutes);
router.use("/tags", tagRoutes);
router.use("/messages", messagesRoutes);
router.use("/auth", authRoutes);
router.use("/projects", projectsRoutes);
router.use("/upload", uploadRoutes);
router.use("/messages", messageRoutes);

export default router;
