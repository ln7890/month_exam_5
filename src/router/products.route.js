import { Router } from "express";
import { productsController } from "../controller/products.controller.js";

const route = Router();
const productCon = new productsController();

route
  .post("/", productCon.createProducts)
  .get("/", productCon.getAllProducts)
  .get("/:id", productCon.getProductsById)
  .patch("/:id", productCon.updateProductsByid)
  .delete("/:id", productCon.deleteProductsByid);

export default route;
