import { isValidObjectId } from "mongoose";
import { categoryCollect } from "../model/category.model.js";
import { handleError } from "../utils/error-res.js";
import { successRes } from "../utils/success.js";
import { createCategoryValidation } from "../validation/category.validation.js";

export class categoryClass {
  async createCategory(req, res) {
    try {
      const { value, error } = createCategoryValidation(req.body);
      if (error) {
        return handleError(res, `Err with validation ${error}`, 409);
      }
      const exitsCategory = await categoryCollect.findOne({ name: value.name });
      if (exitsCategory) {
        return handleError(res, `This category exist`, 409);
      }
      const newCategory = await categoryCollect.create(value);
      return successRes(res, newCategory, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getAllCategory(req, res) {
    try {
      const allCategory = await categoryCollect.find();
      return successRes(res, allCategory);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getCategoryById(req, res) {
    try {
      const category = categoryClass.getCategoryById(res, req.params.id);
      return;
    } catch (error) {
      return handleError(res, error);
    }
  }
  static async getCategoryById(res, id) {
    if (!isValidObjectId(id)) {
      return handleError(res, `Invalid ObjId`, 409);
    }
    const category = await categoryCollect.findById(id);
    if (!category) {
      return handleError(res, `Category not found`, 409);
    }
    return category;
  }
}
