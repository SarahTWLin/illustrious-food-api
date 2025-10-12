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

module.exports = {
    getFoodMerchantsNearby
}