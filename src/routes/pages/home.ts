import { Router } from "express";
import { cards } from "../../data";

const router = Router();

router.get("/", (req, res) => {
    console.log('CARDS::', cards.list)
    res.render("home", { title: "Welcome", listItems: cards.list });
});

export default router;