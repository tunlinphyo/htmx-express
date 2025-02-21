import { Router } from "express";

const router = Router();

router.post("/list", (req, res) => {
    res.render("partials/components/buttons/card-list", { layout: false });
});

router.post("/card", (req, res) => {
    res.render("partials/components/buttons/add-card", { layout: false });
});

export default router;