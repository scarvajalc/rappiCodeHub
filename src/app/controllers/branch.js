const obrepository = require('../repository/branch');

const openBranches = {
    async showRestaurantList(req, res) {
        const userId = 8 ////change here for user session
        let open_branches = await obrepository.getOpenBranches(/*userId*/)
        var clientAddress = ""
        if (req.session.address.address_name != undefined) {
            clientAddress = req.session.address.address_name
        }
       
        /*Hay que sacar esto del controlador*/
        function geodistance(lat_a, lon_a, lat_b, lon_b) {
            lat_a = lat_a * Math.PI/180
            lat_b = lat_b * Math.PI/180
            lon_a = lon_a * Math.PI/180
            lon_b = lon_b * Math.PI/180
            let R = 6371
            let lat_dif = lat_a-lat_b
            let lon_dif = lon_a-lon_b
            let t = Math.sin(lat_dif/2) * Math.sin(lat_dif/2) + 
                    Math.cos(lat_a) * Math.cos(lat_b) * Math.sin(lon_dif/2) * Math.sin(lon_dif/2); 
            t = 2 * Math.atan2(Math.sqrt(t), Math.sqrt(1-t)); 
            return R * t;
        }
          
        if (req.session.address.latitude != undefined && req.session.address.latitude != '' &&
          req.session.address.longitude != undefined && req.session.address.longitude != '') {
            lat = parseFloat(req.session.address.latitude)
            lon = parseFloat(req.session.address.longitude)
            for(let i = 0; i < open_branches.length; i++) {
                open_branches[i].distance = geodistance(lat, lon,
                            open_branches[i].latitude, open_branches[i].longitude)
            }
            
            for(let i = 0; i < open_branches.length-1; i++) {
                for(let j = 0; j < open_branches.length-1; j++) {
                    if  (open_branches[j].distance > open_branches[j+1].distance) {
                        let mv_branch = open_branches[j]
                        open_branches[j] = open_branches[j + 1] 
                        open_branches[j + 1] = mv_branch
                    }
                }
            }
      }
 
        res.render("clientHome", {
            clientName: req.session.user.first_name,
            clientAddress: clientAddress,
            branches: open_branches
        });
    
    }

}

module.exports = openBranches;
