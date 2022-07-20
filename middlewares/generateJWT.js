const jwt = require('jsonwebtoken')
const {KEY_TOKEN}=process.env

const generateJWT =(uid, name, role, postalPublicationCode, email, comments, colorProfile)=>{
    return new Promise ((resolve,reject)=>{
        const payload = {uid, name, role, postalPublicationCode, email, comments, colorProfile};

        jwt.sign(payload,KEY_TOKEN, {
            expiresIn: '1d'
        },(err , token)=>{
            err ? reject('No se puede generar el token') : resolve (token)
        })
    })
}

module.exports={
    generateJWT
}

