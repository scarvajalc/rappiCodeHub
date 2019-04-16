const Sequelize = require('sequelize');
const database = require('../database');
const Productsshoppingcart = require('../models/productsshoppingcart');
const ShoppingCart = require('../models/shoppingcart');

var ProductTest = database.sequelize.define(
    'producttest',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.REAL
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
)

ProductTest.belongsToMany(ShoppingCart, {
    through: 'Productsshoppingcart',
    as: 'shoppingcarts',
    foreignKey: 'sc_id'
  });
module.exports = ProductTest