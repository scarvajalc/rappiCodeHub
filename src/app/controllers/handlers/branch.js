const branchHandle = {
  handleHTTPGetAllBranchProducts(req) {
    const branchData = {
      id: req.params.id
    };
    req.session.branch_id = branchData.id;
    return branchData;
  },

  handleHTTPCheckCartProducts(req) {
    var cartProductsData = [];
    for (var i = 0; i < req[0].cartproducts.length; i++) {
      cartProductsData.push({
        product_id: req[0].cartproducts[i].dataValues.product.dataValues.id,
        quantity: req[0].dataValues.cartproducts[i].dataValues.quantity
      });
    }
    return cartProductsData;
  }
};

module.exports = branchHandle;
