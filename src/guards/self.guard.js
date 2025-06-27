import { handleError } from "../utils/error-res.js";

export const selfCheck = (req, res, next) => {
  const user = req.user;
  console.log(`object`);
  console.log(req.params.id);
  if (user.id == req.params.id || user.role == "superadmin") {
    return next();
  } else {
    return handleError(res, `Forbidden user`, 401);
  }
};
