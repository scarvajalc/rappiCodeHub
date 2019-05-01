const Sequelize = require("sequelize");
const database = require("../database");
const Product = require("../models/product");
const CategoryProduct = require("../models/categoryproduct");

var Category = database.sequelize.define(
  "category",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
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

/*Category.belongsToMany(Product, {
    through: CategoryProduct,
    as: 'products',
    foreignKey: 'category_id',
    otherKey: 'product_id'
});*/

module.exports = Category;
