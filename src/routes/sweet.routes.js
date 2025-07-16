import { Router } from "express";
import { addSweet, deleteSweet, getSweets } from "../controllers/sweet.controller.js";

const router = Router();

router.post("/", addSweet);

router.delete("/:sweetId", deleteSweet);

router.get("/", getSweets);

export default router;