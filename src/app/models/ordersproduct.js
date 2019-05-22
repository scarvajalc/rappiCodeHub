const Sequelize = require("sequelize");
const database = require("../database");

var Ordersproduct = database.sequelize.define(
  "ordersproduct",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    order_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "orders",
        key: "id"
      }
    },
    product_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "products",
        key: "id"
      }
    },
    quantity: {
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

module.exports = Ordersproduct;
