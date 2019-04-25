//const clientHandler = require('./handlers/client');
const bodyParser = require('body-parser');  
const url = require('url');  
const querystring = require('querystring'); 
const sprepository = require('../repository/shoppingcart');

const shoppingCart = {
    async showCart(req, res) {
        const userId = req.session.user.id ////change here for user session
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
        if(scresponse.deleted){
            res.redirect('/shoppingcart')
        }else{
            res.send('Error while deleting product')
        }

    },

    async addProduct(req, res){
        let productId = req.query.productId
        let ammount = req.query.ammount
        let userId = req.session.user.id
        let scresponse = await sprepository.addProduct(productId, ammount, userId)
        if(scresponse.added){
            res.redirect('/shoppingcart')
            //res.redirect('back')
        }else{
            res.send('Error while adding product')
        }
    },

    async preorder(req, res){
        let userId = req.session.user.id
        let clientAddress = '';
        if (req.session.address.address_name != undefined) {
            clientAddress = req.session.address.address_name;
        }else{
            message = "Antes de crear la orden debe asignar una  dirección"
        }
        let scinfo = await sprepository.getUserShoppingCart(userId);
        let productTotal =  scinfo.total
        let deliveryCost = 4500
        let orderTotal = productTotal + deliveryCost
        let deliveryTime = 30
        
        res.render('preorder',{addres: clientAddress, productTotal: productTotal, deliveryCost: deliveryCost, orderTotal : orderTotal, deliveryTime: deliveryTime })
    }
}

module.exports = shoppingCart;
