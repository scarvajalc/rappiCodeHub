const productHandler = {
  handleHTTPRegisterProduct(req) {
    const productData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      img_url: req.body.img_url
    };
    return productData;
  }
};

module.exports = productHandler;
