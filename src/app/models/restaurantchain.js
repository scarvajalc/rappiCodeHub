const Sequelize = require("sequelize");
const database = require("../database");

module.exports = database.sequelize.define(
  "restaurantchain",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nit: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
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
