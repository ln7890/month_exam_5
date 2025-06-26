import { clientCollection } from "../model/client.model.js";
import { handleError } from "../utils/error-res.js";
import { successRes } from "../utils/success.js";
import {
  createClientValidation,
  signInClientValidation,
  updateClientValidation,
} from "../validation/client.validation.js";
import { Crypto } from "../helpers/bcrypt.js";
import { token } from "../helpers/token.js";
import { configEnv } from "../config/config.js";
import { isValidObjectId } from "mongoose";

const tokenService = new token();
const cryptoPassword = new Crypto();

export class clientControllerClass {
  async createCreate(req, res) {
    try {
      const { value, error } = createClientValidation(req.body);
      const isClientExist = await clientCollection.findOne({
        name: value.name,
      });
      if (isClientExist) {
        return handleError(res, `Name already exists`, 409);
      }
      if (error) {
        return handleError(res, `Err with validation ${error}`, 409);
      }
      const { password, ...rest } = value;
      const hashedPassword = await cryptoPassword.encrypt(password);
      const client = await clientCollection.create({
        ...rest,
        hashedPassword,
      });
      return successRes(res, client, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async signInClient(req, res) {
    try {
      const { value, error } = signInClientValidation(req.body);
      if (error) {
        return handleError(res, `Err with val ${error}`, 422);
      }
      const existClient = await clientCollection.findOne({ name: value.name });
      if (!existClient) {
        return handleError(res, `Client not found`, 404);
      }
      const passwordCheck = await cryptoPassword.decrypt(
        value.password,
        existClient.hashedPassword
      );
      if (!passwordCheck) {
        return handleError(res, `Invalid usrname/password`, 400);
      }

      const payload = { id: existClient._id, name: existClient.name };
      const refreshTokenClient = await tokenService.generateRefreshToken(
        payload
      );
      const accesTokenClient = await tokenService.generateAccessToken(payload);
      res.cookie("refreshTokenClient", refreshTokenClient, {
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
        secure: true,
      });
      return successRes(
        res,
        { data: payload, accToken: accesTokenClient },
        201
      );
    } catch (error) {
      return handleError(res, error);
    }
  }
  async generateAccToken(req, res) {
    try {
      const refreshTokenClient = req.cookies?.refreshTokenClient;
      const client = await tokenService.verifyToken(
        refreshTokenClient,
        configEnv.REFRESH_TOKEN_KEY
      );

      const existsClient = await clientCollection.findById(client.id);
      if (!existsClient) {
        return successRes(res, `Not client found`, 404);
      }
      const payload = { id: existsClient._id, name: existsClient.name };
      const newAccToken = await tokenService.generateAccessToken(payload);
      return successRes(res, newAccToken, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async logOut(req, res) {
    try {
      const refreshTokenClient = req.cookies?.refreshTokenClient;
      const client = await tokenService.verifyToken(
        refreshTokenClient,
        configEnv.REFRESH_TOKEN_KEY
      );
      if (!client) {
        return handleError(res, `Token err`, 400);
      }
      const existClient = await clientCollection.findById(client.id);
      if (!existClient) {
        return handleError(res, `Client not found`, 404);
      }
      res.clearCookie("refreshTokenClient");
      return successRes(res, `Cookies cleared`);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getAllClients(_, res) {
    try {
      const clients = await clientCollection.find();
      return successRes(res, clients);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getClientByid(req, res) {
    try {
      const client = await clientControllerClass.findClientByid(
        res,
        req.params.id
      );
      if (!client) {
        return handleError(res, `Client not found`, 404);
      }
      return successRes(res, client);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updateClientByid(req, res) {
    try {
      const { value, error } = updateClientValidation(req.body);
      if (error) {
        return handleError(res, `Validation err`, 422);
      }
      const findclient = await clientControllerClass.findClientByid(
        res,
        req.params.id
      );
      if (!findclient) {
        return handleError(res, `Client not found`, 404);
      }
      const existClient = await clientCollection.findOne({
        name: req.body.name,
      });
      if (existClient) {
        return handleError(res, "name exists", 409);
      }
      let hashedPassword = findclient.hashedPassword;
      if (value.password) {
        hashedPassword = await cryptoPassword.encrypt(value.password);
      }
      const updatedClient = await clientCollection.findByIdAndUpdate(
        req.params.id,
        { ...value, hashedPassword },
        { new: true }
      );
      return successRes(res, updatedClient);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteClient(req, res) {
    try {
      await clientControllerClass.findClientByid(res, req.params.id);
      await clientCollection.findByIdAndDelete(req.params.id);
      return successRes(res, { message: "Client deleted" });
    } catch (error) {
      return handleError(res, error);
    }
  }

  static async findClientByid(res, id) {
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return handleError(res, `Invalid objId`);
    }
    const client = await clientCollection.findById(id);
    if (!client) {
      return handleError(res, `Client not found`, 404);
    }
    return client;
  }
}
