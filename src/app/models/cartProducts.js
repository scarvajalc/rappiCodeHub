const Sequelize = require("sequelize");
const database = require("../database");
const Client = require("../models/client");
const Product = require("../models/product");

var CartProducts = database.sequelize.define(
  "cartproduct",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cart_id: {
      type: Sequelize.INTEGER,
      references: "cart",
      referencesKey: "id"
    },
    product_id: {
      type: Sequelize.INTEGER,
      references: "product",
      referencesKey: "id"
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    deletedAt: {
      type: Sequelize.DATE
    }
  },
  {
    timestamps: false
  }
);

Product.hasMany(CartProducts, {
  foreignKey: "product_id"
});

CartProducts.belongsTo(Product, {
  foreignKey: "product_id",
  sourceKey: "id"
});

Client.hasMany(CartProducts, {
  foreignKey: "client_id"
});

CartProducts.belongsTo(Client, {
  foreignKey: "client_id",
  sourceKey: "id"
});

module.exports = CartProducts;
