const clientHandler = require('./handlers/client');
const repository = require('../repository/index');

const clientController  = {
    async clientLogin(req, res) {
        const clientData = clientHandler.handleHTTPLogin(req);
        const repoResponse = await repository.clientLogin(clientData, res);
        if(repoResponse.validCredentials){
            req.session.user = repoResponse.clientData;
            res.redirect("/clientHome")
        } else {
            res.redirect('clientLogin')
        }
    },

    clientRegister(req, res) {
        const clientData = clientHandler.handleHTTPRegister(req);
        repository.clientRegister(clientData, res);
    }

}

module.exports = clientController;