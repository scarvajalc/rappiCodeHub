const handleHTTPLogin = (req) => {
    const adminData = {
        email: req.body.email,
        password: req.body.password
    };

    return adminData;
};

module.exports = handleHTTPLogin;