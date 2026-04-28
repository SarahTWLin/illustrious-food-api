const { FoodMerchant } = require("../models/foodordering/FoodMerchant");
const { sequelize } = require("../server/db_conn/db_connect");

const getFoodMerchantsNearby = async (currentLocationX, currentLocationY) => {
    try{
        const [foodMerchantsNearby, metadata] = await sequelize.query(
            `SELECT fm.*, CONCAT_WS(', ',
                    p.tags->'addr:housenumber',
                    p.tags->'addr:street',
                    p.tags->'addr:city'
                ) AS address
            FROM foodordering.foodmerchants fm
            LEFT JOIN LATERAL (
                SELECT *
                FROM planet_osm_point p
                WHERE p.tags ? 'addr:street'
                ORDER BY ST_Transform(p.way, 4326) <-> fm.location
                LIMIT 1
            ) p ON TRUE
            WHERE ST_DWithin(
                fm.location, 
                ST_MakePoint(${currentLocationX}, ${currentLocationY}), 
            5000) LIMIT 5;
            `)

        return foodMerchantsNearby;

    }
    catch(error) {
        console.log(`Unable to get food merchant: ${error}`);
    }
}

const getApproximateTimeOfDelivery = async (currentLocationX, currentLocationY, foodMerchantId) => {
    try {
        const [approximateTime, metadata] = await sequelize.query(
            `
            WITH merchant AS (
                SELECT ST_X(ST_Transform(location::geometry, 4326)) AS foodMerchantLocationX, 
                    ST_Y(ST_Transform(location::geometry, 4326)) AS foodMerchantLocationY
                FROM foodordering.foodmerchants 
                WHERE "foodMerchantId"=${foodMerchantId} 
            )
            SELECT 
                ROUND(
                    ST_DistanceSphere(
                        ST_MakePoint(merchant.foodMerchantLocationX, merchant.foodMerchantLocationY), 
                        ST_MakePoint(${currentLocationX}, ${currentLocationY})
                    ) / (15)
                ) AS approximateTime FROM merchant;
            `
        );

        return approximateTime[0];
    }
    catch (error) {
        console.log(`Unable to get approximate time delivery: ${error}`);
    }
    
}

module.exports = {
    getFoodMerchantsNearby,
    getApproximateTimeOfDelivery
}