const Sequelize = require("sequelize");
const database = require("../database");
const Client = require("../models/client");
const Product = require("../models/product");
const Cart = require("../models/cart");

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

Cart.hasMany(CartProducts, {
  foreignKey: "cart_id"
});

CartProducts.belongsTo(Cart, {
  foreignKey: "cart_id",
  sourceKey: "id"
});

module.exports = CartProducts;
