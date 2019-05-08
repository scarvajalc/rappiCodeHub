const cartController = require("../controllers/cart");

module.exports = app => {
  app.post("/addToCart", (req, res) => {
    cartController.addToCart(req, res);
  });

  app.post("/removeFromCart", (req, res) => {
    cartController.removeFromCart(req, res);
  });
};
