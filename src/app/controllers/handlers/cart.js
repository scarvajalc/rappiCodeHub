const cartHandler = {
  handleHTTPAddToCart(req) {
    const productData = {
      cart_id: 1,
      product_id: req.body.productId,
      quantity: 1
    };

    return productData;
  },

  handleHTTPRemoveFromCart(req) {
    const productData = {
      cart_id: 1,
      product_id: req.body.productId
    };

    return productData;
  }
};

module.exports = cartHandler;
