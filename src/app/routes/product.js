const ProductController = require('../controllers/product');

module.exports = app => {
  app.get("/product", (req, res) => {
    ProductController.showProducts(req, res)   
  });
 
};
