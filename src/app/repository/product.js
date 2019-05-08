const Product = require('../models/product');
const BranchProduct = require('../models/branchproduct');

const productoRepository = {
    
    async getAvailableProducts(branch) {
    
        branch_products = await BranchProduct.findAll({
            where:{
                branch_id: branch,
                active: true
            }
          })
        let available_products = []

        for(let i = 0; i < branch_products; i++) {
            if (branch_products[i].stock <= 0) continue;
            
            product_info = await Products.find({
                where:{
                    branch_id: branch,
                    active: true
                }
              })
            let available_products = []
    

        }
        


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
        }
        return available_products
    }

}

module.exports = productoRepository;