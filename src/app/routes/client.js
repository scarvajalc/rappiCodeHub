const clientController = require('../controllers/client');

module.exports = (app) => {
    app.get('/clientIndex', (req, res) => {
        res.render('clientIndex');
    });

    app.get('/clientRegister', function (req, res) {
        res.render('clientRegister');
    });

    app.get('/clientLogin', function (req, res) {
        res.render('clientLogin');
    });

    app.post('/clients/login', (req, res) => {
        clientController.clientLogin(req, res);
    });

    app.post('/clients/register', (req, res) => {
        clientController.clientRegister(req, res);
    });
};