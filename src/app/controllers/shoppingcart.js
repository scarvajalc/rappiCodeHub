//const clientHandler = require('./handlers/client');
const sprepository = require('../repository/shoppingcart');

const shoppingCart = {
    async showCart(req, res) {
        const userId = 8 ////change here for user session
        let spresponse = await sprepository.getUserShoppingCart(userId); 
        if (spresponse.cartExists && spresponse.cartProducts.length > 0) {
            //req.session.user = repoResponse.clientData;
            res.render('shoppingCart', {emptyshoppingcart: false, products: spresponse.cartProducts, total: spresponse.total})
        } else {
            res.render('shoppingCart', {emptyshoppingcart: true, message: 'No hay items en el carrito'})
        }
    }
}

module.exports = shoppingCart;
