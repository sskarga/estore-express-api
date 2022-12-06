import express from "express";
import { validationCategory } from "./categoriesValidation.js";
import {
  getCategories,
  getCategoryById,
  createCategory,
  deleteCategoryById,
} from "./categoriyesController.js";

import handleValidationError from "./../../handleError/handleValidationError.js";

const router = express.Router();

router.get("", getCategories);
router.get("/:id", getCategoryById);
router.post("", validationCategory, handleValidationError, createCategory);
router.delete("/:id", deleteCategoryById);

export default router;
