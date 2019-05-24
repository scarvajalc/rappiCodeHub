const adminController = require("../controllers/admin");

module.exports = app => {
  app.get("/adminIndex", (req, res) => {
    res.render("adminIndex");
  });

  app.get("/adminLogin", function(req, res) {
    res.render("adminLogin");
  });

  app.post("/admins/login", (req, res) => {
    adminController.adminLogin(req, res);
  });

  app.get("/adminHome", (req, res) => {
    if (
      req.session.user &&
      req.cookies.id &&
      req.session.user_role === "admin"
    ) {
      res.render("adminHome", {
        adminName: req.session.user.first_name
      });
    } else {
      res.redirect("/adminLogin");
    }
  });

  app.get("/adminLogout", (req, res) => {
    if (req.session.user && req.cookies.id) {
      res.clearCookie("id");
      res.redirect("/adminIndex");
    } else {
      res.redirect("/adminLogin");
    }
  });

  app.get("/adminRegisterRappiT", (req, res) => {
    if (
      req.session.user &&
      req.cookies.id &&
      req.session.user_role === "admin"
    ) {
      res.render("adminRegisterRappiT");
    } else {
      res.redirect("/adminLogin");
    }
  });

  app.get("/adminRegisterRestaurantChains", (req, res) => {
    if (
      req.session.user &&
      req.cookies.id &&
      req.session.user_role === "admin"
    ) {
      res.render("adminRegisterRestaurantChains");
    } else {
      res.redirect("/adminLogin");
    }
  });

  app.post("/admins/registerRestaurantChains", (req, res) => {
    adminController.adminRegisterRestaurantChains(req, res);
  });
};
