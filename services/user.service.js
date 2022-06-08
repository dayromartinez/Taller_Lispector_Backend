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

        await user.save()

        const token = await generateJWT(user._id, user.name, user.role, user.publicationsCode, user.email)
        res.status(201).send({token})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const loginUser = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        let user = await Usuario.findOne({email});
        if(!user) return res.status(400).send({ ok: false, msg: 'El usuario no existe'})
        const token = await generateJWT (user.id, user.name, user.role, user.publicationsCode, user.email)
        const validarPassword = bcrypt.compareSync(password, user.password)
        
        !validarPassword ? res.status(400).send({msg: 'Correo o contraseña incorrectos'}) : res.status(200).send({token}) //user

    } catch (error) {
        res.send(error)
    }
}

const revalidarToken = async (req, res = response)=>{
    const {uid, name, role, publicationsCode, email} = req
    const token = await generateJWT (uid, name, role, postalPublicationCode, email)
    res.send(token)
}

module.exports = {
    createUser,
    loginUser,
    revalidarToken
}


//{"_id":{"$oid":"62994aad90db5aacdeacab07"},"name":"Clarice Lispector","email":"elhuevoylagallina@gmail.com","imageUser":"","phone":"3123158165","role":"user","postalPublicationCode":"VAJT-BBKP-HGJQ-BHTG","password":"$2a$10$15hN3p..Daym48mxxb.O0OMhafupKBFlKLWDARZyq7UAHxrgV/TQq","createdAt":{"$date":"2022-06-02T23:41:33.270Z"},"updatedAt":{"$date":"2022-06-03T19:19:08.688Z"},"__v":0}