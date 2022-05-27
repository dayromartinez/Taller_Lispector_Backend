const usuarioModel = require('../models/Usuario');

const registerUser = async (req, res) => {
    try {
        res.json('Registro de usuario');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    registerUser
}