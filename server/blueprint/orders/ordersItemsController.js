import sequelize from "../../../db.sequelize.js";
import { apiError } from "../../handleError/apiError.js";

const { OrdersItems, Products } = sequelize.models;

export const getOrdersItemsByOrderId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderItems = await OrdersItems.findAll({
      where: {
        OrderId: id,
      },
    });

    return res.status(200).json(orderItems);
  } catch (err) {
    next(err);
  }
};

export const getOrdersItemsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderItem = await OrdersItems.findByPk(id);
    return res.status(200).json(orderItem);
  } catch (err) {
    next(err);
  }
};

export const deleteOrdersItems = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderItem = await OrdersItems.findByPk(id);

    if (!orderItem) {
      return res.status(404).json(apiError(404, "Ошибка обновления данных."));
    }

    const countDelete = await OrdersItems.destroy({
      where: { id },
    });

    await recalcAllItemsAndUpdateTotalPriceByOrderId(orderItem.OrderId);

    res.status(200).json({
      success: true,
      delete: countDelete,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrdersItems = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { productId, qty } = req.body;

    // Get product
    const item = await Products.findOne({
      where: {
        id: productId,
      },
      attributes: ["id", "title", "imagesUrl", "price", "unit"],
    });

    if (!item) {
      return res.status(404).json(apiError(404, "Ошибка обновления данных."));
    }

    // Add qty
    item.qty = qty;

    // Update
    const itemsId = await OrdersItems.update(item, {
      where: { id },
    });

    // Recalc order price
    await recalcAllItemsAndUpdateTotalPriceByOrderId(item.OrderId);

    res.status(200).json({
      success: true,
      updateId: itemsId,
    });
  } catch (err) {
    next(err);
  }
};

export const createtOrdersItems = async (req, res, next) => {
  try {
    const OrderId = req.params.id;
    const { productId, qty } = req.body;

    // Get product
    const item = await Products.findOne({
      where: {
        id: productId,
      },
      attributes: ["id", "title", "imagesUrl", "price", "unit"],
    });

    if (!item) {
      return res.status(404).json(apiError(404, "Ошибка обновления данных."));
    }

    // Add data
    item.qty = qty;
    item.OrderId = OrderId;

    const orderItem = await OrdersItems.create({ item });

    res.status(200).json({
      success: true,
      orderItem,
    });
  } catch (err) {
    next(err);
  }
};
