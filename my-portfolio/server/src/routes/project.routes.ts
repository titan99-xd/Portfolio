import { Router } from "express";
import { getProjects, getProjectById, createProject } from "../controllers/projects.controller";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", createProject); // later protected by admin login

export default router;
