const Order = require("../models/order");

//const CartRepository = require("../repository/car");

const orderRepository = {
  async createOrder(totalCost, userId, addressId) {
    //shoppingCartProducts = await CartRepository.getUserShoppingCart(userId);
    //firstProductId = shoppingCartProducts.cartProducts[0].id;
    let order_data = {
      client_id: userId,
      client_address_id: addressId,
      branch_id: 1,
      total: totalCost,
      status: 1
    };
    order = await Order.create(order_data);
  }
};

module.exports = orderRepository;
