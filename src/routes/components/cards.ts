import { Router } from "express";
import { cards } from "../../data";
import { Utils } from "../utils";

interface CardError {
    title?: string;
    description?: string
}

const router = Router();

router.get("/", (req, res) => {
    res.render("partials/components/cards/list", { layout: false, cards: cards.list });
});

router.get("/new", async (req, res) => {
    await Utils.loading(1000)
    // res.set("APP-Toast", `Sorry boddy error occur!`)
    res.render("partials/components/cards/card-form", { layout: false });
});
router.post("/new", async (req, res) => {
    let { title, description } = req.body
    title = title.trim()
    description.trimStart()

    await Utils.loading(1500)
    const error:CardError = {}
    if (!title) {
        error.title = 'Title is required!'
    }
    if (!description) {
        error.description = 'Description is required!'
    }

    if (!Utils.isEmptyObjective(error)) {
        res.set("APP-Toast", JSON.stringify({ message: `Invalid form data.`, 'theme': 'error' }))
        res.render("partials/components/cards/card-form", { layout: false, error, card: { title, description } });
    } else {
        res.set("HX-Reswap", "beforeend")
        res.set("HX-Retarget", "#cards")
        res.set("HX-Trigger", "dialogClose")
        res.set("HX-Trigger-After-Swap", JSON.stringify({ "clearForm" : { "target": "#cardForm" }}))
        res.set("APP-Toast", JSON.stringify({ message: `Card created!`, 'theme': 'success' }))

        const newCard = cards.addCard(title, description)
        res.render("partials/components/cards/media-card", { layout: false, card: newCard });
    }
});

router.get("/:id/edit", async (req, res) => {
    await Utils.loading(1000)
    const { id } = req.params
    const card = cards.getCard(id)
    if (card) {
        res.render("partials/components/cards/card-form", { layout: false, card });
    } else {
        res.set("APP-Toast", JSON.stringify({ message: `Item not found!`, 'theme': 'error' }))
        res.status(400).send(`Item not found width id: ${id}`)
    }
});
router.post("/:id/edit", async (req, res) => {
    const { id } = req.params
    let { title, description } = req.body
    title = title.trim()
    description.trimStart()

    await Utils.loading(1500)
    const error:CardError = {}
    if (!title) {
        error.title = 'Title is required!'
    }
    if (!description) {
        error.description = 'Description is required!'
    }

    if (!Utils.isEmptyObjective(error)) {
        res.set("APP-Toast", JSON.stringify({ message: `Invalid form data.`, 'theme': 'error' }))
        res.render("partials/components/cards/card-form", { layout: false, error, card: { id, title, description } });
    } else {
        res.set("HX-Reswap", "outerHTML")
        res.set("HX-Retarget", `#card-${id}`)
        res.set("HX-Trigger", "dialogClose")
        // res.set("HX-Trigger-After-Swap", JSON.stringify({ "clearForm" : { "target": "#cardForm" }}))
        res.set("APP-Toast", JSON.stringify({ message: `Card updated!`, 'theme': 'success' }))

        const newCard = cards.updateCard({ id, title, description })
        res.render("partials/components/cards/media-card", { layout: false, card: newCard });
    }
});

router.delete("/:id", async (req, res) => {
    await Utils.loading(1500)
    const { id } = req.params
    const index = cards.removeCard(id)

    if (index) {
        res.set("APP-Toast", JSON.stringify({ message: `Card deleted!`, 'theme': 'success' }))
        res.status(200).send()
    } else {
        res.set("APP-Toast", JSON.stringify({ message: `Item not found!`, 'theme': 'error' }))
        res.status(400).send(`Item not found width id: ${id}`)
    }
});

export default router;