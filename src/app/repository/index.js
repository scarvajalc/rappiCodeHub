const Client = require('../models/client');
const Admin = require('../models/admin');
const RappiTendero = require('../models/rappitendero');
const ClientAddress = require('../models/client_addresses');
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
                        return { validCredentials: true, adminData: admin, role: 'admin' }
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
        return bcrypt.hash(clientData.password, 10)
            .then(hash => {
                clientData.password = hash;
                return Client.create(clientData)
                    .then(client => {
                        return { message: `${client.email} registered` }
                    })
                    .catch(err => {
                        return { error: err }
                    });
            })
    },

    clientLogin(clientData, res) {
        Client.hasMany(ClientAddress, { foreignKey: 'client_id' });
        ClientAddress.belongsTo(Client, { foreignKey: 'id' });

        return Client.findOne({
            where: {
                email: clientData.email
            },
            include: [ClientAddress]
        })
            .then(client => {
                if (client) {
                    if (bcrypt.compareSync(clientData.password, client.password)) {
                        let token = jwt.sign(client.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1500
                        });
                        return { validCredentials: true, clientData: client, role: 'client' }
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
        return bcrypt.hash(rappiTenderoData.password, 10)
            .then(hash => {
                rappiTenderoData.password = hash;
                return RappiTendero.create(rappiTenderoData)
                    .then(rappiTendero => {
                        return { message: `${rappiTendero.email} registered` }
                    })
                    .catch(err => {
                        return { error: err }
                    });
            })
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
                        return { validCredentials: true, rappiTenderoData: rappiTendero, role: 'rappiTendero' }
                    }
                } else {
                    return { validCredentials: false, message: 'RappiTendero does not exist' }
                };
            })
            .catch(err => {
                return { error: err }
            });
    },

    clientRegisterAddress(clientAddress) {
        return ClientAddress.create(clientAddress)
            .then(clientAddress => {
                return { message: `${clientAddress.address_name} registered`, clientAddress: clientAddress }
            })
            .catch(err => {
                return { error: err }
            });
    }
}

module.exports = repository;