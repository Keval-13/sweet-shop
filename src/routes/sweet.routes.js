import { Router } from "express";
import { addSweet, deleteSweet } from "../controllers/sweet.controller.js";

const router = Router();

router.post("/", addSweet);

router.delete("/:sweetId", deleteSweet);

export default router;