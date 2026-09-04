import express from "express";
import { userController } from "./user.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import {
  updateMyProfileValidationSchema,
} from "./user.validation";
const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  userController.getAllUsers
);
router.get(
  "/me",
  authMiddleware,
  userController.getMyProfile
);

router.get(
  "/:userId",
  authMiddleware,
  roleMiddleware("admin"),
  userController.getUserById
);

router.patch(
  "/me",
  authMiddleware,
  validationMiddleware(updateMyProfileValidationSchema),
  userController.updateMyProfile
);

export default router;