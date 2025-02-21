import { Router } from "express";
import homeRoutes from "./home";
import aboutRoutes from "./about";

const router = Router();

// Use all route modules
router.use("/", homeRoutes)
router.use("/about", aboutRoutes)

export default router;