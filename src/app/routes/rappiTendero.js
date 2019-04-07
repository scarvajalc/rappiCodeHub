const express = require('express');
const rappiTenderos = express.Router();
const rappiTenderoController = require('../controllers/rappiTendero');

rappiTenderos.post('/login', (req, res) => {
    rappiTenderoController.rappiTenderoLogin(req, res);
});

rappiTenderos.post('/register', (req, res) => {
    rappiTenderoController.rappiTenderoRegister(req, res);
});

module.exports = rappiTenderos;