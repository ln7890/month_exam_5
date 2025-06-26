import { Router } from "express";
import { AdminControllerClass } from "../controller/admin.controller.js";

const router = Router();
const adminCon = new AdminControllerClass();

router
  .post("/", adminCon.createAdmin)
  .post("/signin", adminCon.siginAdmin)
  .post("/token", adminCon.generateAccToken)
  .post("/logout", adminCon.logOutClearCook)
  .get("/", adminCon.getAllAdmins)
  .get("/:id", adminCon.getAdminByid)
  .patch("/:id", adminCon.updateAdminByid)
  .delete("/:id", adminCon.deleteAdminByid);

export default router;
