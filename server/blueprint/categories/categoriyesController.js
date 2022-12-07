import sequelize from "../../../db.sequelize.js";
import { apiError } from "../../handleError/apiError.js";

const { Categories } = sequelize.models;

export const getCategories = async (req, res, next) => {
  try {
    const { count, rows } = await Products.findAndCountAll({
      order: [
        // Сортировка по заголовку
        ["title"],
      ],
    });
    res.status(200).json({
      success: true,
      count,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = (await Categories.findByPk(id)) || {};
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const categoryCount = await Categories.count({
      where: { title: req.body.title },
    });

    if (categoryCount > 0) {
      return res
        .status(400)
        .json(
          apiError(
            400,
            "Ошибка добавление данных.",
            "Такая категория уже существует."
          )
        );
    }

    const category = await Categories.create(req.body);
    res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    req.body.id = id;

    const categoryCount = await Categories.count({
      where: { id },
    });

    if (categoryCount == 0) {
      return res
        .status(400)
        .json(
          apiError(
            400,
            "Ошибка обновления данных.",
            "Такая категория еще не существует."
          )
        );
    }

    const categoriesId = await Categories.update(req.body, {
      where: { id },
    });

    res.status(200).json({
      success: true,
      updateId: categoriesId,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const countDelete = await Categories.destroy({
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
