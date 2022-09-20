const jwt = require('jsonwebtoken')
const {KEY_TOKEN}=process.env

const generateJWT =(uid, name, role, publicationsCode, email, comments, colorProfile)=>{
    return new Promise ((resolve,reject)=>{
        const payload = {uid, name, role, publicationsCode, email, comments, colorProfile};

        jwt.sign(payload,KEY_TOKEN, {
            expiresIn: '2h'
        },(err , token)=>{
            err ? reject('No se puede generar el token') : resolve (token)
        })
    })
}

module.exports={
    generateJWT
}

