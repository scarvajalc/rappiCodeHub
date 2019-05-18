const rappiTenderoController = require("../controllers/rappiTendero");
const orderController = require("../controllers/order");

module.exports = app => {
  app.get("/searchRappiT", (req, res) => {
    rappiTenderoController.rappiTenderoGetClosest(req, res);
  });
  app.post("/createorder", (req, res) => {
    orderController.createOrder(req, res);
  });
};
