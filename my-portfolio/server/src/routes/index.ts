import { Router } from "express";
import messagesRoutes from "./messages.routes";
import projectRoutes from "./project.routes";
import blogRoutes from "./blog.routes";




const router = Router();

router.use("/messages", messagesRoutes);
router.use("/projects", projectRoutes);
router.use("/blog", blogRoutes);

export default router;
