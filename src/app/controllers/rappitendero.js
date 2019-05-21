const rappiTenderoHandler = require("./handlers/rappiTendero");
const repository = require("../repository/index");
const branchRepository = require("../repository/branch");
const orderFunctions = require("../functions/order");

const rappiTenderoController = {
  async rappiTenderoLogin(req, res) {
    const rappiTenderoData = rappiTenderoHandler.handleHTTPLogin(req);
    const repoResponse = await repository.rappiTenderoLogin(
      rappiTenderoData,
      res
    );
    if (repoResponse.validCredentials) {
      req.session.user = repoResponse.rappiTenderoData;
      req.session.user_role = repoResponse.role;
      res.redirect("/rappiTenderoHome");
    } else {
      res.redirect("rappiTenderoLogin");
    }
  },

  async rappiTenderoRegister(req, res) {
    const rappiTenderoData = rappiTenderoHandler.handleHTTPRegister(req);
    const repoResponse = await repository.rappiTenderoRegister(
      rappiTenderoData,
      res
    );
    if (repoResponse.message) {
      res.redirect("/adminRegisterRappiT");
    }
  },

  async rappiTenderoUpdateAddress(req, res) {
    const rappiTenderoAddress = rappiTenderoHandler.handleHTTPUpdateAddress(
      req
    );
    repository.rappiTenderoUpdateAddress(rappiTenderoAddress, res);
  },

  async rappiTenderoGetClosest(req, res) {
    const branchId = req.session.branch_id;
    const restaurantCoordinates = await branchRepository.getBranchCoordinates(
      branchId
    );
    const availableRappiTenderos = await repository.getAllAvailableRappiT(
      restaurantCoordinates,
      res
    );

    const closestRappiTendero = orderFunctions.getClosestRappiT(
      restaurantCoordinates,
      availableRappiTenderos
    );

    const assignedRappiTendero = await repository.getAssignedRappiTendero(
      closestRappiTendero[0].rappiTenderoId
    );

    res.send(assignedRappiTendero);
  }
};

module.exports = rappiTenderoController;
