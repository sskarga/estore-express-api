import sequelize from "../../../db.sequelize.js";
import { apiError } from "../../handleError/apiError.js";

const { Users } = sequelize.models;

export const getUsers = async (req, res, next) => {
  try {
    const queryLimit = parseInt(req.query.limit) || 100;
    const queryOffset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Users.findAndCountAll({
      offset: queryOffset,
      limit: queryLimit,
    });

    res.status(200).json({
      success: true,
      count,
      limit: queryLimit,
      offset: queryOffset,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = (await Users.findByPk(id)) || {};
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
