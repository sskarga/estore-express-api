import express from "express";
import cors from "cors";
import handleDefaultError from "./handleError/handleDefaultError.js";

const app = express();
app.use(cors());
app.use(express.json());

//Route

// Handle error

app.use((err, req, res, next) => {
    handleDefaultError(err, req, res);
});

export default app;