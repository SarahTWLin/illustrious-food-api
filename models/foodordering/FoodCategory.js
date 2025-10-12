const { DataTypes } = require("sequelize");
const db_connect = require("../../server/db_conn/db_connect");
const sequelize = db_connect.sequelize;


const FoodCategory = sequelize.define(
    "foodcategory",
    {
        foodCategoryId: { type: DataTypes.INTEGER, primaryKey: true },
        foodCategoryName: { type: DataTypes.STRING },
        foodCategoryDesc: { type: DataTypes.STRING },
    },
    {
        schema: "foodordering"
    }
)

module.exports = { FoodCategory }