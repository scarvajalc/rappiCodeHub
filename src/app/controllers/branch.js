const obrepository = require('../repository/branch');

const openBranches = {
    async showRestaurantList(req, res) {
        const userId = 8 ////change here for user session
        let open_branches = await obrepository.getOpenBranches(/*userId*/)
        var clientAddress = "";
      if (req.session.address.address_name != undefined) {
        clientAddress = req.session.address.address_name;
      }

        res.render("clientHome", {
            clientName: req.session.user.first_name,
            clientAddress: clientAddress,
            branches: open_branches
        });
    
    }
}

module.exports = openBranches;
