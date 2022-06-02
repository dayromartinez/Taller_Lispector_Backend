// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Test = require('../models/Test');
// const usuarioModel = require('../models/Usuario');

// const login = async (req, res = response, next) => {

//     const { email, password } = req.body;
//     const user = await usuarioModel.findOne({ email });

//     try {
        
//         if( !user ){
//             await res.status(401).json({ message: 'Usuario no existe.' })
//         } else {
    
//             if( !bcrypt.compareSync(password, user.password) ){
//                 await res.status(401).json({ message: 'Contraseña incorrecta' })
//             }else {
//                 const token = jwt.sign({
//                     email: user.email,
//                     name: user.name,
//                     id: user._id
//                 }, 'L14V3S3CR3T4A', {
//                     expiresIn: '4h',
//                 });
    
//                 res.json({ token });

//                 console.log('TOKEN: ', token);
//             }
    
//         }

//     } catch (error) {
//         console.log(error)
//     }

// }

// const register = async (req, res = response) => {

//     const user = new usuarioModel(req.body);
//     user.password = await bcrypt.hash(req.body.password, 10);
//     try {
//         await user.save();
//         res.json({ message: `Usuario guardado: ${req.body}` })
//     } catch (error) {
//         console.log(error);
//         res.json({message: 'Ocurrio un error'})
//     }

// }


// const test = async (req, res) => {
//     const newTest = await new Test(req.body);
//     const testSave = await newTest.save();
//     res.send(testSave);
// }

// module.exports = {
//     login,
//     register,
//     test
// }



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
        if(!user) return res.status(400).send({ok:false, msg:'El usuario no existe'})
        const token = await generateJWT (user.id,user.name,user.role, user.postalPublicationCode, user.email)
        const validarPassword= bcrypt.compareSync( password, user.password )
        
        !validarPassword ? res.status(400).send({msg:'Correo o password incorrectos'}) : res.status(200).send({token}) //user
    } catch (error) {
        res.send(error)
    }
}

const revalidarToken = async (req, res = response)=>{
    const {uid, name, role, postalPublicationCode, email}=req
    const token = await generateJWT (uid, name, role, postalPublicationCode, email)
    res.send(token)
}

module.exports={
    createUser,
    loginUser,
    revalidarToken
}