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

    app.get('/adminHome', (req, res) => {
        if (req.session.user && req.cookies.id) {
            res.render('adminHome', {
                adminName: req.session.user.first_name
            })
        } else {
            res.redirect('/adminLogin');
        }
    });
};