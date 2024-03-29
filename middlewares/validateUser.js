const { response }= require('express')
const { validationResult } = require ('express-validator')

const validateUser = (req,res=response, next)=>{

    const errors = validationResult(req);
    if( !errors.isEmpty()) return res.status(400).send({ok:false,error:errors.mapped()})

    next()
}

module.exports={
    validateUser
}