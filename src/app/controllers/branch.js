const branchRepository = require("../repository/branch");
const branchFunctions = require("../functions/branch");
const branchHandler = require("../controllers/handlers/branch");
const repository = require("../repository/index");

const branchController = {
  async getAllBranches(req, res) {
    const clientCoordinates = {
      latitude: req.session.user.client_addresses[0].latitude,
      longitude: req.session.user.client_addresses[0].longitude
    };
    const openBranches = await branchRepository.getOpenBranches();
    const orderedOpenBranches = await branchFunctions.orderBranchesByDistance(
      openBranches,
      clientCoordinates
    );
    return orderedOpenBranches;
  },

  async getAllStoreProducts(req, res) {
    const branchData = branchHandler.handleHTTPGetAllBranchProducts(req);
    const branchProducts = await branchRepository.getAllBranchProducts(
      branchData
    );
    req.session.products = branchProducts;
    res.redirect("/singleRestaurant");
  },

  async checkCartProducts(req, res) {
    const clientId = req.session.user.id;
    const cartProducts = await repository.getClientCart(clientId);
    const cartProductsDataToFilter = branchHandler.handleHTTPCheckCartProducts(
      cartProducts
    );
    const checkedProducts = await branchRepository.checkProducts(
      cartProductsDataToFilter
    );
    /* 100% se que esto debe ir en otro lugar pero son las 2:56 AM
    y quiero acabar la funcionalidad */
    var checkedCartProductsResponse = [];
    for (var i = 0; i < checkedProducts.length; i++) {
      if (
        cartProductsDataToFilter[i].quantity >
          checkedProducts[i][0].dataValues.stock ||
        !checkedProducts[i][0].dataValues.active
      ) {
        checkedCartProductsResponse.push(
          `${
            cartProducts[0].cartproducts[i].dataValues.product.dataValues.name
          } se ha acabado`
        );
      }
    }

    res.send(checkedCartProductsResponse);
    return checkedCartProductsResponse;
  }
};

module.exports = branchController;
