const cartHandler = require("./handlers/cart");
const repository = require("../repository/index");

const cartController = {
  async addToCart(req, res) {
    const productData = cartHandler.handleHTTPAddToCart(req);
    const repoResponse = await repository.addProductToCart(productData);
  },

  async removeFromCart(req, res) {
    const productData = cartHandler.handleHTTPRemoveFromCart(req);
    const repoResponse = await repository.removeProductFromCart(productData);
  }
};

module.exports = cartController;
