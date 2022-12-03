import {DataTypes} from "sequelize";

export default (sequelize) => {
    sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        imagesUrl: {
            type: DataTypes.STRING(255),
        },
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        isEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        numReviews: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        countInStock: {
            type: DataTypes.INTEGER,
        },
    });
};
