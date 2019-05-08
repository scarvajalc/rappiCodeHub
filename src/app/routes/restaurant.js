const branchController = require("../controllers/branch");

module.exports = app => {
  app.get("/product/:id", (req, res) => {
    branchController.getAllStoreProducts(req, res);
  });

  app.get("/singleRestaurant", (req, res) => {
    const branchName = req.session.products[0].name;
    const branchProducts = req.session.products[0].branchproducts;
    res.render("singleRestaurant", {
      storeProducts: branchProducts,
      branchName: branchName
    });
  });

  app.get("/checkProducts", (req, res) => {
    branchController.checkCartProducts(req, res);
  });
};
