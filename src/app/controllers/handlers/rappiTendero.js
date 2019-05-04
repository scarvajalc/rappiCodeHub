const rappiTenderoHandler = {
  handleHTTPRegister(req) {
    const today = new Date();
    const rappiTenderoData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      createdAt: today,
      active: true
    };

    return rappiTenderoData;
  },

  handleHTTPLogin(req) {
    const rappiTenderoData = {
      email: req.body.email,
      password: req.body.password
    };

    return rappiTenderoData;
  },

  handleHTTPUpdateAddress(req) {
    const rappiTenderoAddress = {
      id: req.session.user.id,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    };

    return rappiTenderoAddress;
  }
};

module.exports = rappiTenderoHandler;
