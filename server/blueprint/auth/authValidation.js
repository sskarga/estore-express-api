import { body } from "express-validator";

export const validationRegister = [
  body("email", "Неверный формат почты").isEmail().normalizeEmail(),
  body("password", "Пароль должен быть минимум 8 символов")
    .trim()
    .isLength({ min: 8 }),
  body("firstname", "Укажите имя").not().isEmpty().trim().escape(),
  body("lastname", "Укажите имя").not().isEmpty().trim().escape(),
];

export const validationLogin = [
  body("email", "Неверный формат почты").isEmail().normalizeEmail(),
  body("password", "Пароль должен быть минимум 8 символов")
    .trim()
    .isLength({ min: 8 }),
];

export const validationUpdateProfile = [
  body("firstname", "Укажите имя").not().isEmpty().trim().escape(),
  body("lastname", "Укажите имя").not().isEmpty().trim().escape(),
  body("phone", "Некоректный номер телефона").optional().isMobilePhone(),
  body("country", "Заполните поле страна")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 5, max: 100 }),
  body("city", "Заполните поле город")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 5, max: 100 }),
  body("address", "Заполните поле адрес")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 5, max: 250 }),
  body("note", "Заполните поле примечание")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 250 }),
];

export const validationUpdateProfilePassword = [
  body("oldPassword", "Пароль должен быть минимум 8 символов")
    .trim()
    .isLength({ min: 8 }),
  body("newPassword", "Пароль должен быть минимум 8 символов")
    .trim()
    .isLength({ min: 8 }),
];
