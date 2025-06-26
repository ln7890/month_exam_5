import { handleError } from "../utils/error-res";
import { createCategoryValidation } from "../validation/category.validation";

export class categoryClass {
  async createCategory(req, res) {
    try {
      const { value, error } = createCategoryValidation(req.body);
      if (error) {
        return handleError(res, `Err with validation ${error}`, 409);
      }
    } catch (error) {
      return handleError(res, error);
    }
  }
}
