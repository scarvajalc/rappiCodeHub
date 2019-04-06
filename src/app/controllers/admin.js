const handleHTTPLogin = require('../controllers/handlers/admin');
const { adminLogin } = require('../repository/index');

const adminLoginController = (req, res) => {
    const adminData = handleHTTPLogin(req);
    adminLogin(adminData, res)
};

module.exports = adminLoginController;