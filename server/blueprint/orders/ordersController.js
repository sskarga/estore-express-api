import sequelize from "../../../db.sequelize.js";
import { apiError } from "../../handleError/apiError.js";

const { Orders, OrdersItems, Products } = sequelize.models;

export const getOrdersAll = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const getOrdersById = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const createOrders = async (req, res, next) => {
  try {
    const items = req.body.products;
    const {
      deliveryPhone,
      deliveryCountry,
      deliveryCity,
      deliveryAddress,
      deliveryNote,
    } = req.body;

    const orderNew = await Orders.create({
      UserId: req.user.id,
      deliveryPhone,
      deliveryCountry,
      deliveryCity,
      deliveryAddress,
      deliveryNote,
    });

    // Preparation SQL
    let idProducts = new Array(); // List id for SQL IN
    let mapReqOrderItems = new Map(); // req map order

    for (let i = 0; i < items.length; i++) {
      const productId = Number(items[i].id);
      const productQty = Number(items[i].qty);
      idProducts.push(productId);
      mapReqOrderItems.set(productId, productQty);
    }

    // Query
    const products = await Products.findAll({
      where: {
        id: idProducts,
        isEnabled: true,
      },
      attributes: ["id", "title", "imagesUrl", "price", "unit"],
    });

    // Build basket and calc price
    let basket = new Array();
    let price = 0;

    for (let i = 0; i < products.length; i++) {
      const productId = products[i].id;
      if (mapReqOrderItems.has(productId)) {
        const productQty = mapReqOrderItems.get(productId);
        const productPrice = Number(products[i].price);

        // Price
        price = price + productPrice * productQty;

        basket.push({
          OrderId: orderNew.id,
          productId,
          productTitle: products[i].title,
          productImagesUrl: products[i].imagesUrl,
          productPrice: productPrice,
          productsUnit: products[i].unit,
          qty: productQty,
        });
      }
    }

    // Query update price and add product items basket to order
    await OrdersItems.bulkCreate(basket);

    const taxPrice = 0;
    const deliveryPrice = 0;
    const totalPrice = price + taxPrice + deliveryPrice;

    await Orders.update(
      {
        price,
        taxPrice,
        deliveryPrice,
        totalPrice,
      },
      {
        where: {
          id: orderNew.id,
        },
      }
    );

    // Responce
    const responceOrder = {
      id: orderNew.id,
      UserId: orderNew.UserId,
      deliveryPhone: orderNew.deliveryPhone,
      deliveryCountry: orderNew.deliveryCountry,
      deliveryCity: orderNew.deliveryCity,
      deliveryAddress: orderNew.deliveryAddress,
      deliveryNote: orderNew.deliveryNote,
      price,
      taxPrice,
      deliveryPrice,
      totalPrice,
      createdAt: orderNew.createdAt,
      items: basket,
    };

    return res.status(200).json({
      success: true,
      data: responceOrder,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrders = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const deleteOrders = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
