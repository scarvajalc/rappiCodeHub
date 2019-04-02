const express = require('express');
const clients = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

clients.post('/login', (req, res) => {
    Client.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(client => {
        if(client){
            if(bcrypt.compareSync(req.body.password, client.password)){
                let token = jwt.sign(client.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1500
                });
                res.send(token);
            }
        } else {
            res.status(400).json({error: `Client does not exist`})
        };
    })
    .catch(err => {
        res.status(400).json({ error: err})
    });
});

module.exports = clients;