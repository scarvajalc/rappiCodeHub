const Branch = require("../models/branch");
const OpeningHour = require("../models/openinghour");
const BranchProducts = require("../models/branchproduct");
const Products = require("../models/product");
const repository = require("../repository/index");
const moment = require("moment");
const { Op } = require("sequelize");

const branchRepository = {
  async getOpenBranches() {
    Branch.hasMany.OpeningHour, { as: "hours", foreignKey: "branch_id" };
    OpeningHour.belongsTo(Branch, { foreignKey: "id" });

    const currentTime = moment().format("HH:mm:ss");
    const openBranches = await Branch.findAll({
      where: {
        active: true
      },
      include: [
        {
          model: OpeningHour,
          as: "hours",
          where: {
            opening_time: {
              [Op.lte]: currentTime
            },
            closing_time: {
              [Op.gte]: currentTime
            }
          }
        }
      ]
    });

    return openBranches;
  },

  async getAllBranchProducts(branchId) {
    const branchProducts = await Branch.findAll({
      where: {
        id: branchId.id
      },
      include: [
        {
          model: BranchProducts,
          required: true,
          where: {
            active: true
          },
          include: [
            {
              model: Products,
              required: true,
              where: {
                active: true
              }
            }
          ]
        }
      ]
    });
    return branchProducts;
  },

  async checkProducts(cartProducts) {
    var checkedProducts = [];
    for (var i = 0; i < cartProducts.length; i++) {
      checkedProducts.push(
        await BranchProducts.findAll({
          where: {
            product_id: cartProducts[i].product_id
          },
          attributes: ["stock", "active"]
        })
      );
    }
    return checkedProducts;
  },

  async getStoreClosingTime(productId) {
    const getBranchId = await BranchProducts.findAll({
      attributes: ["branch_id"],
      where: {
        product_id: productId
      }
    });

    const branchId = getBranchId[0].dataValues.branch_id;
    const storeClosingTime = await OpeningHour.findAll({
      attributes: ["closing_time"],
      where: {
        branch_id: branchId
      },
      group: ["closing_time"]
    });

    const closingTime = storeClosingTime[0].dataValues.closing_time;
    return closingTime;
  },

  async getBranchCoordinates(branchId) {
    const getCoordinates = await Branch.findAll({
      attributes: ["latitude", "longitude"],
      where: {
        id: branchId
      }
    });

    branchCoordinates = {
      latitude: getCoordinates[0].dataValues.latitude,
      longitude: getCoordinates[0].dataValues.longitude
    };

    return branchCoordinates;
  },

  async getCartBranchId(clientId) {
    const cartProducts = await repository.getClientCart(clientId);
    const productId =
      cartProducts[0].dataValues.cartproducts[0].dataValues.product_id;
    const branchId = await BranchProducts.findAll({
      attributes: ["branch_id"],
      where: {
        product_id: productId
      }
    });

    return branchId[0].dataValues.branch_id;
  },

  async checkStoreTime(clientId) {
    const storeOpen = {
      isOpen: false
    };
    const cartProducts = await repository.getClientCart(clientId);
    const productId =
      cartProducts[0].dataValues.cartproducts[0].dataValues.product_id;
    const storeTime = await branchRepository.getStoreClosingTime(productId);
    const currentTime = moment().format("HH:mm:ss");
    if (storeTime >= currentTime) {
      storeOpen.isOpen = true;
    }
    return storeOpen;
  },

  async checkCartProducts(clientId) {
    const productsAvailable = {
      allProductsAvailable: false,
      noStockProducts: []
    };
    const cartProducts = await repository.getClientCart(clientId);
    var cartProductsDataToFilter = [];
    for (var i = 0; i < cartProducts[0].cartproducts.length; i++) {
      cartProductsDataToFilter.push({
        product_id:
          cartProducts[0].cartproducts[i].dataValues.product.dataValues.id,
        quantity: cartProducts[0].dataValues.cartproducts[i].dataValues.quantity
      });
    }
    const checkedProducts = await branchRepository.checkProducts(
      cartProductsDataToFilter
    );

    var checkedCartProductsResponse = [];
    for (var i = 0; i < checkedProducts.length; i++) {
      if (
        cartProductsDataToFilter[i].quantity >
          checkedProducts[i][0].dataValues.stock ||
        !checkedProducts[i][0].dataValues.active
      ) {
        checkedCartProductsResponse.push(
          `${
            cartProducts[0].cartproducts[i].dataValues.product.dataValues.name
          } se ha acabado`
        );
      }
    }
    productsAvailable.noStockProducts = checkedCartProductsResponse;
    if (checkedCartProductsResponse.length == 0) {
      productsAvailable.allProductsAvailable = true;
    }

    return productsAvailable;
  },

  async registerBranch(branchData) {
    const {
      restaurantchain_id,
      name,
      address,
      latitude,
      longitude,
      url_image,
      createdAt,
      active,
      opening_time,
      closing_time
    } = branchData;
    const registeredBranch = await Branch.create({
      restaurantchain_id,
      name,
      address,
      latitude,
      longitude,
      url_image,
      createdAt,
      active
    });

    const branch_id = registeredBranch.dataValues.id;

    return (registeredBranchWithTimeSchedule = await OpeningHour.create({
      branch_id,
      createdAt,
      active,
      opening_time,
      closing_time
    }));
  }
};

module.exports = branchRepository;
