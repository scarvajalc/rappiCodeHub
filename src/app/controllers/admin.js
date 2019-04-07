const adminHandler = require('./handlers/admin');
const repository = require('../repository/index');

const adminController = {
    adminLogin(req, res){
        const adminData = adminHandler.handleHTTPLogin(req);
        repository.adminLogin(adminData, res);
    }
}

module.exports = adminController;