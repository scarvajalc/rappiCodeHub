const branchProduct = require("../models/branchproduct");

const branchProductRepository = {
  async associateBranchProduct(branchProductData) {
    return (associatedBranchProduct = await branchProduct.create(
      branchProductData
    ));
  }
};

module.exports = branchProductRepository;
