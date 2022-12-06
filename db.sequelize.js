import {Sequelize} from "sequelize";
import config from "./config.js";

// Import models
import usersModel from "./server/blueprint/users/usersModel.js";
import categoriesModel from "./server/blueprint/categories/categoriesModel.js";
import productsModel from "./server/blueprint/products/productsModel.js";
import ordersItemsModel from "./server/blueprint/orders/ordersItemsModel.js";
import ordersModel from "./server/blueprint/orders/ordersModel.js";

const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
    {
        dialect: config.DB_DIALECT,
        host: config.DB_HOST,
        // port: config.DB_PORT,
        // pool: {
        //     min: 0,
        //     max: 5,
        //     idle: 10000,
        // },
        // define: {
        //   charset: "utf8",
        //   timestamps: false,
        // },
        // benchmark: false,
        // logging: false,
    }
);

// Models
usersModel(sequelize);
categoriesModel(sequelize);
productsModel(sequelize);
ordersItemsModel(sequelize);
ordersModel(sequelize)

// Associations
const {Users, Categories, Products, Orders, OrdersItems} = sequelize.models;

Categories.hasMany(Products);  // categoriesModel <- productsModel
Products.belongsTo(Categories); // add category_id to productsModel

Orders.hasMany(OrdersItems);
OrdersItems.belongsTo(Orders);

Users.hasMany(Orders);
Orders.belongsTo(Users);

// Sync
// sequelize.sync({alter: true})
//     .then((result) => {
//         console.info("Sync model");
//         // console.log(result);
//     })
//     .catch((err) => console.log(err));

sequelize.sync()
    .then((result) => {
        console.info("Sync model");
        // console.log(result);
    })
    .catch((err) => console.log(err));

export default sequelize;
