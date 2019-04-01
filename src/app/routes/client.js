const express = require('express');
const clients = express.Router();
const bcrypt = require('bcrypt');
const Client = require('../models/client');

clients.post('/register', (req, res) => {
    const today = new Date();
    const clientData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        createdAt: today,
        active: true
    };

    Client.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(client => {
        if(!client){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                clientData.password = hash;
                Client.create(clientData)
                .then(client => {
                    res.json({status: `${client.email} registered`})
                })
                .catch(err => {
                    res.send(`Error ${err}`)
                });
            });
        };
    })
    .catch(err => {
        res.send(`Error ${err}`)
    });
});


module.exports = clients;