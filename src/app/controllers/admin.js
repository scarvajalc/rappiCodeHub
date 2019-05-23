const adminHandler = require("./handlers/admin");
const repository = require("../repository/index");

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
  }
};

module.exports = adminController;
