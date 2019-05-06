const branchRepository = require("../repository/branch");
const branchFunctions = require("../functions/branch");
const branchHandler = require("../controllers/handlers/branch");

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
  }
};

module.exports = branchController;
