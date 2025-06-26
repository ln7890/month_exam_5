import { Crypto } from "../helpers/bcrypt.js";
import { adminCollection } from "../model/admin.model.js";
import { handleError } from "../utils/error-res.js";
import { successRes } from "../utils/success.js";
import {
  createAdminValidation,
  signinAdminValidation,
  updateAdminValidation,
} from "../validation/admin-validation.js";
import { token } from "../helpers/token.js";
import { configEnv } from "../config/config.js";
import { isValidObjectId } from "mongoose";

const cryptoPassword = new Crypto();
const tokenClass = new token();
export class AdminControllerClass {
  async createAdmin(req, res) {
    try {
      const { value, error } = createAdminValidation(req.body);

      if (error) {
        handleError(res, `Error,validation ${error}`, 422);
      }
      const existsUser = await adminCollection.findOne({
        username: value.username,
      });
      if (existsUser) {
        return handleError(res, `User already exists`, 400);
      }

      const hashedPassword = await cryptoPassword.encrypt(value.password);
      const newUser = await adminCollection.create({
        username: value.username,
        phone: value.phone,
        role: value.role,
        email: value.email,
        hashedPassword,
      });
      return successRes(res, newUser, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async siginAdmin(req, res) {
    try {
      const { value, error } = signinAdminValidation(req.body);
      if (error) {
        handleError(res, `Error,validation ${error}`, 422);
      }
      const existsAdmin = await adminCollection.findOne({
        username: value.username,
      });
      if (!existsAdmin) {
        return handleError(res, `Invalid usrname/password`, 400);
      }
      const passwordCheck = await cryptoPassword.decrypt(
        value.password,
        existsAdmin.hashedPassword
      );
      if (!passwordCheck) {
        return handleError(res, `Invalid usrname/password`, 400);
      }
      const payload = { id: existsAdmin._id, role: existsAdmin.role };
      const refreshTokenAdmin = await tokenClass.generateRefreshToken(payload);
      const accesTokenAdmin = await tokenClass.generateAccessToken(payload);
      res.cookie("refreshTokenAdmin", refreshTokenAdmin, {
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
        secure: true,
      });
      return successRes(res, { data: payload, accToken: accesTokenAdmin }, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async generateAccToken(req, res) {
    try {
      const refreshTokenAdmin = req.cookies?.refreshTokenAdmin;
      const admin = await tokenClass.verifyToken(
        refreshTokenAdmin,
        configEnv.REFRESH_TOKEN_KEY
      );

      const existsAdmin = await adminCollection.findById(admin.id);
      if (!existsAdmin) {
        return successRes(res, `Not admin found`, 404);
      }
      const payload = { id: existsAdmin.id, role: existsAdmin.role };
      const newAccToken = await tokenClass.generateAccessToken(payload);
      return successRes(res, newAccToken, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async logOutClearCook(req, res) {
    try {
      const refreshTokenAdmin = req.cookies?.refreshTokenAdmin;
      const admin = await tokenClass.verifyToken(
        refreshTokenAdmin,
        configEnv.REFRESH_TOKEN_KEY
      );
      if (!admin) {
        return handleError(res, `Token error`, 400);
      }
      const existsAdmin = await adminCollection.findById(admin.id);
      if (!existsAdmin) {
        return successRes(res, `Not admin found`, 404);
      }
      res.clearCookie("refreshTokenAdmin");
      return successRes(res, `Ref token removed`);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getAllAdmins(_, res) {
    try {
      const admins = await adminCollection.find();
      return successRes(res, admins);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getAdminByid(req, res) {
    try {
      const findAdmin = await AdminControllerClass.findAdminByid(
        res,
        req.params.id
      );
      if (!findAdmin) {
        return handleError(res, `Admin not found`, 404);
      }
      return successRes(res, findAdmin);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updateAdminByid(req, res) {
    try {
      const { value, error } = updateAdminValidation(req.body);
      if (error) {
        return handleError(res, `Validation err`, 422);
      }
      const findAdmin = await AdminControllerClass.findAdminByid(
        res,
        req.params.id
      );
      if (!findAdmin) {
        return handleError(res, `Admin not found`, 404);
      }
      const existsAdminIn = await adminCollection.findOne({
        username: req.body.username,
      });
      if (existsAdminIn) {
        return handleError(res, "username exists", 409);
      }
      const hashedPassword = await cryptoPassword.encrypt(existClient.password);
      const updatedAdmin = await adminCollection.findByIdAndUpdate(
        req.params.id,
        { ...value, hashedPassword },
        { new: true }
      );
      return successRes(res, updatedAdmin);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteAdminByid(req, res) {
    try {
      await AdminControllerClass.findAdminByid(res, req.params.id);
      await adminCollection.findByIdAndDelete(req.params.id);
      return successRes(res, { message: "Admin deleted" });
    } catch (error) {
      return handleError(res, error);
    }
  }
  static async findAdminByid(res, id) {
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return handleError(res, `Invalid objId`);
    }
    const admin = await adminCollection.findById(id);
    if (!admin) {
      return handleError(res, `Admin not found`, 404);
    }
    return admin;
  }
}
