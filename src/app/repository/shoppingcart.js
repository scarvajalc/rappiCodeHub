const Client = require("../models/client");
const ShoppingCart = require("../models/shoppingcart");
const Productsshoppingcart = require("../models/productsshoppingcart");

const sprepository = {
  getUserShoppingCart(userId) {
    return ShoppingCart.findOne({
      where: {
        client_id: userId
      }
    })
      .then(cart => {
        //console.log(cart)
        if (cart) {
          return cart
            .getProducts()
            .then(products => {
              let total = 0;
              for (let i = 0; i < products.length; i++) {
                total +=
                  products[i].price * products[i].productsshoppingcart.ammount;
              }
              return { cartExists: true, cartProducts: products, total: total };
            })
            .catch(err => {
              return { error: err };
            });
        } else {
          return { cartExists: false, message: "No hay items en el carrito" };
        }
      })
      .catch(err => {
        return { error: err };
      });
  },

  deleteShoppingCartProduct(scProductId) {
    return Productsshoppingcart.destroy({
      where: {
        id: scProductId
      }
    })
      .then(() => {
        //console.log(cart)
        return { deleted: true };
      })
      .catch(err => {
        return { error: err };
      });
  },

  addProduct(productId, ammount, userId) {
    return ShoppingCart.findOne({
      where: {
        client_id: userId
      }
    })
      .then(cart => {
        //console.log(cart)
        if (cart) {
          let data = {
            sc_id: cart.id,
            product_id: parseInt(productId, 10),
            ammount: parseInt(ammount, 10)
          };
          return Productsshoppingcart.create(data)
            .then(psc => {
              return { added: true, newProduct: psc };
            })
            .catch(err => {
              return { error: err };
            });
        } else {
          let scData = { client_id: userId };
          return ShoppingCart.create(scData)
            .then(sc => {
              let data = {
                sc_id: sc.id,
                product_id: parseInt(productId, 10),
                ammount: parseInt(ammount, 10)
              };
              return Productsshoppingcart.create(data)
                .then(psc => {
                  return { added: true, newProduct: psc };
                })
                .catch(err => {
                  return { error: err };
                });
            })
            .catch(err => {
              return { error: err };
            });
        }
      })
      .catch(err => {
        return { error: err };
      });
  }
};

module.exports = sprepository;
