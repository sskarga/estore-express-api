import sequelize from "../../../db.sequelize.js";
import { apiError } from "../../handleError/apiError.js";

const { Products } = sequelize.models;

export const getProducts = async (req, res, next) => {
  try {
    const queryLimit = parseInt(req.query.limit) || 1000;
    const queryOffset = parseInt(req.query.offset) || 0;

    let queryWhere = {};
    if (!req.user.isAdmin) {
      queryWhere = { isEnabled: true };
    }

    const { count, rows } = await Products.findAndCountAll({
      where: queryWhere,
      order: [["title"]],
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

export const getProductsByCategoryId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const queryLimit = parseInt(req.query.limit) || 1000;
    const queryOffset = parseInt(req.query.offset) || 0;

    let queryWhere = { CategoryId: id };
    if (!req.user.isAdmin) {
      queryWhere = {
        CategoryId: id,
        isEnabled: true,
      };
    }

    const { count, rows } = await Products.findAndCountAll({
      where: queryWhere,
      order: [["title"]],
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

export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Products.findByPk(id);

    if (product) {
      if (req.user.isAdmin) {
        return res.status(200).json(product);
      }

      if (product.isEnabled) {
        return res.status(200).json(product);
      }
    }

    res.status(404).json(apiError(404, "Продукт не найден"));
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const productCount = await Products.count({
      where: { title: req.body.title },
    });

    if (productCount > 0) {
      return res
        .status(400)
        .json(
          apiError(
            400,
            "Ошибка добавление данных.",
            "Такой продукт уже существует."
          )
        );
    }

    const product = await Products.create(req.body);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    req.body.id = id;

    const productCount = await Products.count({
      where: { id },
    });

    if (productCount == 0) {
      return res
        .status(400)
        .json(
          apiError(
            400,
            "Ошибка обновления данных.",
            "Такой продукт еще не существует."
          )
        );
    }

    const productsId = await Products.update(req.body, {
      where: { id },
    });

    res.status(200).json({
      success: true,
      updateId: productsId,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const countDelete = await Products.destroy({
      where: { id },
    });
    res.status(200).json({
      success: true,
      delete: countDelete,
    });
  } catch (err) {
    next(err);
  }
};
