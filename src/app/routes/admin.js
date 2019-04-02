const express = require('express');
const admins = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

admins.post('/login', (req, res) => {
    Admin.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(admin => {
        if(admin){
            if(bcrypt.compareSync(req.body.password, admin.password)){
                let token = jwt.sign(admin.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1500
                });
                res.send(token);
            }
        } else {
            res.status(400).json({error: `Admin does not exist`})
        };
    })
    .catch(err => {
        res.status(400).json({ error: err})
    });
});

module.exports = admins;