const express = require('express');
const admins = express.Router();
const adminLoginController = require('../controllers/admin');

admins.post('/login', (req) => {
    adminLoginController(req);
});