import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../../config.js";
import sequelize from "../../../db.sequelize.js";
import { apiError } from "../../handleError/apiError.js";

const { Users } = sequelize.models;

const generateAccessToken = (id, role) => {
  const payload = { id, role };
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "24h" });
};

export const registration = async (req, res, next) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const usersCount = await Users.count({
      where: { email: email },
    });

    // Проверка email
    if (usersCount > 0) {
      next(
        apiError(
          400,
          "Ошибка регистрации.",
          "Пользователь с таким email уже существует."
        )
      );
      return;
    }

    // Регистрация нового пользователя
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await Users.create({
      email,
      password: hashPassword,
      firstname,
      lastname,
    });

    return res.status(201).json({
      success: true,
      message: "Пользователь успешно зарегистрирован.",
    });
  } catch (e) {
    console.error(e);
    next(apiError(400, "Неизвестная ошибка регистрации."));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email: email },
    });

    if (!user) {
      next(apiError(401, "Ошибка авторизации."));
      return;
    }

    if (user.isLock === true) {
      next(apiError(403, "Аккаунт заблокирован."));
      return;
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      next(apiError(401, "Ошибка авторизации."));
      return;
    }

    const role = user.isAdmin ? "Admin" : "User";
    const token = generateAccessToken(user.id, role);

    user.password = null;

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (e) {
    console.log(e);
    next(apiError(401, "Ошибка авторизации."));
  }
};
