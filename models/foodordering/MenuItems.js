const { DataTypes } = require("sequelize");
const db_connect = require("../../server/db_conn/db_connect");
const sequelize = db_connect.sequelize;
const { FoodCategory } = require("./FoodCategory");
const { FoodMerchant } = require("./FoodMerchant");

const MenuItems = sequelize.define(
    "menuitems",
    {
        menuItemId: { type: DataTypes.INTEGER, primaryKey: true },
        menuItemName: { type: DataTypes.STRING },
        menuItemDesc: { type: DataTypes.STRING },
        menuItemPrice: { type: DataTypes.DECIMAL },
        availability: { type: DataTypes.BOOLEAN },
    },
    {
        schema: "foodordering"
    }
)

MenuItems.belongsTo(FoodCategory, {foreignKey: 'foodCategoryId'});
MenuItems.belongsTo(FoodMerchant, {foreignKey: 'foodMerchantId'});

module.exports = { MenuItems }