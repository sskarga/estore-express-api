import {DataTypes} from "sequelize";

export default (sequelize) => {
    sequelize.define('Orders', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        deliveryCountry: {
            type: DataTypes.STRING(100),
        },
        deliveryCity: {
            type: DataTypes.STRING(100),
        },
        deliveryAddress: {
            type: DataTypes.STRING(255),
        },
        deliveryNote: {
            type: DataTypes.STRING(255),
        },
        deliveryPhone: {
            type: DataTypes.STRING(20),
        },
        isPaid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        paidAt: {
            type: DataTypes.DATE,
        },
        isDelivery: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        deliveryAt: {
            type: DataTypes.DATE,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
            allowNull: false,
        },
        taxPrice: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
            allowNull: false,
        },
        deliveryPrice: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING(255),
        },
    });
};
