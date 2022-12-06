import express from "express";
import cors from "cors";
import handleDefaultError from "./handleError/handleDefaultError.js";
import authRoute from "./blueprint/auth/authRoute.js";
import uploadRoute from "./blueprint/uploadImages/uploadRoute.js";
import categoriesRoute from "./blueprint/categories/categoriesRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

//Route

// Image
app.use("/uploads", express.static("uploads"));
app.use("/api/uploads", uploadRoute);

// Auth
app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);

// Handle error

app.use((err, req, res, next) => {
  handleDefaultError(err, req, res);
});

export default app;
