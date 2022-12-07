import { body } from "express-validator";

export const validationProduct = [
  body("CategoryId", "Укажите категорию")
    .exists()
    .isNumeric({ min: 0, max: 99999 }),
  body("title", "Заполните название категории")
    .notEmpty()
    .trim()
    .isLength({ min: 5, max: 100 })
    .escape(),
  body("price", "Укажите стоимость продукта").isDecimal(),
  body("unit", "Заполните единицы измерения продукта. Например, шт. или кг.")
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 20 })
    .escape(),
];
