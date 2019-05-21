const cartController = require("../controllers/cart");

module.exports = app => {
  app.post("/addToCart", (req, res) => {
    cartController.addToCart(req, res);
  });

  app.post("/removeFromCart", (req, res) => {
    cartController.removeFromCart(req, res);
  });

  app.get("/clientCart", async (req, res) => {
    const cart = await cartController.getClientCart(req, res);
    res.render("clientCart", {
      cart: cart
    });
  });
};
