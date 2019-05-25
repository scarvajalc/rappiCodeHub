const branchProductHandler = {
  handleHTTPAssociateBranchProduct(req) {
    const today = new Date();
    const productBranchData = {
      product_id: req.body.product_id,
      branch_id: req.body.branch_id,
      stock: req.body.stock,
      createdAt: today,
      active: true
    };
    return productBranchData;
  }
};

module.exports = branchProductHandler;
