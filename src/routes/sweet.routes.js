import { Router } from "express";
import { addSweet, deleteSweet, getSweets, purchaseSweet, restockSweets } from "../controllers/sweet.controller.js";

const router = Router();

router.post("/", addSweet);

router.delete("/:sweetId", deleteSweet);

router.get("/", getSweets);

router.post("/purchase", purchaseSweet);

router.patch("/restock", restockSweets);

export default router;