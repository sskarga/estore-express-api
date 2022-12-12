import { Sequelize } from "sequelize";
import sequelize from "../../../db.sequelize.js";

const { Orders, OrdersItems } = sequelize.models;

// Подсчет задолжности клиента
export const sumOrderPaidUserByUserId = async (userId) => {
  const paidOrders = await Orders.findAll({
    where: {
      UserId: userId,
      isPaid: false,
    },
    attributes: [[sequelize.fn("SUM", sequelize.col("totalPrice")), "total"]],
  });

  return paidOrders[0].dataValues.total;
};

// Подчет стоимости заказа
export const getSumPriceItemsByOrderId = async (orderId) => {
  const sumOrdersItems = await OrdersItems.findAll({
    where: {
      OrderId: orderId,
    },
    attributes: [
      [
        Sequelize.literal(
          "SUM(`OrdersItems`.`productPrice` * `OrdersItems`.`qty`)"
        ),
        "total",
      ],
    ],
    group: ["OrderId"],
  });

  return sumOrdersItems[0].dataValues.total;
};

// Обновление стоимости заказа с учетом налогов и доставки.
export const updateTotalPriceByOrderId = async (orderId, price) => {
  const taxPrice = 0;
  const deliveryPrice = 0;
  const totalPrice = price + taxPrice + deliveryPrice;

  return await Orders.update(
    {
      price,
      taxPrice,
      deliveryPrice,
      totalPrice,
    },
    {
      where: {
        id: orderId,
      },
    }
  );
};

// Обновление стоимости заказа с пересчетом всех позиций заказа
export const recalcAllItemsAndUpdateTotalPriceByOrderId = async (orderId) => {
  price = await getSumPriceItemsByOrderId(orderId);
  return await updateTotalPriceByOrderId(orderId, price);
};
