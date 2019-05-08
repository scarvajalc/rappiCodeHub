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
  },

  async getClientCart(req, res) {
    const clientId = req.session.user.id;
    const repoResponse = await repository.getClientCart(clientId);
    return repoResponse;
  }
};

module.exports = cartController;
