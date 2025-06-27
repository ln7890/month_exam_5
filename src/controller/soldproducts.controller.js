import { isValidObjectId } from "mongoose";
import { soldProCollection } from "../model/sold-products.js";
import { handleError } from "../utils/error-res.js";
import { successRes } from "../utils/success.js";
import {
  createSoldProValidation,
  updateSoldProValidation,
} from "../validation/sold-products.js";

export class soldProdClass {
  async createSoldPro(req, res) {
    try {
      console.log(`object`);
      const { value, error } = createSoldProValidation(req.body);
      if (error) {
        return handleError(res, `Err with validation ${error}`, 422);
      }
      const newPro = await soldProCollection.create(value);
      return successRes(res, newPro, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getAllSold(req, res) {
    try {
      const allProducts = await soldProCollection.find();
      return successRes(res, allProducts);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getSoldById(req, res) {
    try {
      const soldPro = await soldProdClass.getProductsById(res, req.params.id);
      return successRes(res, soldPro);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async updateSoldProducts(req, res) {
    try {
      const { value, error } = updateSoldProValidation(req.body);
      if (error) {
        return handleError(res, `Err with validation ${error}`, 422);
      }
      await soldProdClass.getProductsById(res, req.params.id);
      const newPro = await soldProCollection.findByIdAndUpdate(
        req.params.id,
        value,
        { new: true }
      );
      return successRes(res, newPro);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteSoldPro(req, res) {
    try {
      await soldProdClass.getProductsById(res, req.params.id);
      await soldProCollection.findByIdAndDelete(req.params.id);
      return successRes(res, { message: "SoldProduct removed" });
    } catch (error) {
      return handleError(res, error);
    }
  }
  static async getProductsById(res, id) {
    if (!isValidObjectId(id)) {
      return handleError(res, `Invd ObjId`);
    }
    const soldPro = await soldProCollection.findById(id);
    if (!soldPro) {
      return handleError(res, `SoldPro not found`, 404);
    }
    return soldPro;
  }
}
