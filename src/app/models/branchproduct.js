const Sequelize = require("sequelize");
const database = require("../database");
const Branch = require("../models/branch");
const Products = require("../models/product");

var branchProducts = database.sequelize.define(
  "branchproduct",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "products",
        key: "product_id"
      }
    },
    branch_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "branches",
        key: "branch_id"
      }
    },
    stock: {
      type: Sequelize.INTEGER
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

Branch.hasMany(branchProducts, {
  foreignKey: "branch_id"
});

branchProducts.belongsTo(Branch, {
  foreignKey: "branch_id",
  sourceKey: "id"
});

Products.hasMany(branchProducts, {
  foreignKey: "product_id"
});

branchProducts.belongsTo(Products, {
  foreignKey: "product_id",
  sourceKey: "id"
});

module.exports = branchProducts;
