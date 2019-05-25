const product = require("../models/product");

const productRepository = {
  async registerProduct(productData) {
    return (registeredProduct = await product.create(productData));
  }
};

module.exports = productRepository;
