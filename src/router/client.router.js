import { Router } from "express";
import { clientControllerClass } from "../controller/client.controller.js";

const clientCon = new clientControllerClass();
const router = Router();

router
  .post("/", clientCon.createCreate)
  .post("/signin", clientCon.signInClient)
  .post("/token", clientCon.generateAccToken)
  .post("/logout", clientCon.logOut)
  .get("/", clientCon.getAllClients)
  .get("/:id", clientCon.getClientByid)
  .patch("/:id", clientCon.updateClientByid)
  .delete("/:id", clientCon.deleteClient);

export default router;
