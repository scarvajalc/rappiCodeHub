
const Branch = require('../models/branch');
const OpeningHour = require('../models/openinghour');

const obrepository = {
    
    async getOpenBranches(/*userId*/) {
    
        branches = await Branch.findAll({
            where:{
                active: true
            }
            /*include: [{
              model: OpeningHour,
              required: true
             }]*/
          })
            
            //date = new Date(); //America/Bogota time zone expected.
            //seconds since Sun @ 00:00:00
            //secondsSinceWeekStarted = date.getDay()*86400 + date.getHours()*3600 + date.getMinutes()*60 + date.getSeconds();
            
            for(let i = 0; i < branches.length; i++){
                console.log('Hola')
                let opening_hours = await branches[i].getHours()
                console.log(opening_hours[0].opening_time)
                //console.log(branches[i])
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
            
    }

}

module.exports = obrepository;