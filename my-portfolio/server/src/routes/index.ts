import { Router } from "express";
import blogRoutes from "./blog.routes";
import tagRoutes from "./tag.routes";
import messagesRoutes from "./messages.routes";
import authRoutes from "./auth.routes";
import projectsRoutes from "./projects.routes";


// import projectsRoutes from "./projects.routes";

const router = Router();

router.use("/blog", blogRoutes);
router.use("/tags", tagRoutes);
router.use("/messages", messagesRoutes);
router.use("/auth", authRoutes);
router.use("/projects", projectsRoutes);


export default router;
