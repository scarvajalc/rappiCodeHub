const rappiTenderoHandler = require('./handlers/rappiTendero');
const repository = require('../repository/index');

const rappiTenderoController = {
    rappiTenderoLogin(req, res) {
        const rappiTenderoData = rappiTenderoHandler.handleHTTPLogin(req);
        repository.rappiTenderoLogin(rappiTenderoData, res);
    },

    clientRegister(req, res) {
        const rappiTenderoData = rappiTenderoHandler.handleHTTPRegister(req);
        repository.rappiTenderoRegister(rappiTenderoData, res);
    }

}

module.exports = rappiTenderoController;