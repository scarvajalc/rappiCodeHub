const Client = require("../models/client");
const Admin = require("../models/admin");
const RappiTendero = require("../models/rappitendero");
const ClientAddress = require("../models/client_addresses");
const CartProduct = require("../models/cartProducts");
const Cart = require("../models/cart");
const Product = require("../models/product");
const RestaurantChain = require("../models/restaurantchain");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const repository = {
  async adminLogin(adminData) {
    const adminPasswordEncrypted = await Admin.findOne({
      attributes: ["password"],
      where: {
        email: adminData.email
      }
    });

    if (adminPasswordEncrypted) {
      const encryptedPasswordAndAdminPasswordMatch = await bcrypt.compareSync(
        adminData.password,
        adminPasswordEncrypted.dataValues.password
      );
      if (encryptedPasswordAndAdminPasswordMatch) {
        return (loggedAdmin = await Admin.findOne({
          where: {
            email: adminData.email
          }
        }));
      }
    } else {
      return null;
    }
  },

  async clientRegister(clientData) {
    const encryptedClientPassword = await bcrypt.hash(clientData.password, 10);
    clientData.password = encryptedClientPassword;
    registeredClient = await Client.create(clientData);
    await Cart.create({
      client_id: registeredClient.dataValues.id,
      active: true
    });
    return registeredClient;
  },

  async clientLogin(clientData) {
    const clientPasswordEncrypted = await Client.findOne({
      attributes: ["password"],
      where: {
        email: clientData.email
      }
    });

    if (clientPasswordEncrypted) {
      const encryptedPasswordAndClientPasswordMatch = await bcrypt.compareSync(
        clientData.password,
        clientPasswordEncrypted.dataValues.password
      );
      if (encryptedPasswordAndClientPasswordMatch) {
        return (loggedClientWithAddress = await Client.findOne({
          where: {
            email: clientData.email
          },
          include: [ClientAddress]
        }));
      }
    } else {
      return null;
    }
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
  },

  async getClientCartId(clientId) {
    return (clientCartId = await Cart.findAll({
      attributes: ["id"],
      where: {
        client_id: clientId
      }
    }));
  },

  async registerRestaurantChains(restaurantChainsData) {
    return (registeredRestaurantChain = await RestaurantChain.create(
      restaurantChainsData
    ));
  }
};

module.exports = repository;
