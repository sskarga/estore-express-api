import express from "express";
import { validationProduct } from "./productsValidation.js";
import {
  getProducts,
  getProductById,
  getProductsByCategoryId,
  createProduct,
  updateProduct,
  deleteProductById,
} from "./productsController.js";

import { checkAuthOrSkipMiddleware } from "../../middleware/checkAuth.middleware.js";

import handleValidationError from "../../handleError/handleValidationError.js";
import idValidation from "../../utils/idValidation.js";

const router = express.Router();

router.get("/products", checkAuthOrSkipMiddleware, getProducts);
router.get("/products/:id", idValidation, getProductById);
router.get("/category/:id/products", idValidation, getProductsByCategoryId);
router.post(
  "/products",
  validationProduct,
  handleValidationError,
  createProduct
);
router.post(
  "/products/:id",
  idValidation,
  validationProduct,
  handleValidationError,
  updateProduct
);
router.delete("/products/:id", idValidation, deleteProductById);

export default router;
