import { isValidObjectId } from "mongoose";
import { Crypto } from "../helpers/bcrypt.js";
import { salesmanCollection } from "../model/salesman.model.js";
import { handleError } from "../utils/error-res.js";
import { successRes } from "../utils/success.js";
import {
  createSalesmanValidation,
  updateSalesmanValidation,
} from "../validation/salesman.validation.js";

const cryptoPassword = new Crypto();

export class salesmanController {
  async createSalesman(req, res) {
    try {
      const { value, error } = createSalesmanValidation(req.body);
      if (error) {
        return handleError(res, `err with validation`, 422);
      }
      const existSalesman = await salesmanCollection.findOne({
        username: value.username,
      });
      if (existSalesman) {
        return handleError(res, `User name exist`, 409);
      }
      const { password, ...rest } = value;
      const hashedPassword = await cryptoPassword.encrypt(value.password);
      const newSalesman = await salesmanCollection.create({
        ...rest,
        hashedPassword,
      });
      return successRes(res, newSalesman);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getAllSalesman(req, res) {
    try {
      const admins = await salesmanCollection.find();
      return successRes(res, admins);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getSalesmanById(req, res) {
    try {
      const salesman = await salesmanController.findSalesmanByid(
        res,
        req.params.id
      );
      if (!salesman) {
        return handleError(res, `Salesman not found`);
      }
      return successRes(res, salesman);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updateSalesmanByid(req, res) {
    try {
      const { value, error } = updateSalesmanValidation(req.body);
      if (error) {
        return handleError(res, `Validation err`, 422);
      }
      const findsalesman = await salesmanController.findSalesmanByid(
        res,
        req.params.id
      );
      if (!findsalesman) {
        return handleError(res, `Salesman not found`, 404);
      }
      const existSalesman = await salesmanCollection.findOne({
        name: req.body.name,
      });
      if (existSalesman) {
        return handleError(res, "name exists", 409);
      }
      let hashedPassword = findsalesman.hashedPassword;
      if (value.password) {
        hashedPassword = await cryptoPassword.encrypt(value.password);
      }
      const updatedSalesman = await salesmanCollection.findByIdAndUpdate(
        req.params.id,
        { ...value, hashedPassword },
        { new: true }
      );
      return successRes(res, updatedSalesman);
    } catch (error) {
      return handleError(res, error);
    }
  }

  static async findSalesmanByid(res, id) {
    if (!isValidObjectId(id)) {
      return handleError(res, `Invalid ObjId`);
    }
    const salesman = await salesmanCollection.findById(id);
    if (!salesman) {
      return handleError(res, `Not salesman found`, 404);
    }
    return salesman;
  }
}
