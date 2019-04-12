const Sequelize = require('sequelize');
const database = require('../database');
const Client = require('../models/client');

var ShoppingCart = database.sequelize.define(
    'shoppingcart',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        client_id: {
            type: Sequelize.INTEGER,
            references: 'clients', // <<< Note, its table's name, not object name
            referencesKey: 'id' // <<< Note, its a column name
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
ShoppingCart.belongsTo(Client);

module.exports = ShoppingCart