const adminController = require('../controllers/admin');

module.exports = (app) => {
    app.get('/adminIndex', (req, res) => {
        res.render('adminIndex');
    });

    app.get('/adminLogin', function (req, res) {
        res.render('adminLogin');
    });

    app.post('/admins/login', (req, res) => {
        adminController.adminLogin(req, res);
    });
};