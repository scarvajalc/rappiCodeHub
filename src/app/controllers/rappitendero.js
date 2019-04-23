const rappiTenderoHandler = require('./handlers/rappiTendero');
const repository = require('../repository/index');

const rappiTenderoController = {
    async rappiTenderoLogin(req, res) {
        const rappiTenderoData = rappiTenderoHandler.handleHTTPLogin(req);
        const repoResponse = await repository.rappiTenderoLogin(rappiTenderoData, res);
        if (repoResponse.validCredentials) {
            req.session.user = repoResponse.rappiTenderoData;
            req.session.user_role = repoResponse.role;
            res.redirect("/rappiTenderoHome");
        } else {
            res.redirect('rappiTenderoLogin');
        }
    },

    async rappiTenderoRegister(req, res) {
        const rappiTenderoData = rappiTenderoHandler.handleHTTPRegister(req);
        const repoResponse = await repository.rappiTenderoRegister(rappiTenderoData, res);
        if (repoResponse.message) {
            res.redirect('/adminRegisterRappiT');
        };
    }

}

module.exports = rappiTenderoController;