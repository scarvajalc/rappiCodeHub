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
      if (orderRepoResponse.orderCreated) {
        res.render("orderResponse", {
          orderOk: true,
          msg: "Orden Creada Correctamente"
        });
      } else {
        res.render("orderResponse", {
          orderOk: false,
          msg:
            "Tu orden no pudo ser creada, el restaurante está cerrado o no tiene los productos que solicitas"
        });
      }
    } catch (error) {
      res.render("orderResponse", {
        orderOk: false,
        msg: "Error creando la orden, intenta mas tarde"
      });
    }
  },

  async showOrderDetails(req, res) {
    let userId = req.session.user.id;
    let orderData = await orderRepo.getOrderData(userId);
    res.render("orderInProgress", orderData);
  },

  async prueba(req, res) {
    let userId = 7;
    await orderRepo.getOrderTotalPrice(7);
    res.send("lel");
  }
};

module.exports = order;
