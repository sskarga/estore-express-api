import express from "express";
import {
  getOrdersAll,
  getOrdersById,
  createOrders,
  updateOrders,
  deleteOrders,
} from "./ordersController.js";

import { getOrdersItemsByOrderId } from "./ordersItemsController.js";
import { validationCreateOrderItems } from "./ordersValidation.js";
import handleValidationError from "../../handleError/handleValidationError.js";
import {
  checkAuthMiddleware,
  checkAuthAndAccessByRoleMiddleware,
} from "../../middleware/checkAuth.middleware.js";
import idValidation from "../../utils/idValidation.js";

const router = express.Router();

// orders ----------------------------------
router.get("/orders", checkAuthMiddleware, getOrdersAll);
router.get("/orders/:id", checkAuthMiddleware, idValidation, getOrdersById);

router.post(
  "/orders",
  checkAuthMiddleware,
  validationCreateOrderItems,
  handleValidationError,
  createOrders
);

router.post(
  "/orders/:id",
  checkAuthAndAccessByRoleMiddleware("Admin"),
  idValidation,
  validationCreateOrderItems,
  handleValidationError,
  updateOrders
);

router.delete(
  "/orders/:id",
  checkAuthAndAccessByRoleMiddleware("Admin"),
  idValidation,
  deleteOrders
);

// items -------------------------------------
router.get(
  "/orders/:id/items",
  checkAuthMiddleware,
  idValidation,
  getOrdersItemsByOrderId
);

// router.post(
//   "/orders/:id/items",
//   checkAuthAndAccessByRoleMiddleware("Admin"),
//   idValidation,
//   createtOrdersItems
// );

// router.get(
//   "/orders-items/:id",
//   checkAuthAndAccessByRoleMiddleware("Admin"),
//   idValidation,
//   getOrdersItemsById
// );

// router.post(
//   "/orders-items/:id",
//   checkAuthAndAccessByRoleMiddleware("Admin"),
//   idValidation,
//   updateOrdersItems
// );

// router.delete(
//   "/orders-items/:id",
//   checkAuthAndAccessByRoleMiddleware("Admin"),
//   idValidation,
//   deleteOrdersItems
// );

export default router;
