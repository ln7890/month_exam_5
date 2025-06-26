import jwt from "jsonwebtoken";
import { configEnv } from "../config/config.js";
export class token {
  async generateRefreshToken(payload) {
    return jwt.sign(payload, configEnv.REFRESH_TOKEN_KEY, {
      expiresIn: configEnv.REFRESH_TOKEN_TIME,
    });
  }
  async generateAccessToken(payload) {
    return jwt.sign(payload, configEnv.ACCESS_TOKEN_KEY, {
      expiresIn: configEnv.ACCESS_TOKEN_TIME,
    });
  }
  async verifyToken(token, secretKey) {
    return jwt.verify(token, secretKey);
  }
}
