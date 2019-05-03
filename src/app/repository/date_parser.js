
const dateparser = {

    SecondsSinceSunModMidnight(/*userId*/) {
        
        return Branch.findAll({
            where:{
                active: true
            }
        }).then(branches => {
            for(let i = 0; i < branches.length; i++){
                console.log(branches[i].name)
            }
            //console.log(branches)
            /*if(cart){
                return cart.getProducts().then(products =>{
                    let total = 0
                    for(let i = 0; i < products.length; i++){
                        total += products[i].price * products[i].productsshoppingcart.ammount
                    }
                    return {cartExists: true, cartProducts: products, total: total}
                }).catch(err => {
                    return { error: err }
                });
            }else{
                return {cartExists: false, message: 'No hay items en el carrito'}
            }*/
            
        }).catch(err => {
            return { error: err }
        });
    }

}

module.exports = dateparser;