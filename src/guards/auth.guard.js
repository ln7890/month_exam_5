import { token } from "../helpers/token.js";
import { handleError } from "../utils/error-res.js";
import { configEnv } from "../config/config.js";

const tokenService = new token();
export const AuthGuard = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return handleError(res, `Token error`, 401);
  }
  const bearer = auth.split(" ")[0];
  const authToken = auth.split(" ")[1];
  if (!bearer || bearer != "Bearer" || !auth) {
    return handleError(res, `Token problem`, 401);
  }
  try {
    const user = await tokenService.verifyToken(
      authToken,
      configEnv.ACCESS_TOKEN_KEY
    );
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    return handleError(res, error);
  }
};
