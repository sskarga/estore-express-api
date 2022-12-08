import express from "express";
import cors from "cors";
import handleDefaultError from "./handleError/handleDefaultError.js";
import authRoute from "./blueprint/auth/authRoute.js";
import uploadRoute from "./blueprint/uploadImages/uploadRoute.js";
import categoriesRoute from "./blueprint/categories/categoriesRoute.js";
import productsRoute from "./blueprint/products/productsRoute.js";
import ordersRoute from "./blueprint/orders/ordersRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

//Route

// Image
app.use("/uploads", express.static("uploads"));
app.use("/api", uploadRoute);

// Auth
app.use("/api", authRoute);
app.use("/api", categoriesRoute);
app.use("/api", productsRoute);
app.use("/api", ordersRoute);

// Handle error

app.use((err, req, res, next) => {
  handleDefaultError(err, req, res);
});

export default app;
