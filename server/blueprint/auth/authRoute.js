import express from "express";
import { login, registration } from "./authController.js";
import { validationLogin, validationRegister } from "./authValidation.js";
import handleValidationError from "../../handleError/handleValidationError.js";

const router = express.Router();

router.post(
  "/auth/registry",
  validationRegister,
  handleValidationError,
  registration
);
router.post("/auth/login", validationLogin, handleValidationError, login);
// router.get('/profile', authMiddleware, profile)
// router.post('/profile', authMiddleware, validationProfile, handleValidationError, updateProfile)

export default router;
