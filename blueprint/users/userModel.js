import { DataTypes } from "sequelize";

export const Users = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    // type: DataTypes.INTEGER.UNSIGNED,
    // autoIncrement: true,
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
  creatAt: {
    type: DataTypes.DATETIME,
    defaultValue: DataTypes.NOW,
  },
};
