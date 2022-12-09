import sequelize from "../../../db.sequelize.js";
import { apiError } from "../../handleError/apiError.js";

const { OrdersItems } = sequelize.models;

export const getOrdersItemsByOrderId = async (req, res, next) => {
  try {
    const orderItems = await OrdersItems.findAll({
      where: {
        OrderId: req.params.id,
      },
    });

    return res.status(200).json(orderItems);
  } catch (err) {
    next(err);
  }
};
