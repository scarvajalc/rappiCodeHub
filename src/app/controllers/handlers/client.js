const handleHTTPRegister = (req) => {
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
};

const handleHTTPLogin = (req) => {
    const clientData = {
        email: req.body.email,
        password: req.body.password
    };

    return clientData;
};

module.exports = {handleHTTPRegister, handleHTTPLogin};