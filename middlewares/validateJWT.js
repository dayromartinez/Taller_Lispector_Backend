const jwt = require ('jsonwebtoken')
const {KEY_TOKEN} = process.env


const validarJWTAdmin= (req,res,next)=>{
    
    const token = req.header('x-token');
    
    
    if (!token){
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }

    try {
        const {uid, name, role, postalPublicationCode} = jwt.verify(
            token,
            KEY_TOKEN
        )
        req.uid=uid
        req.name=name
        req.role=role
        req.postalPublicationCode=postalPublicationCode
        role ? next() : res.status(500).json({ok:false,msg:'ruta no permitida'})

    } catch (error) {
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }

}

const validarJWTUser= (req,res,next)=>{
    
    const token = req.header('x-token');

    
    if (!token){
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }

    try {

        const { uid, name, role, postalPublicationCode, email, comments, colorProfile } = jwt.verify(
            token,
            KEY_TOKEN
        )

        req.uid = uid
        req.name = name
        req.role = role
        req.postalPublicationCode = postalPublicationCode
        req.email = email
        req.comments = comments
        req.colorProfile = colorProfile

        res.status(200).json({ ok: true, msg: 'Token valido', uid, name, role, postalPublicationCode, email, comments, colorProfile } );
        
    } catch (error) {
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }
    next()
}


module.exports={
    validarJWTUser,
    validarJWTAdmin
}