import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/auth.controller";

const router = Router();

// Register admin (use once, then disable/remove)
router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);

export default router;
