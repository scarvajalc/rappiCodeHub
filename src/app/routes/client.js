const express = require('express');
const clients = express.Router();
const clientController = require('../controllers/client');

clients.post('/login', (req, res) => {
    clientController.clientLogin(req, res);
});

clients.post('/register', (req, res) => {
    clientController.clientRegister(req, res);
});

module.exports = clients;