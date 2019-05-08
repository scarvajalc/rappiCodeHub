
const Branch = require('../models/branch');
const OpeningHour = require('../models/openinghour');
const DateParser = require('../repository/date_parser');

const obrepository = {
    
    async getOpenBranches(/*userId*/) {
    
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
        return open_branches
    }

}

module.exports = obrepository;