const clientHandler = {
  handleHTTPRegister(req) {
    const today = new Date();
    const clientData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      createdAt: today,
      active: true
    };

    return clientData;
  },

  handleHTTPLogin(req) {
    const clientData = {
      email: req.body.email,
      password: req.body.password
    };

    return clientData;
  },

  handleHTTPRegisterAddress(req) {
    const clientAddress = {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      address_name: req.body.address,
      current: true,
      client_id: req.session.user.id
    };

    return clientAddress;
  }
};

module.exports = clientHandler;
