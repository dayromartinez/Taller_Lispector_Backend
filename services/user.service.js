const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const usuarioModel = require('../models/Usuario');
const testModel = require('../models/Test');

const loginUser = async (req, res) => {
    const {body} = req;
    const { correo, contrasena } = body;

    const user = await usuarioModel.findOne({ correo });
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(contrasena, user.contrasena);
}

const registerUser = async (req, res) => {
    try {
        res.json('Registro de usuario');
    } catch (error) {
        console.log(error);
    }
}

const test = async (req, res) => {
    const newUser = new testModel(req.body)
    const userSaved = await newUser.save();
    res.json(userSaved);
}

module.exports = {
    registerUser,
    loginUser,
    test
}