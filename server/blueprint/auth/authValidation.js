import {body} from 'express-validator';

export const validationRegister = [
    body('email', 'Неверный формат почты').isEmail().normalizeEmail(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({min: 8}).trim(),
    body('firstname', 'Укажите имя').not().isEmpty().trim().escape(),
    body('lastname', 'Укажите имя').not().isEmpty().trim().escape(),
];

export const validationLogin = [
    body('email', 'Неверный формат почты').isEmail().normalizeEmail(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({min: 8}).trim(),
];