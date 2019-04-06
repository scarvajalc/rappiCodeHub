const express = require('express');
const rappitenderos = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Rappitendero = require('../models/rappitendero');

rappitenderos.post('/register', (req, res) => {
    const today = new Date();
    const rappitenderoData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        createdAt: today,
        active: true
    };

    Rappitendero.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(rappitendero => {
        if(!rappitendero){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                rappitenderoData.password = hash;
                Rappitendero.create(rappitenderoData)
                .then(rappitendero => {
                    res.json({status: `${rappitendero.email} registered`})
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

rappitenderos.post('/login', (req, res) => {
    Rappitendero.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(rappitendero => {
        if(rappitendero){
            if(bcrypt.compareSync(req.body.password, rappitendero.password)){
                let token = jwt.sign(rappitendero.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1500
                });
                res.send(token);
            }
        } else {
            res.status(400).json({error: `Rappitendero does not exist`})
        };
    })
    .catch(err => {
        res.status(400).json({ error: err})
    });
});

module.exports = rappitenderos;