import { Router } from "express";
import { categoryClass } from "../controller/category.controller.js";

const router = Router();
const categoryCon = new categoryClass();

router.post("/", categoryCon.createCategory);

export default router;
