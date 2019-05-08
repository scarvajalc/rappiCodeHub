const ProductController = require('../controllers/product');

module.exports = app => {
  app.get("/products", (req, res) => {
    ProductController.showProducts(req, res)   
  });
 
};
