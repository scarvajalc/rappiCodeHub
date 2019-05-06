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
  }
};

module.exports = branchRepository;
