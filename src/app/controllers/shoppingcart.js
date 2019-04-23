//const clientHandler = require('./handlers/client');
const bodyParser = require('body-parser');  
const url = require('url');  
const querystring = require('querystring'); 
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
    },

    async deleteSCProduct(req, res){
        let scProductId = req.query.scproductid
        let scresponse = await sprepository.deleteShoppingCartProduct(scProductId)
        console.log(scresponse)
        if(scresponse.deleted){
            res.redirect('/shoppingcart')
        }else{
            res.send('Error while deleting product')
        }

    }
}

module.exports = shoppingCart;
