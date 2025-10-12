const { DataTypes } = require("sequelize");
const db_connect = require("../../server/db_conn/db_connect");
const sequelize = db_connect.sequelize;

const FoodMerchant = sequelize.define(
    "foodmerchant",
    {
        foodMerchantId: {type: DataTypes.INTEGER, primaryKey: true},
        foodMerchantName: { type: DataTypes.STRING },
        rating: { type: DataTypes.FLOAT },
        cuisine: { type: DataTypes.STRING },
        foodMerchantProfile: { type: DataTypes.STRING },
        location: { type: DataTypes.GEOGRAPHY("POINT", 4326) },
        openingStartHours: { type: DataTypes.TIME(6) },
        openingEndHours: {type: DataTypes.TIME(6) }
    },
    {
        schema: "foodordering"
    }
)

module.exports = { FoodMerchant }