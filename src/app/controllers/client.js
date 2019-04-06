const express = require('express');
const clients = express.Router();

const handleHTTPRegister = require('../controllers/handlers/client');
const registerClient = require('../repository/index');

clients.post('/register', (req, res) => {
    const clientData = handleHTTPRegister(req);
    registerClient(clientData, res);
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