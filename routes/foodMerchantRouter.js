const foodMerchantController = require("../controllers/FoodMerchantController");
const express = require("express");
const foodMerchantRouter = express.Router();

foodMerchantRouter.get("/nearby-merchants",
    async (req, res, next) => {
        const currentLocationX = req.query.locationX;
        const currentLocationY = req.query.locationY;

        const nearbyMerchants = await foodMerchantController.getFoodMerchantsNearby(currentLocationX, currentLocationY);
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.json({
            nearbyMerchants: nearbyMerchants
        })
    }
)

foodMerchantRouter.get("/approximateTime",
    async (req, res, next) => {
        const currentLocationX = req.query.currentLocationX;
        const currentLocationY = req.query.currentLocationY;
        const foodMerchantId = req.query.foodMerchantId;

        const approximateTimeOfDelivery = await foodMerchantController.getApproximateTimeOfDelivery(
            currentLocationX, currentLocationY, foodMerchantId
        );

        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.json({
           ...approximateTimeOfDelivery
        })
    }
)

module.exports = foodMerchantRouter;