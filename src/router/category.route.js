import { Router } from "express";
import { categoryClass } from "../controller/category.controller.js";

const router = Router();
const categoryCon = new categoryClass();

router
  .post("/", categoryCon.createCategory)
  .get("/", categoryCon.getAllCategory)
  .get("/:id", categoryCon.getCategoryById)
  .patch("/:id", categoryCon.updateCategoryByid)
  .delete("/:id", categoryCon.deleteCategoryByid);

export default router;
