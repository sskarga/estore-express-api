import express from "express";
import { validationCategory } from "./categoriesValidation.js";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
} from "./categoriyesController.js";

import handleValidationError from "../../handleError/handleValidationError.js";
import idValidation from "../../utils/idValidation.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/categories/:id", idValidation, getCategoryById);
router.post(
  "/categories",
  validationCategory,
  handleValidationError,
  createCategory
);
router.post(
  "/categories/:id",
  idValidation,
  validationCategory,
  handleValidationError,
  updateCategory
);
router.delete("/categories/:id", idValidation, deleteCategoryById);

export default router;
