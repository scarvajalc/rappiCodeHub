
const Branch = require('../models/branch');
const OpeningHour = require('../models/openinghour');
const DateParser = require('../repository/date_parser');

const obrepository = {
    
    async getOpenBranches(latitude, longitude) {
    
        branches = await Branch.findAll({
            where:{
                active: true
            }
          })
        
        let current_time = DateParser.secsFromWeekStart(new Date())
        let open_branches = []
        for(let i = 0; i < branches.length; i++) {
            let open_branch = false
            let current_branch = branches[i]
            let opening_hours = await current_branch.getHours()
            for(let j = 0; j < opening_hours.length; j++) {
                if (opening_hours[j].opening_time <= current_time && 
                    opening_hours[j].closing_time >= current_time) {
                    open_branch = true
                    break
                }
            }
            if (open_branch) open_branches.push(current_branch)
        }

        function geodistance(lat_a, lon_a, lat_b, lon_b) {
            lat_a = lat_a * Math.PI/180
            lat_b = lat_b * Math.PI/180
            lon_a = lon_a * Math.PI/180
            lon_b = lon_b * Math.PI/180
            let lat_dif = lat_a-lat_b
            let lon_dif = lon_a-lon_b
            let t = Math.sin(lat_dif/2) * Math.sin(lat_dif/2) + 
                    Math.cos(lat_a) * Math.cos(lat_b) * Math.sin(lon_dif/2) * Math.sin(lon_dif/2); 
            t = 2 * Math.atan2(Math.sqrt(t), Math.sqrt(1-t)); 
            return 6371 * t;
        }
          
            for(let i = 0; i < open_branches.length; i++) {
                open_branches[i].distance = geodistance(latitude, longitude,
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
      
        return open_branches
    }

}

module.exports = obrepository;