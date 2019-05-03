
const Branch = require('../models/branch');
const OpeningHour = require('../models/openinghour');
const DateParser = require('../repository/date_parser');

const obrepository = {
    
    async getOpenBranches(/*userId*/) {
    
        branches = await Branch.findAll({
            where:{
                active: true
            }
          })
        
        let current_time = DateParser.secsFromWeekStart(new Date())
        let open_branches = []
        for(let i = 0; i < branches.length; i++) {
            let open_branch = false
            let current_branch = branches[i]
            let opening_hours = await current_branch.getHours()
            for(let j = 0; j < opening_hours.length; j++) {
                if (opening_hours[j].opening_time <= current_time && 
                    opening_hours[j].closing_time >= current_time) {
                    open_branch = true
                    break
                }
            }
            if (open_branch) open_branches.push(current_branch)
            return open_branches
        }
        
               
            //date = new Date(); //America/Bogota time zone expected.
            //seconds since Sun @ 00:00:00
            //secondsSinceWeekStarted = date.getDay()*86400 + date.getHours()*3600 + date.getMinutes()*60 + date.getSeconds();
            
            
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