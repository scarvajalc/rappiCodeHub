const branchController = require("../controllers/branch");

module.exports = app => {
  app.get("/product/:id", (req, res) => {
    branchController.getAllStoreProducts(req, res);
  });

  app.get("/singleRestaurant", (req, res) => {
    if (req.session.products.length != 0) {
      var branchProducts = req.session.products[0].branchproducts;
      var branchName = req.session.products[0].name;
    } else {
      var branchProducts = [];
      var branchName = [];
    }
    res.render("singleRestaurant", {
      storeProducts: branchProducts,
      branchName: branchName
    });
  });

  app.get("/checkProducts", (req, res) => {
    branchController.checkCartProducts(req, res);
  });

  app.get("/checkStoreTime", (req, res) => {
    branchController.checkStoreTime(req, res);
  });
};
