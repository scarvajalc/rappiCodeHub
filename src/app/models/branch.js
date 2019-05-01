const Sequelize = require("sequelize");
const database = require("../database");
const RestaurantChain = require("../models/restaurantchain");
const Product = require("../models/product");
const BranchProduct = require("../models/branchproduct");

var Branch = database.sequelize.define(
  "branch",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    restaurantchain_id: {
      type: Sequelize.INTEGER,
      references: "restaurantchains",
      referencesKey: "id"
    },
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    latitude: {
      type: Sequelize.DECIMAL
    },
    longitude: {
      type: Sequelize.DECIMAL
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    deletedAt: {
      type: Sequelize.DATE
    },
    active: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false
  }
);

RestaurantChain.hasMany(Branch, {
  foreignKey: "restaurantchain_id",
  sourceKey: "id"
});
Branch.belongsTo(RestaurantChain, {
  foreignKey: "restaurantchain_id",
  targetKey: "id"
});

Branch.belongsToMany(Product, {
  through: BranchProduct,
  as: "products",
  foreignKey: "branch_id",
  otherKey: "product_id"
});

module.exports = Branch;
