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

module.exports = foodMerchantRouter;