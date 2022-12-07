import jwt from "jsonwebtoken";
import config from "../../../config.js";
import sequelize from "../../../db.sequelize.js";
import bcrypt from "bcrypt";
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
      return res
        .status(400)
        .json(
          apiError(
            400,
            "Ошибка регистрации.",
            "Пользователь с таким email уже существует."
          )
        );
    }

    // Регистрация нового пользователя
    const newUser = await Users.create({
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      firstname,
      lastname,
    });

    return res.status(201).json({
      success: true,
      message: "Пользователь успешно зарегистрирован.",
    });
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .json(apiError(400, "Неизвестная ошибка регистрации."));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json(apiError(401, "Ошибка авторизации."));
    }

    if (user.isLock === true) {
      return res.status(403).json(apiError(403, "Аккаунт заблокирован."));
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json(apiError(401, "Ошибка авторизации."));
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
    return res.status(401).json(apiError(401, "Ошибка авторизации."));
  }
};
