const Sequelize = require('sequelize');
const database = require('../database');
const ShoppingCart = require('../models/shoppingcart');
const ProductTest = require('../models/producttest')

var Productsshoppingcart = database.sequelize.define(
    'productsshoppingcarts',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        sc_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'shoppingcarts',
                key: 'id'
            }
        },
        product_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'producttests', //CHANGE HERE
                key: 'id'
            }
        },
        ammount: {
            type: sequelize.INTEGER
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

module.exports = Productsshoppingcart