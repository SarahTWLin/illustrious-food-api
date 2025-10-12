const express = require("express");
const router = express.Router();

// Import sub-routers
const foodMerchantRoutes = require("./foodMerchantRouter");
const menuItemsRoutes = require("./menuItemRouter");

// Mount them
router.use("/food-merchants", foodMerchantRoutes);
router.use("/menu-items", menuItemsRoutes);

module.exports = router;