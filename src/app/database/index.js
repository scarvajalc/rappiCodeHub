require('dotenv').config();
const Sequelize = require('sequelize');
const database = {};
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;