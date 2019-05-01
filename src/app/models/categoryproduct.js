const Sequelize = require("sequelize");
const database = require("../database");

module.exports = database.sequelize.define(
  "categoryproduct",
  {
    product_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "products",
        key: "id"
      }
    },
    category_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "categories",
        key: "id"
      }
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
