import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Orders", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    deliveryCountry: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    deliveryCity: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    deliveryNote: {
      type: DataTypes.STRING(255),
    },
    deliveryPhone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    paidAt: {
      type: DataTypes.DATE,
    },
    isDelivery: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deliveryAt: {
      type: DataTypes.DATE,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    taxPrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    deliveryPrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    note: {
      type: DataTypes.STRING(255),
    },
  });
};
