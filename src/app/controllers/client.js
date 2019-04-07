const express = require('express');
const clients = express.Router();

const clientHandler = require('../controllers/handlers/client');
const repository = require('../repository/index');

clients.post('/register', (req, res) => {
    const clientData = clientHandler.handleHTTPRegister(req);
    repository.clientRegister(clientData, res);
});

clients.post('/login', (req, res) => {
    const clientData = clientHandler.handleHTTPLogin(req);
    repository.clientLogin(clientData, res);
});

module.exports = clients;