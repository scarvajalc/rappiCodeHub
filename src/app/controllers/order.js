//const clientHandler = require('./handlers/client');
//const bodyParser = require("body-parser");
//const url = require("url");
//const querystring = require("querystring");
const orderRepo = require("../repository/order");

const order = {
  async createOrder(req, res) {
    //let total = req.body.orderTotal;
    let userId = req.session.user.id;
    let addressId = req.session.address.id;
    try {
      const orderRepoResponse = await orderRepo.startOrderProcess(
        userId,
        addressId
      );
    } catch (error) {}
    if (orderRepoResponse.orderCreated) {
    }
    //res.redirect("/clientHome");
  },

  async prueba(req, res) {
    let userId = 7;
    await orderRepo.getOrderTotalPrice(7);
    res.send("lel");
  }
};

module.exports = order;
