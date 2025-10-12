const menuItemController = require("../controllers/MenuItemController");
const express = require("express");
const menuItemRouter = express.Router();

menuItemRouter.get("/", async (req, res, next) => {
    const menuItems = await menuItemController.getAllMenuItems();
    res.send({
        menuItems: menuItems
    })
});

menuItemRouter.get("/:foodMerchantId", async (req, res, next) => {
    const menuItemsMerchant = await menuItemController.getMenuItemsMerchant(req.params.foodMerchantId);

    res.send({
        menuItems: menuItemsMerchant
    })
})

module.exports = menuItemRouter;
