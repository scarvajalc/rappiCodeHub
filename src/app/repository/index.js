const Client = require('../models/client');
const Admin = require('../models/admin');
const RappiTendero = require('../models/rappitendero');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const repository = {
    adminLogin(adminData, res) {
        return Admin.findOne({
            where: {
                email: adminData.email
            }
        })
            .then(admin => {
                if (admin) {
                    if (bcrypt.compareSync(adminData.password, admin.password)) {
                        let token = jwt.sign(admin.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1500
                        });
                        return { validCredentials: true, adminData: admin }
                    }
                } else {
                    return { validCredentials: false, message: 'Admin does not exists' }
                };
            })
            .catch(err => {
                return { error: err }
            });
    },

    clientRegister(clientData, res) {
        return Client.findOne({
            where: {
                email: clientData.email
            }
        })
            .then(client => {
                if (!client) {
                    bcrypt.hash(clientData.password, 10, (err, hash) => {
                        clientData.password = hash;
                        Client.create(clientData)
                            .then(client => {
                                return { message: `${client.email} registered` }
                            })
                            .catch(err => {
                                return { error: err }
                            });
                    });
                };
            })
            .catch(err => {
                return { error: err }
            });
    },

    clientLogin(clientData, res) {
        return Client.findOne({
            where: {
                email: clientData.email
            }
        })
            .then(client => {
                if (client) {
                    if (bcrypt.compareSync(clientData.password, client.password)) {
                        let token = jwt.sign(client.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1500
                        });
                        return { validCredentials: true, clientData: client }
                    }
                } else {
                    return { validCredentials: false, message: 'Client does not exists' }
                };
            })
            .catch(err => {
                return { error: err }
            });
    },

    rappiTenderoRegister(rappiTenderoData, res) {
        return RappiTendero.findOne({
            where: {
                email: rappiTenderoData.email
            }
        })
            .then(rappiTendero => {
                if (!rappiTendero) {
                    bcrypt.hash(rappiTenderoData.password, 10, (err, hash) => {
                        rappiTenderoData.password = hash;
                        RappiTendero.create(rappiTenderoData)
                            .then(client => {
                                return { message: `${rappiTendero.email} registered` }
                            })
                            .catch(err => {
                                return { error: err }
                            });
                    });
                };
            })
            .catch(err => {
                return { error: err }
            });
    },

    rappiTenderoLogin(rappiTenderoData, res) {
        return RappiTendero.findOne({
            where: {
                email: rappiTenderoData.email
            }
        })
            .then(rappiTendero => {
                if (rappiTendero) {
                    if (bcrypt.compareSync(rappiTenderoData.password, rappiTendero.password)) {
                        let token = jwt.sign(rappiTendero.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1500
                        });
                        return { validCredentials: true, rappiTenderoData: rappiTendero }
                    }
                } else {
                    return { message: 'RappiTendero does not exist' }
                };
            })
            .catch(err => {
                return { error: err }
            });
    }
}

module.exports = repository;