const clientHandler = require("./handlers/client");
const repository = require("../repository/index");

const clientController = {
  async clientLogin(req, res) {
    const clientData = clientHandler.handleHTTPLogin(req);
    const repoResponse = await repository.clientLogin(clientData, res);
    if (repoResponse.validCredentials) {
      if (repoResponse.clientData.client_addresses[0] == undefined) {
        req.session.address = "";
      } else {
        req.session.address =
          repoResponse.clientData.client_addresses[0].dataValues;
      }
      req.session.user = repoResponse.clientData;
      req.session.user_role = repoResponse.role;
      res.redirect("/clientHome");
    } else {
      res.redirect("/clientLogin");
    }
  },

  async clientRegister(req, res) {
    const clientData = clientHandler.handleHTTPRegister(req);
    const repoResponse = await repository.clientRegister(clientData, res);
    if (repoResponse.message) {
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
  }
};

module.exports = clientController;
