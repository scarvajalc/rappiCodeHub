const rappiTenderoController = require("../controllers/rappiTendero");

module.exports = app => {
  app.get("/searchRappiT", (req, res) => {
    rappiTenderoController.rappiTenderoGetClosest(req, res);
  });
};
