const Sequelize = require("sequelize");
const database = require("../database");

var Cart = database.sequelize.define(
  "cart",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: {
      type: Sequelize.INTEGER,
      references: "client",
      referencesKey: "id"
    },
    active: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false
  }
);

module.exports = Cart;
