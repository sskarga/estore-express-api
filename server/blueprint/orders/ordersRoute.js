import express from "express";
import { createOrders } from "./ordersController.js";
import { validationCreateOrderItems } from "./ordersValidation.js";
import handleValidationError from "../../handleError/handleValidationError.js";
import { checkAuthAndAccessByRoleMiddleware } from "../../middleware/checkAuth.middleware.js";

const router = express.Router();

// orders
// router.get("/orders", getOrdersAll);
// router.get("/orders/:id", getOrdersById);

router.post(
  "/orders",
  checkAuthAndAccessByRoleMiddleware("User"),
  validationCreateOrderItems,
  handleValidationError,
  createOrders
);
// router.post("/orders/:id", updateOrders);
// router.delete("/orders/:id", deleteOrders);

// items
// router.get("/orders/:id/items", getOrdersItemsByOrderId);
// router.post("/orders/:id/items", createtOrdersItems);

// router.get("/orders-items/:id", getOrdersItemsById);
// router.post("/orders-items/:id", updateOrdersItems);
// router.delete("/orders-items/:id", deleteOrdersItems);

export default router;
