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

        for(let i = 0; i < branch_products.length; i++) {
            if (branch_products[i].stock <= 0) continue;
            product_info = await Product.findOne({
                where:{
                    id: branch_products[i].product_id,
                    active: true
                }
              })
            available_products.push(product_info)
        }
                
        return available_products
    }

}

module.exports = productoRepository;