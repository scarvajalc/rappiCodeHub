const express = require('express');
const admins = express.Router();
const adminController = require('../controllers/admin');

admins.post('/login', (req, res) => {
    adminController.adminLogin(req, res);
});

module.exports = admins;