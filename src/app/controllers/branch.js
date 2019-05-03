const obrepository = require('../repository/branch');

const openBranches = {
    async showRestaurantList(req, res) {
        const userId = 8 ////change here for user session
        let open_branches = await obrepository.getOpenBranches(/*userId*/)
        res.render("open_branches", { branches: open_branches });
    }
}

module.exports = openBranches;
