const rappiTenderoController = require('../controllers/rappiTendero');

module.exports = (app) => {
    app.get('/rappiTenderoIndex', (req, res) => {
        res.render('rappiTenderoIndex');
    });

    app.get('/rappiTenderoLogin', function (req, res) {
        res.render('rappiTenderoLogin');
    });

    app.post('/rappiTenderos/login', (req, res) => {
        rappiTenderoController.rappiTenderoLogin(req, res);
    });

    app.post('/rappiTenderos/register', (req, res) => {
        rappiTenderoController.rappiTenderoRegister(req, res);
    });
};