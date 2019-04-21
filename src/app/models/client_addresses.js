const Sequelize = require('sequelize');
const database = require('../database');

module.exports = database.sequelize.define(
    'client_addresses',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        client_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'clients',
                key: 'id'
            }
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        },
        address_name: {
            type: Sequelize.STRING
        },
        current: {
            type: Sequelize.BOOLEAN
        }
    },
    {
        timestamps: false
    }
)