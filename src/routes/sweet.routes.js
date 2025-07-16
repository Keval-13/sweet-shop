import { Router } from "express";
import { addSweet, deleteSweet, getSweets, purchaseSweet } from "../controllers/sweet.controller.js";

const router = Router();

router.post("/", addSweet);

router.delete("/:sweetId", deleteSweet);

router.get("/", getSweets);

router.post("/purchase", purchaseSweet);


export default router;