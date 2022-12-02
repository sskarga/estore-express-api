import express from "express";
import Sequelize from "sequelize";
import cors from "cors";

import config from "./config/index.js";
import handleDefaultError from "./handleError/handleDefaultError.js";

// App
var server;
const app = express();
app.use(cors());
app.use(express.json());

// Sequelize
const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    dialect: config.DB_DIALECT,
    host: config.DB_HOST,
    port: config.DB_PORT,
    // pool: {
    //   min: 0,
    //   max: 5,
    //   idle: 10000,
    // },
    // define: {
    //   charset: "utf8",
    //   timestamps: false,
    // },
    // benchmark: false,
    // logging: false,
  }
);

//Route

// Handle error
app.use((err, req, res, next) => {
  handleDefaultError(err, req, res);
});

// Start
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection database has been established successfully.");

    server = app.listen(config.PORT, () =>
      console.log(`Server started on port ${config.PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

// Stop
for (let signal of ["SIGTERM", "SIGINT", "SIGQUIT", "SIGKILL"])
  process.on(signal, () => {
    console.info(`${signal} signal received.`);
    console.log("Closing http server.");
    server.close((err) => {
      console.log("Http server closed.");
      process.exit(err ? 1 : 0);
    });
    // DB close
    console.log("Closing db.");
    sequelize.close();
  });

start();
