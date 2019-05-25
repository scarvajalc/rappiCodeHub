const restaurantChain = require("../models/restaurantchain");

const restaurantChainRepository = {
  async getAllRestaurantChains() {
    const allRestaurantChains = await restaurantChain.findAll({
      where: {
        active: true
      }
    });

    var restaurantChains = [];
    for (var i = 0; i < allRestaurantChains.length; i++) {
      restaurantChains.push(allRestaurantChains[i].dataValues);
    }

    return restaurantChains;
  }
};

module.exports = restaurantChainRepository;
