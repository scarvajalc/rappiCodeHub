const express = require('express');
const clients = express.Router();

const { handleHTTPRegister, handleHTTPLogin } = require('../controllers/handlers/client');
const { registerClient, clientLogin } = require('../repository/index');
 
clients.post('/register', (req, res) => {
    const clientData = handleHTTPRegister(req);
    registerClient(clientData, res);
});

clients.post('/login', (req, res) => {
    const clientData = handleHTTPLogin(req);
    clientLogin(clientData, res);
});

module.exports = clients;