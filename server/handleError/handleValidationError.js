import {validationResult} from 'express-validator';

export default (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: 'Некорректные данные',
            details: errors.array(),
        });
    }

    next();
}