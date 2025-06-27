import { Router } from "express";
import { AdminControllerClass } from "../controller/admin.controller.js";
import { AuthGuard } from "../guards/auth.guard.js";
import { rolesGuard } from "../guards/roles.guard.js";
import { selfCheck } from "../guards/self.guard.js";

const router = Router();
const adminCon = new AdminControllerClass();

router
  .post(
    "/",
    //  AuthGuard, rolesGuard(["superadmin"]),
    adminCon.createAdmin
  )
  .post("/signin", adminCon.siginAdmin)
  .post("/token", adminCon.generateAccToken)
  .post(
    "/logout",
    AuthGuard,
    rolesGuard(["superadmin"]),
    adminCon.logOutClearCook
  )
  .get("/", AuthGuard, rolesGuard(["superadmin"]), adminCon.getAllAdmins)
  .get(
    "/:id",
    AuthGuard,
    selfCheck,
    rolesGuard(["superadmin"]),
    adminCon.getAdminByid
  )
  .patch(
    "/:id",
    AuthGuard,
    selfCheck,
    rolesGuard(["superadmin"]),
    adminCon.updateAdminByid
  )
  .delete(
    "/:id",
    AuthGuard,
    selfCheck,
    rolesGuard(["superadmin", "admin"]),
    adminCon.deleteAdminByid
  );

export default router;
