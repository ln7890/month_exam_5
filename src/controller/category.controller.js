import { isValidObjectId } from "mongoose";
import { categoryCollect } from "../model/category.model.js";
import { handleError } from "../utils/error-res.js";
import { successRes } from "../utils/success.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../validation/category.validation.js";

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
      const category = await categoryClass.getCategoryById(res, req.params.id);
      return successRes(res, category);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async updateCategoryByid(req, res) {
    try {
      const { value, error } = updateCategoryValidation(req.body);
      if (error) {
        return handleError(res, `Err with validation`, 409);
      }
      const updatedCategory = await categoryCollect.findByIdAndUpdate(
        req.params.id,
        value,
        { new: true }
      );
      return successRes(res, updatedCategory, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async deleteCategoryByid(req, res) {
    try {
      await categoryClass.getCategoryById(res, req.params.id);
      await categoryCollect.findByIdAndDelete(req.params.id);
      return successRes(res, { message: "Category removed" }, 200);
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
