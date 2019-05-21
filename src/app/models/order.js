const Sequelize = require("sequelize");
const database = require("../database");
const Client = require("../models/client");
const ClientAdress = require("../models/client_addresses");
const Branch = require("../models/branch");
const RappiTendero = require("../models/rappitendero");
const Ordersproduct = require("../models/ordersproduct");
//const ProductTest = require("../models/producttest"); //CHANGE HERE
const Product = require("../models/product"); //CHANGE HERE

var Order = database.sequelize.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: {
      type: Sequelize.INTEGER,
      references: "clients", // <<< Note, its table's name, not object name
      referencesKey: "id" // <<< Note, its a column name
    },
    client_address_id: {
      type: Sequelize.INTEGER,
      references: "client_addresses", // <<< Note, its table's name, not object name
      referencesKey: "id" // <<< Note, its a column name
    },
    rt_id: {
      type: Sequelize.INTEGER,
      references: "rappitenderos", // <<< Note, its table's name, not object name
      referencesKey: "id" // <<< Note, its a column name
    },
    branch_id: {
      type: Sequelize.INTEGER,
      references: "branches", // <<< Note, its table's name, not object name
      referencesKey: "id" // <<< Note, its a column name
    },
    total: {
      type: Sequelize.REAL
    },
    status: {
      type: Sequelize.BOOLEAN
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
Order.belongsTo(Client, { foreignKey: "client_id" });

Order.belongsTo(ClientAdress, { foreignKey: "client_address_id" });

Order.belongsTo(Branch, { foreignKey: "branch_id" });

Order.belongsTo(RappiTendero, { foreignKey: "rt_id" });

Order.belongsToMany(Product, {
  through: Ordersproduct,
  as: "products",
  foreignKey: "order_id",
  otherKey: "product_id"
});

module.exports = Order;
