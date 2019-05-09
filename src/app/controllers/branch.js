const obrepository = require('../repository/branch');

const openBranches = {
    async showRestaurantList(req, res) {
        var clientAddress = ""
        if (req.session.address.address_name != undefined) {
            clientAddress = req.session.address.address_name
        }
        if (req.session.address.latitude != undefined && req.session.address.latitude != '' &&
          req.session.address.longitude != undefined && req.session.address.longitude != '') {
            latitude = parseFloat(req.session.address.latitude)
            longitude = parseFloat(req.session.address.longitude)
          }else {
            latitude = 4.6486259  //default location
            longitude = -74.2478966
          }
        let open_branches = await obrepository.getOpenBranches(latitude, longitude)
      
        res.render("clientHome", {
            clientName: req.session.user.first_name,
            clientAddress: clientAddress,
            branches: open_branches
        });
    }
}

module.exports = openBranches;
