const Client = require('../models/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerClient = (clientData, res) => {
    Client.findOne({
        where: {
            email: clientData.email
        }
    })
    .then(client => {
        if(!client){
            bcrypt.hash(clientData.password, 10, (err, hash) => {
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
};

const clientLogin = (clientData, res) => {
    Client.findOne({
        where: {
            email: clientData.email
        }
    })
    .then(client => {
        if(client){
            if(bcrypt.compareSync(clientData.password, client.password)){
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
};

module.exports = { registerClient, clientLogin};