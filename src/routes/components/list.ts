import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
    res.set("APP-Toast", `Sorry boddy error occur!`)
    res.render("partials/components/list", { layout: false });
});

export default router;