const adminHandler = require("./handlers/admin");
const repository = require("../repository/index");
const restaurantChainRepository = require("../repository/restaurantChain");
const branchHandler = require("./handlers/branch");
const branchRepository = require("../repository/branch");
const productHandler = require("./handlers/product");
const productRepository = require("../repository/product");

const adminController = {
  async adminLogin(req, res) {
    const adminData = adminHandler.handleHTTPLogin(req);
    const loggedAdmin = await repository.adminLogin(adminData, res);
    if (loggedAdmin) {
      req.session.user = loggedAdmin;
      req.session.user_role = "admin";
      res.redirect("/adminHome");
    } else {
      res.redirect("/adminLogin");
    }
  },

  async adminRegisterRestaurantChains(req, res) {
    const restaurantChainsData = adminHandler.handleHTTPRegisterRestaurantChains(
      req
    );
    const createdRestaurantChains = repository.registerRestaurantChains(
      restaurantChainsData
    );
    if (createdRestaurantChains) {
      res.redirect("/adminHome");
    } else {
      res.redirect("/adminLogin");
    }
  },

  async adminRegisterBranchView(req, res) {
    const allRestaurantChains = await restaurantChainRepository.getAllRestaurantChains();
    res.render("adminRegisterBranch", {
      restaurantChains: allRestaurantChains
    });
  },

  async adminRegisterBranch(req, res) {
    const branchData = branchHandler.handleHTTPAdminRegisterBranch(req);
    const registeredBranch = branchRepository.registerBranch(branchData);
    if (registeredBranch) {
      res.redirect("/adminHome");
    } else {
      res.redirect("/adminLogin");
    }
  },

  async adminRegisterProductsView(req, res) {
    res.render("adminRegisterProducts");
  },

  async adminRegisterProducts(req, res) {
    const productData = productHandler.handleHTTPRegisterProduct(req);
    const registeredProduct = productRepository.registerProduct(productData);
    if (registeredProduct) {
      res.redirect("/adminHome");
    } else {
      res.redirect("/adminLogin");
    }
  }
};

module.exports = adminController;
