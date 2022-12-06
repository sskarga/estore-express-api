import { body } from "express-validator";

export const validationCategory = [
  body("title", "Заполните название категории")
    .notEmpty()
    .trim()
    .isLength({ min: 5, max: 100 })
    .escape(),
];
