import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "YSOPZG8oQKVriZXj3KFwtObIi6REEm5B",
  DB_NAME: process.env.DB_NAME || "estore",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_DIALECT: process.env.DB_DIALECT || "mariadb",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || "3306",
};
