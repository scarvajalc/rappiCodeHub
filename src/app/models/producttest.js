const Sequelize = require('sequelize');
const database = require('../database');
const ShoppingCart = require('../models/shoppingcart');
const Productsshoppingcart = require('../models/productsshoppingcart');



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
//console.log("sfsd "+Productsshoppingcart)
/*ProductTest.belongsToMany(ShoppingCart, {
    through: Productsshoppingcart,
    as: 'shoppingcarts',
    foreignKey: 'sc_id'
  });
*/
  
module.exports = ProductTest