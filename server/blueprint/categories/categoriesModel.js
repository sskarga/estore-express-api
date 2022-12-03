import {DataTypes} from "sequelize";

export default (sequelize) => {
    sequelize.define('categories', {
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
        color: {
            type: DataTypes.STRING(10),
        },
    });
};
