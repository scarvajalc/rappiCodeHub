const clientHandler = require('./handlers/client');
const repository = require('../repository/index');

const clientController = {
    clientLogin(req, res) {
        const clientData = clientHandler.handleHTTPLogin(req);
        repository.clientLogin(clientData, res);
    },

    clientRegister(req, res) {
        const clientData = clientHandler.handleHTTPRegister(req);
        repository.clientRegister(clientData, res);
    }

}

module.exports = clientController;