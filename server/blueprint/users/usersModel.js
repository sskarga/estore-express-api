import {DataTypes} from "sequelize";

export default (sequelize) => {
    sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING(100),
        },
        lastname: {
            type: DataTypes.STRING(100),
        },
        phone: {
            type: DataTypes.STRING(20),
        },
        country: {
            type: DataTypes.STRING(100),
        },
        city: {
            type: DataTypes.STRING(100),
        },
        address: {
            type: DataTypes.STRING(255),
        },
        note: {
            type: DataTypes.STRING(255),
        },
    });
};

