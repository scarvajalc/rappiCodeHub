const adminHandler = require('./handlers/admin');
const repository = require('../repository/index');

const adminController = {
    async adminLogin(req, res) {
        const adminData = adminHandler.handleHTTPLogin(req);
        const repoResponse = await repository.adminLogin(adminData, res);
        if (repoResponse.validCredentials) {
            req.session.admin = repoResponse.adminData;
            res.redirect("/adminHome");
        } else {
            res.redirect("adminLogin");
        }
    }
}

module.exports = adminController;