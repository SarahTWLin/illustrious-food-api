const { MenuItems } = require("../models/foodordering/MenuItems");

const getAllMenuItems = async () => {
    try {
        const menuItems = await MenuItems.findAll();

        return menuItems;
    }catch(err) {
        console.log(`Unable to get menu item: ${err}`);
    }
}

const getMenuItemsMerchant = async (foodMerchantId) => {
    try {
        const menuItemsMerchant = await MenuItems.findAll({
            where: {
                "foodMerchantId": foodMerchantId
            }
        });

        return menuItemsMerchant;
    } catch (err) {
        console.log(`Unable to get menu item for merchant: ${err}`)
    }
}

module.exports = {
    getAllMenuItems,
    getMenuItemsMerchant
}