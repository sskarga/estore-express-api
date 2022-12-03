import {DataTypes} from "sequelize";

export default (sequelize) => {
    sequelize.define('ordersItems', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        productTitle: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        productImagesUrl: {
            type: DataTypes.STRING(255),
        },
        productPrice: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
            allowNull: false,
        },
        productsUnit: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        qty: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1
        },
    });
};