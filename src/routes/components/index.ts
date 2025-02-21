import { Router } from "express";
import button from "./buttons";
import list from "./list";
import card from "./cards";

const router = Router();

// Use all route modules
router.use("/buttons", button)
router.use("/list", list)
router.use("/cards", card)

export default router;