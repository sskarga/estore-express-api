import sequelize from "../../../db.sequelize.js";
import { apiError } from "../../handleError/apiError.js";
import { isIntLimit } from "./../../utils/idValidation.js";

const { Categories } = sequelize.models;

export const getCategories = async (req, res, next) => {
  try {
    let categories = await Categories.findAll({
      order: [
        // Сортировка по заголовку
        ["title"],
      ],
    });
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (isIntLimit(id)) {
      let category = (await Categories.findByPk(id)) || {};
      res.status(200).json(category);
    } else {
      next(apiError(400, `Ошибка id: ${id}.`));
    }
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
      res
        .status(400)
        .json(
          apiError(
            400,
            "Ошибка создания новой категории.",
            "Такая категория уже существует."
          )
        );
      return;
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

export const deleteCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (isIntLimit(id)) {
      let countDelete = await Categories.destroy({
        where: { id },
      });
      res.status(200).json({
        success: true,
        delete: countDelete,
      });
    } else {
      next(apiError(400, `Ошибка id: ${id}.`));
    }
  } catch (err) {
    next(err);
  }
};
