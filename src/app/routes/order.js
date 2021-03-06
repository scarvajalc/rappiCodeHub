const rappiTenderoController = require("../controllers/rappiTendero");
const orderController = require("../controllers/order");

module.exports = app => {
  app.get("/searchRappiT", (req, res) => {
    rappiTenderoController.rappiTenderoGetClosest(req, res);
  });
  app.get("/createOrder", (req, res) => {
    orderController.createOrder(req, res);
  });
  app.get("/prueba", (req, res) => {
    orderController.prueba(req, res);
  });
  app.get("/orderInProcess", (req, res) => {
    orderController.showOrderDetails(req, res);
  });
  app.get("/orderAssigned", (req, res) => {
    orderController.showOrderDetails(req, res);
  });

  app.get("/endOrder", (req, res) => {
    orderController.endOrder(req, res);
  });
};
