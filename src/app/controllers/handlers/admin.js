const adminHandler = {
  handleHTTPLogin(req) {
    const adminData = {
      email: req.body.email,
      password: req.body.password
    };

    return adminData;
  },

  handleHTTPRegisterRestaurantChains(req) {
    const restaurantChainsData = {
      nit: req.body.nit,
      name: req.body.name
    };

    return restaurantChainsData;
  }
};

module.exports = adminHandler;
