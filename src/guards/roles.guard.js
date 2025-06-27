import { handleError } from "../utils/error-res.js";

export const rolesGuard = (includedRoles = []) => {
  return (req, res, next) => {
    if (!includedRoles.includes(req.user.role)) {
      return handleError(`Forbidden User`);
    }
    next();
  };
};
