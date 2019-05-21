const Client = require("../models/client");
const Admin = require("../models/admin");
const RappiTendero = require("../models/rappitendero");
const ClientAddress = require("../models/client_addresses");
const CartProduct = require("../models/cartProducts");
const Cart = require("../models/cart");
const Product = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const repository = {
  adminLogin(adminData, res) {
    return Admin.findOne({
      where: {
        email: adminData.email
      }
    })
      .then(admin => {
        if (admin) {
          if (bcrypt.compareSync(adminData.password, admin.password)) {
            let token = jwt.sign(admin.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1500
            });
            return { validCredentials: true, adminData: admin, role: "admin" };
          }
        } else {
          return { validCredentials: false, message: "Admin does not exists" };
        }
      })
      .catch(err => {
        return { error: err };
      });
  },

  clientRegister(clientData, res) {
    return bcrypt.hash(clientData.password, 10).then(hash => {
      clientData.password = hash;
      return Client.create(clientData)
        .then(client => {
          return { message: `${client.email} registered` };
        })
        .catch(err => {
          return { error: err };
        });
    });
  },

  clientLogin(clientData, res) {
    Client.hasMany(ClientAddress, { foreignKey: "client_id" });
    ClientAddress.belongsTo(Client, { foreignKey: "id" });

    return Client.findOne({
      where: {
        email: clientData.email
      },
      include: [ClientAddress]
    })
      .then(client => {
        if (client) {
          if (bcrypt.compareSync(clientData.password, client.password)) {
            let token = jwt.sign(client.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1500
            });
            return {
              validCredentials: true,
              clientData: client,
              role: "client"
            };
          }
        } else {
          return { validCredentials: false, message: "Client does not exists" };
        }
      })
      .catch(err => {
        return { error: err };
      });
  },

  rappiTenderoRegister(rappiTenderoData, res) {
    return bcrypt.hash(rappiTenderoData.password, 10).then(hash => {
      rappiTenderoData.password = hash;
      return RappiTendero.create(rappiTenderoData)
        .then(rappiTendero => {
          return { message: `${rappiTendero.email} registered` };
        })
        .catch(err => {
          return { error: err };
        });
    });
  },

  rappiTenderoLogin(rappiTenderoData, res) {
    return RappiTendero.findOne({
      where: {
        email: rappiTenderoData.email
      }
    })
      .then(rappiTendero => {
        if (rappiTendero) {
          if (
            bcrypt.compareSync(rappiTenderoData.password, rappiTendero.password)
          ) {
            let token = jwt.sign(
              rappiTendero.dataValues,
              process.env.SECRET_KEY,
              {
                expiresIn: 1500
              }
            );
            return {
              validCredentials: true,
              rappiTenderoData: rappiTendero,
              role: "rappiTendero"
            };
          }
        } else {
          return {
            validCredentials: false,
            message: "RappiTendero does not exist"
          };
        }
      })
      .catch(err => {
        return { error: err };
      });
  },

  clientRegisterAddress(clientAddress) {
    return ClientAddress.create(clientAddress)
      .then(clientAddress => {
        return {
          message: `${clientAddress.address_name} registered`,
          clientAddress: clientAddress
        };
      })
      .catch(err => {
        return { error: err };
      });
  },

  rappiTenderoUpdateAddress(rappiTenderoAddress) {
    RappiTendero.findOne({
      where: {
        id: rappiTenderoAddress.id
      }
    }).then(rappiTendero => {
      rappiTendero.update({
        latitude: rappiTenderoAddress.latitude,
        longitude: rappiTenderoAddress.longitude
      });
    });
  },

  async addProductToCart(productData) {
    const addProduct = await CartProduct.create(productData);
    return addProduct;
  },

  async removeProductFromCart(productData) {
    const removeProduct = await CartProduct.destroy({
      where: {
        cart_id: productData.cart_id,
        product_id: productData.product_id
      }
    });
    return removeProduct;
  },

  async getClientCart(clientId) {
    const clientCart = await Cart.findAll({
      where: {
        active: true,
        client_id: clientId
      },
      include: [
        {
          model: CartProduct,
          required: true,
          include: [
            {
              model: Product,
              required: true
            }
          ]
        }
      ]
    });

    return clientCart;
  },

  async getAllAvailableRappiT() {
    const getRappiTenderos = await RappiTendero.findAll({
      where: {
        in_order: false
      }
    });

    return getRappiTenderos;
  },

  async getAssignedRappiTendero(rappiTenderoId) {
    const assignedRappiTendero = await RappiTendero.findAll({
      where: {
        id: rappiTenderoId
      }
    });

    return assignedRappiTendero;
  }
};

module.exports = repository;
