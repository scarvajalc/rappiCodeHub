const Sequelize = require('sequelize');
const database = require('../database');

module.exports = database.sequelize.define(
    'branchproduct',
    {
        product_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        branch_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'branches',
                key: 'id'
            }
        },
        stock: {
            type: Sequelize.INTEGER
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