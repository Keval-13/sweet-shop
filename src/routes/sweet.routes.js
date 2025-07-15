import { Router } from "express";
import { addSweet } from "../controllers/sweet.controller.js";

const router = Router();

router.post("/", addSweet);

export default router;