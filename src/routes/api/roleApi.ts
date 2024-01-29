import express, { Request, Response, Application } from "express";
import roleController from "../../controllers/role.controller";
import middlewareController from "../../middlewares/verifyToken.middleware";

const router = express.Router();
router.post(
  "/get-all",
  middlewareController.requestRefresh,
  middlewareController.verifyToken,
  roleController.getAllRoles
);
router.get(
  "/:slug",
  middlewareController.verifyToken,
  roleController.getOneRoles
);
router.post("/",middlewareController.requestRefresh , middlewareController.verifyToken, roleController.createRoles);
router.put(
  "/:slug",
  middlewareController.verifyToken,
  roleController.updateRoles
);
router.delete(
  "/:slug",
  middlewareController.verifyToken,
  roleController.deleteRoles
);

export default router;
