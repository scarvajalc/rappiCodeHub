const express = require('express');
const admins = express.Router();

const handleHTTPLogin = require('../controllers/handlers/admin');
const { adminLogin } = require('../repository/index');

admins.post('/login', (req, res) => {
    const adminData = handleHTTPLogin(req);
    adminLogin(adminData, res)
});

module.exports = admins;