const Branch = require("../models/branch");
const OpeningHour = require("../models/openinghour");
const BranchProducts = require("../models/branchproduct");
const Products = require("../models/product");
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
          include: [
            {
              model: Products,
              required: true
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
  }
};

module.exports = branchRepository;
