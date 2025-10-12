const { DataTypes } = require("sequelize");
const db_connect = require("../../server/db_conn/db_connect");
const sequelize = db_connect.sequelize;
const { MenuItems } = require("./MenuItems");

const Order = sequelize.define(
    'order',
    {
        orderId: {type: DataTypes.INTEGER, primaryKey: true},
        orderQuantity: {type: DataTypes.INTEGER},
        tableNumber: {type: DataTypes.INTEGER}
    },
    {
        schema: "foodordering"
    }
);

Order.belongsTo(MenuItems, {foreignKey: 'foodId'});

module.exports = { Order };