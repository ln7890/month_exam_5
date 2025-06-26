import { handleError } from "../utils/error-res";
import { createProductValidation } from "../validation/products-validation";

export class productsController {
  async createProducts(req, res) {
    try {
      const { value, error } = createProductValidation(req.body);
    } catch (error) {
      return handleError(res, error);
    }
  }
}
