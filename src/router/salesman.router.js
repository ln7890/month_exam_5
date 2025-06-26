import { Router } from "express";
import { salesmanController } from "../controller/salesman.controller.js";

const salesmanCon = new salesmanController();
const router = Router();

router
  .post("/", salesmanCon.createSalesman)
  .get("/", salesmanCon.getAllSalesman)
  .get("/:id", salesmanCon.getSalesmanById);

export default router;
