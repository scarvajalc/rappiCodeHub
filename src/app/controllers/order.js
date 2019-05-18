//const clientHandler = require('./handlers/client');
//const bodyParser = require("body-parser");
//const url = require("url");
//const querystring = require("querystring");
const orderRepo = require("../repository/order");

const order = {
  async createOrder(req, res) {
    console.log("Eeeeeeeeeeeeeee");
    //let total = req.body.orderTotal;
    let userId = req.session.user.id;
    let addressId = req.session.address.id;
    await orderRepo.createOrder(total, userId, addressId);

    res.redirect("/clientHome");
  }
};

module.exports = order;
