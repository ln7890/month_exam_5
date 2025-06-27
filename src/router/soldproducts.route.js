import { Router } from "express";
import { soldProdClass } from "../controller/soldproducts.controller.js";
import { AuthGuard } from "../guards/auth.guard.js";

const router = Router();
const soldProCon = new soldProdClass();

router
  .post("/", soldProCon.createSoldPro)
  .get("/", AuthGuard, soldProCon.getAllSold)
  .get("/:id", soldProCon.getSoldById)
  .patch("/:id", soldProCon.updateSoldProducts)
  .delete("/:id", soldProCon.deleteSoldPro);

export default router;
