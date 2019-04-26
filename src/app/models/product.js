const Sequelize = require('sequelize');
const database = require('../database');
const Branch = require('../models/branch');
const BranchProduct = require('../models/branchproduct');
const Category = require('../models/category');
const CategoryProduct = require('../models/categoryproduct');

var Product = database.sequelize.define(
    'product',
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
)

/*Product.belongsToMany(Branch, {
    through: BranchProduct,
    as: 'branches',
    foreignKey: 'product_id',
    otherKey: 'branch_id'
});*/

Product.belongsToMany(Category, {
    through: CategoryProduct,
    as: 'categories',
    foreignKey: 'product_id',
    otherKey: 'category_id'
});

module.exports = Product