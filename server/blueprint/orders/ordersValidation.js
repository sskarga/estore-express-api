import { body } from "express-validator";

export const validationCreateOrderItems = [
  body("deliveryPhone", "Некоректный номер телефона").isMobilePhone(),
  body("deliveryCountry", "Заполните поле страна")
    .trim()
    .escape()
    .isLength({ min: 5, max: 100 }),
  body("deliveryCity", "Заполните поле город")
    .trim()
    .escape()
    .isLength({ min: 5, max: 100 }),
  body("deliveryAddress", "Заполните поле адрес")
    .trim()
    .escape()
    .isLength({ min: 5, max: 250 }),
  body("deliveryNote", "Заполните поле примечание")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 250 }),
  body("products.*.id").isNumeric({ min: 0, max: 99999 }),
  body("products.*.qty").isNumeric({ min: 0, max: 99999 }),
];
