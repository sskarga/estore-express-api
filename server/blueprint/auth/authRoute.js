import express from "express";
import {
  login,
  registration,
  getMyProfile,
  updateMyProfile,
  myPasswordChange,
} from "./authController.js";
import {
  validationLogin,
  validationRegister,
  validationUpdateProfile,
  validationUpdateProfilePassword,
} from "./authValidation.js";
import handleValidationError from "../../handleError/handleValidationError.js";
import { checkAuthMiddleware } from "../../middleware/checkAuth.middleware.js";

const router = express.Router();

router.post(
  "/auth/registry",
  validationRegister,
  handleValidationError,
  registration
);
router.post("/auth/login", validationLogin, handleValidationError, login);
router.get("/auth/me", checkAuthMiddleware, getMyProfile);
router.post(
  "/auth/me",
  checkAuthMiddleware,
  validationUpdateProfile,
  handleValidationError,
  updateMyProfile
);
router.post(
  "/auth/me/password",
  checkAuthMiddleware,
  validationUpdateProfilePassword,
  handleValidationError,
  myPasswordChange
);

export default router;
