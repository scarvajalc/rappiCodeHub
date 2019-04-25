const shoppingCartController = require('../controllers/shoppingcart');

module.exports = (app) => {
    app.get('/shoppingcart', (req, res) => {
        shoppingCartController.showCart(req, res);
    });

    app.get('/deleteshoppingcartproduct', (req, res) => {
        shoppingCartController.deleteSCProduct(req, res);
    });

    app.get('/addproduct', (req, res) => {
        shoppingCartController.addProduct(req, res);
    });

    app.get('/preorder',(req, res) => {
        shoppingCartController.preorder(req, res);
    } )

    /*app.get('/clientRegister', function (req, res) {
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
    });*/
};