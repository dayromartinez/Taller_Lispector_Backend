const {response}= require('express')
const bcrypt = require ("bcryptjs")
const Usuario = require("../models/Usuario");
const { generateJWT } = require ("../middlewares/generateJWT")

const createUser = async(req, res = response) => {

    const {email, password, name} = req.body;

    try {

        let user = await Usuario.findOne({email});
    
        if(user) return res.status(400).send({ok:false, msg:'El usuario ya existe'})
    
        user = new Usuario(req.body)
        
        // encriptando password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync (password,salt);

        user.colorProfile = Math.floor(7 * Math.random())

        await user.save()

        const token = await generateJWT(user._id, user.name, user.role, user.publicationsCode, user.email, user.comments, user.colorProfile)
        res.status(201).send({token})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const getUser = async (req, res = response) => {

    const { id } = req.params;

    try {

        let user = await Usuario.findOne({id});
        if(!user) return res.status(400).send({ ok: false, msg: 'El usuario no existe'})
        const token = await generateJWT (user.id, user.name, user.role, user.publicationsCode, user.email, user.comments, user.colorProfile)
        res.status(200).send({token})

    } catch (error) {
        res.send(error)
    }
}

const loginUser = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        let user = await Usuario.findOne({email});
        if(!user) return res.status(400).send({ ok: false, msg: 'El usuario no existe'})
        const token = await generateJWT (user.id, user.name, user.role, user.publicationsCode, user.email, user.comments, user.colorProfile)
        const validarPassword = bcrypt.compareSync(password, user.password)
        
        !validarPassword ? res.status(400).send({msg: 'Correo o contraseña incorrectos'}) : res.status(200).send({token}) //user

    } catch (error) {
        res.send(error)
    }
}

const revalidarToken = async (req, res = response)=>{
    const {uid, name, role, publicationsCode, email, colorProfile} = req
    const token = await generateJWT (uid, name, role, postalPublicationCode, email, colorProfile)
    res.send(token)
}

module.exports = {
    createUser,
    loginUser,
    revalidarToken,
    getUser
}