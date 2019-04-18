const Client = require('../models/client');
const ShoppingCart = require('../models/shoppingcart');


const sprepository = {
    getUserShoppingCart(userId) {
        return ShoppingCart.findOne({
            where:{
                client_id: userId
            }
        }).then(cart =>{
            console.log(cart)
            if(cart){
                return cart.getProducts().then(products =>{
                        return {cartExists: true, cartProducts: products}
                }).catch(err => {
                    return { error: err }
                });
            }else{
                return {cartExists: false, message: 'No hay items en el carrito'}
            }
            
        }).catch(err => {
            return { error: err }
        });
    }
    /*adminLogin(adminData, res) {
        Admin.findOne({
            where: {
                email: adminData.email
            }
        })
            .then(admin => {
                if (admin) {
                    if (bcrypt.compareSync(adminData.password, admin.password)) {
                        let token = jwt.sign(admin.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1500
                        });
                        res.send(token);
                    }
                } else {
                    res.status(400).json({ error: `Admin does not exist` })
                };
            })
            .catch(err => {
                res.status(400).json({ error: err })
            });
    },

    clientRegister(clientData, res) {
        Client.findOne({
            where: {
                email: clientData.email
            }
        })
            .then(client => {
                if (!client) {
                    bcrypt.hash(clientData.password, 10, (err, hash) => {
                        clientData.password = hash;
                        Client.create(clientData)
                            .then(client => {
                                res.json({ status: `${client.email} registered` })
                            })
                            .catch(err => {
                                res.send(`Error ${err}`)
                            });
                    });
                };
            })
            .catch(err => {
                res.send(`Error ${err}`)
            });
    },

    clientLogin(clientData, res) {
        Client.findOne({
            where: {
                email: clientData.email
            }
        })
            .then(client => {
                if (client) {
                    if (bcrypt.compareSync(clientData.password, client.password)) {
                        let token = jwt.sign(client.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1500
                        });
                        res.send(token);
                    }
                } else {
                    res.status(400).json({ error: `Client does not exist` })
                };
            })
            .catch(err => {
                res.status(400).json({ error: err })
            });
    },

    rappiTenderoRegister(rappiTenderoData, res) {
        RappiTendero.findOne({
            where: {
                email: rappiTenderoData.email
            }
        })
            .then(rappiTendero => {
                if (!rappiTendero) {
                    bcrypt.hash(rappiTenderoData.password, 10, (err, hash) => {
                        rappiTenderoData.password = hash;
                        RappiTendero.create(rappiTenderoData)
                            .then(client => {
                                res.json({ status: `${rappiTendero.email} registered` })
                            })
                            .catch(err => {
                                res.send(`Error ${err}`)
                            });
                    });
                };
            })
            .catch(err => {
                res.send(`Error ${err}`)
            });
    },

    rappiTenderoLogin(rappiTenderoData, res) {
        RappiTendero.findOne({
            where: {
                email: rappiTenderoData.email
            }
        })
            .then(rappiTendero => {
                if (rappiTendero) {
                    if (bcrypt.compareSync(rappiTenderoData.password, rappiTendero.password)) {
                        let token = jwt.sign(rappiTendero.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1500
                        });
                        res.send(token);
                    }
                } else {
                    res.status(400).json({ error: `RappiTendero does not exist` })
                };
            })
            .catch(err => {
                res.status(400).json({ error: err })
            });
    }*/
}

module.exports = sprepository;