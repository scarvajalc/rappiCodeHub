const product = require("../models/product");

const productRepository = {
  async registerProduct(productData) {
    return (registeredProduct = await product.create(productData));
  },

  async getAllProducts() {
    return product.findAll({
      where: {
        active: true
      }
    });
  }
};

module.exports = productRepository;
