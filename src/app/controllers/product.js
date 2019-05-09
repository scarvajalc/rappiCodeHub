const productRepository = require('../repository/product');

const productController = {
  async showProducts(req, res) {
    let available_products = await productRepository.getAvailableProducts(req.query.branch)
    res.render("product", {
      clientName: req.session.user.first_name,
      products: available_products,
      branchName: req.query.branchname
  });

  }
};

module.exports = productController;
