const Client = require('../models/client');
const bcrypt = require('bcrypt');

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

module.exports = registerClient;