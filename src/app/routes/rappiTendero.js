const rappiTenderoController = require("../controllers/rappiTendero");

module.exports = app => {
  app.get("/rappiTenderoIndex", (req, res) => {
    res.render("rappiTenderoIndex");
  });

  app.get("/rappiTenderoLogin", function(req, res) {
    res.render("rappiTenderoLogin");
  });

  app.post("/rappiTenderos/login", (req, res) => {
    rappiTenderoController.rappiTenderoLogin(req, res);
  });

  app.post("/rappiTenderos/register", (req, res) => {
    rappiTenderoController.rappiTenderoRegister(req, res);
  });

  app.get("/rappiTenderoHome", (req, res) => {
    if (
      req.session.user &&
      req.cookies.id &&
      req.session.user_role === "rappiTendero"
    ) {
      res.render("rappiTenderoHome", {
        rappiTenderoName: req.session.user.first_name
      });
    } else {
      res.redirect("/rappiTenderoLogin");
    }
  });

  app.get("/rappiTenderoLogout", (req, res) => {
    if (
      req.session.user &&
      req.cookies.id &&
      req.session.user_role === "rappiTendero"
    ) {
      res.clearCookie("id");
      res.redirect("/rappiTenderoIndex");
    } else {
      res.redirect("/rappiTenderoLogin");
    }
  });

  app.put("/rappiTenderoUpdateCurrentAddress", (req, res) => {
    rappiTenderoController.rappiTenderoUpdateAddress(req, res);
  });
};
