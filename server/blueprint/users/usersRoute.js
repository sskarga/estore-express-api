import express from "express";
import idValidation from "../../utils/idValidation.js";
import { checkAuthAndAccessByRoleMiddleware } from "../../middleware/checkAuth.middleware.js";
import { getUsers, getUserById } from "./usersController.js";

const router = express.Router();

router.get("/users", checkAuthAndAccessByRoleMiddleware("Admin"), getUsers);

router.get(
  "/users/:id",
  checkAuthAndAccessByRoleMiddleware("Admin"),
  idValidation,
  getUserById
);

export default router;
