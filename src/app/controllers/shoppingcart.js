//const clientHandler = require('./handlers/client');
const sprepository = require('../repository/shoppingcart');

const shoppingCart = {
    async showCart(req, res) {
        //const clientData = clientHandler.handleHTTPLogin(req);
        let spresponse = await sprepository.getUserShoppingCart(8);
        if (spresponse.cartExists && spresponse.cartProducts.length > 0) {
            //req.session.user = repoResponse.clientData;
            res.render('shoppingCart', {emptyshoppingcart: false, products: spresponse.cartProducts})
        } else {
            res.render('shoppingCart', {emptyshoppingcart: true, message: spresponse.message})
        }
    }
}

module.exports = shoppingCart;