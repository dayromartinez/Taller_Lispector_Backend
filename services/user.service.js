const {response}= require('express')
const bcrypt = require ("bcryptjs")
const Usuario = require("../models/Usuario");
const { generateJWT } = require ("../middlewares/generateJWT")

const createUser = async(req, res=response)=>{
    const {email, password, role, postalPublicationCode, name} = req.body;

    try {
        let user = await Usuario.findOne({email});
    
        if(user) return res.status(400).send({ok:false, msg:'El usuario ya existe'})
    
        user = new Usuario(req.body)
        
        // encriptando password
        const salt = bcrypt.genSaltSync();
        user.password= bcrypt.hashSync (password,salt);

        await user.save()

        const token = await generateJWT(user._id,user.name,user.role, user.postalPublicationCode, user.email)

        res.status(201).send({token})
    } catch (error) {
        console.log(error)
    
        res.sendStatus(500)
    }
}

const loginUser = async (req, res=response)=>{
    const {email,password} = req.body;

    try {
        let user = await Usuario.findOne({email});
        if(!user) return res.status(400).send({ ok: false, msg: 'El usuario no existe'})
        const token = await generateJWT (user.id,user.name,user.role, user.postalPublicationCode, user.email)
        const validarPassword= bcrypt.compareSync( password, user.password )
        
        !validarPassword ? res.status(400).send({msg: 'Correo o password incorrectos'}) : res.status(200).send({token}) //user
    } catch (error) {
        res.send(error)
    }
}

const revalidarToken = async (req, res = response)=>{
    const {uid, name, role, postalPublicationCode, email} = req
    const token = await generateJWT (uid, name, role, postalPublicationCode, email)
    res.send(token)
}

module.exports={
    createUser,
    loginUser,
    revalidarToken
}