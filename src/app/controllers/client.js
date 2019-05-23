const clientHandler = require("./handlers/client");
const repository = require("../repository/index");
const orderRepo = require("../repository/order");
const branchController = require("../controllers/branch");
const clientController = {
  async clientLogin(req, res) {
    const clientData = clientHandler.handleHTTPLogin(req);
    const loggedClientWithAddress = await repository.clientLogin(
      clientData,
      res
    );
    if (loggedClientWithAddress) {
      if (loggedClientWithAddress.dataValues.client_addresses[0] == undefined) {
        req.session.address = "";
      } else {
        req.session.address =
          loggedClientWithAddress.dataValues.client_addresses[0].dataValues;
      }
      req.session.user = loggedClientWithAddress.dataValues;
      req.session.user_role = "client";
      res.redirect("/clientHome");
    } else {
      res.redirect("/clientLogin");
    }
  },

  async clientRegister(req, res) {
    const clientData = clientHandler.handleHTTPRegister(req);
    const registeredClient = await repository.clientRegister(clientData);
    if (registeredClient) {
      res.redirect("/clientLogin");
    }
  },

  async clientRegisterAddress(req, res) {
    const clientAddress = clientHandler.handleHTTPRegisterAddress(req);
    const repoResponse = await repository.clientRegisterAddress(clientAddress);
    if (repoResponse.message) {
      req.session.address = repoResponse.clientAddress.dataValues;
      res.redirect("/clientHome");
    } else {
      res.redirect("/clientLogin");
    }
  },

  async clientHome(req, res) {
    if (
      req.session.user &&
      req.cookies.id &&
      req.session.user_role === "client"
    ) {
      var clientAddress = "";
      var orderedOpenBranches = "";
      if (req.session.address.address_name != undefined) {
        clientAddress = req.session.address.address_name;
        orderedOpenBranches = await branchController.getAllBranches(req, res);
      }
      orderInProgress = await orderRepo.userHaveOrderInProgress(
        req.session.user.id
      );

      res.render("clientHome", {
        clientName: req.session.user.first_name,
        clientAddress: clientAddress,
        branches: orderedOpenBranches,
        orderInProgress: orderInProgress
      });
    } else {
      res.redirect("/clientLogin");
    }
  }
};

module.exports = clientController;
