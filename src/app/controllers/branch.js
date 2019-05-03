const obrepository = require('../repository/branch');

const openBranches = {
    async showRestaurantList(req, res) {
        const userId = 8 ////change here for user session
        let obresponse = await obrepository.getOpenBranches(/*userId*/); 
        /*if (obresponse.cartExists && obresponse.cartProducts.length > 0) {
            //req.session.user = repoResponse.clientData;
            res.render('shoppingCart', {emptyshoppingcart: false, products: obresponse.cartProducts, total: spresponse.total})
        } else {
            res.render('shoppingCart', {emptyshoppingcart: true, message: 'No hay items en el carrito'})
        }*/
    }
}

module.exports = openBranches;
