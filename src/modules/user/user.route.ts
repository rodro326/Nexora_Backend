import express from "express";
import { userController } from "./user.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  userController.getAllUsers
);

router.get(
  "/:userId",
  authMiddleware,
  roleMiddleware("admin"),
  userController.getUserById
);

export default router;