const Sequelize = require("sequelize");
const database = require("../database");
const Branch = require("../models/branch");

var OpeningHour = database.sequelize.define(
  "openinghour",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    branch_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "branches",
        key: "id"
      }
    },
    opening_time: {
      type: Sequelize.TIME
    },
    closing_time: {
      type: Sequelize.TIME
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

Branch.hasMany(OpeningHour, {
  as: "hours",
  foreignKey: "branch_id",
  sourceKey: "id"
});
OpeningHour.belongsTo(Branch, { foreignKey: "branch_id", targetKey: "id" });

module.exports = OpeningHour;
