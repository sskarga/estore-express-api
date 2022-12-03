import jwt from "jsonwebtoken";
import config from "../../config.js";

export const checkAuthMiddleware = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Пользователь не авторизован",
            });
        }
        req.user = jwt.verify(token, config.JWT_SECRET);
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            success: false,
            message: "Пользователь не авторизован",
        });
    }
};

export const checkAuthAndAccessByRoleMiddleware = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Пользователь не авторизован",
                });
            }
            const decodedData = jwt.verify(token, config.JWT_SECRET);
            req.user = decodedData;
            const role = decodedData.roles;
            if (!roles.includes(role)) {
                return res.status(403).json({
                    success: false,
                    message: "У вас нет доступа",
                });
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(401).json({
                success: false,
                message: "Пользователь не авторизован",
            });
        }
    };
};

export const checkAuthOrSkipMiddleware = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                req.user = jwt.verify(token, config.JWT_SECRET);
            }
        }
    } catch (e) {
        console.log("checkAuthOrSkipMiddleware error");
    }

    req.isGuest = typeof req.user === "undefined";
    if (!req.isGuest) {
        req.user.isAdmin = req.user.roles === "Admin";
    } else {
        req.user.isAdmin = false;
    }

    next();
};
