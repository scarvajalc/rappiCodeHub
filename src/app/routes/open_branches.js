const BranchController = require('../controllers/branch');

module.exports = (app) => {
    app.get('/test_restaurant', BranchController.showRestaurantList);
};
