import { isValidObjectId } from "mongoose";
import { productsCollection } from "../model/products.model.js";
import { handleError } from "../utils/error-res.js";
import { successRes } from "../utils/success.js";
import {
  createProductValidation,
  updateProductValidation,
} from "../validation/products-validation.js";

export class productsController {
  async createProducts(req, res) {
    try {
      const { value, error } = createProductValidation(req.body);
      if (error) {
        return handleError(res, `Err with validation ${error}`);
      }
      const product = await productsCollection.create(value);
      return successRes(res, product, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getAllProducts(req, res) {
    try {
      const allProducts = await productsCollection
        .find()
        .populate("category_id")
        .populate("salesman_id");
      return successRes(res, allProducts);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getProductsById(req, res) {
    try {
      const product = await productsController.getProductsBywithId(
        res,
        req.params.id
      );
      return successRes(res, product);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async updateProductsByid(req, res) {
    try {
      const { value, error } = updateProductValidation(req.body);
      if (error) {
        return handleError(res, `Err with validation ${error}`);
      }
      await productsController.getProductsBywithId(res, req.params.id);
      const updatedProduct = await productsCollection.findByIdAndUpdate(
        req.params.id,
        value,
        { new: true }
      );
      return successRes(res, updatedProduct);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteProductsByid(req, res) {
    try {
      await productsController.getProductsBywithId(res, req.params.id);
      await productsCollection.findByIdAndDelete(req.params.id);
      return successRes(res, { message: "Product removed" });
    } catch (error) {
      return handleError(res, error);
    }
  }

  static async getProductsBywithId(res, id) {
    if (!isValidObjectId(id)) {
      return handleError(res, `Invalid objId`, 409);
    }
    const product = await productsCollection.findById(id);
    if (!product) {
      return handleError(res, `No products found`);
    }
    return product;
  }
}
