//const clientHandler = require('./handlers/client');
const sprepository = require('../repository/shoppingcart');

const shoppingCart = {
    showCart(req, res) {
        //const clientData = clientHandler.handleHTTPLogin(req);
        sprepository.showCart(res);
    }
}

module.exports = shoppingCart;